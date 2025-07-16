import { useEffect, useState, useRef } from 'react';
import { decryptToken } from '../utils/encryptionSimple';

type Stats = {
    repositories: number | null;
    commits: number | null;
    loading: boolean;
    error: string | null;
}

// Rate limiter class to manage API calls
class RateLimiter {
    private lastRequestTime: number = 0;
    private readonly minInterval: number;

    constructor(requestsPerSecond: number = 1) {
        this.minInterval = 1000 / requestsPerSecond; // Convert to milliseconds
    }

    async throttle<T>(fn: () => Promise<T>): Promise<T> {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;

        if (timeSinceLastRequest < this.minInterval) {
            const delay = this.minInterval - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        this.lastRequestTime = Date.now();
        return fn();
    }
}

// Global rate limiter instance for GitHub API
const githubRateLimiter = new RateLimiter(0.5); // 0.5 requests per second (one every 2 seconds)

// Cache for GitHub stats to avoid unnecessary API calls
const statsCache = new Map<string, { data: Stats; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useGitHubStats(username: string): Stats {
    const [repositories, setRepositories] = useState<number | null>(null);
    const [commits, setCommits] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Cancel any ongoing requests when username changes
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check cache first
                const cacheKey = `github-stats-${username}`;
                const cachedData = statsCache.get(cacheKey);

                if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
                    setRepositories(cachedData.data.repositories);
                    setCommits(cachedData.data.commits);
                    setLoading(false);
                    return;
                }

                const encryptedToken = process.env.REACT_APP_GITHUB_TOKEN;
                if (!encryptedToken) {
                    setError("GitHub token is not set");
                    setLoading(false);
                    return;
                }

                // Decrypt the token
                let token: string;
                try {
                    token = decryptToken(encryptedToken);
                } catch (err) {
                    setError("Failed to decrypt GitHub token");
                    setLoading(false);
                    return;
                }

                // Fetch repositories with rate limiting
                const repoData = await githubRateLimiter.throttle(async () => {
                    const response = await fetch(`https://api.github.com/users/${username}`, {
                        headers: { Authorization: `token ${token}` },
                        signal: abortController.signal
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
                    }

                    return response.json();
                });

                if (abortController.signal.aborted) return;

                const totalRepos = repoData.public_repos + (repoData.total_private_repos || 0);
                setRepositories(totalRepos);

                // Fetch commits with rate limiting (sequential to avoid hitting rate limits)
                // This gets ALL commits from ALL repositories (public & private) across ALL years
                const commitData = await githubRateLimiter.throttle(async () => {
                    // Generate years from 2008 (GitHub's founding) to current year
                    const currentYear = new Date().getFullYear();
                    const startYear = 2008;

                    // Split into chunks to avoid GraphQL complexity limits
                    const chunkSize = 5; // Process 5 years at a time
                    const allYears = [];
                    for (let year = startYear; year <= currentYear; year++) {
                        allYears.push(year);
                    }

                    let totalCommits = 0;

                    // Process years in chunks
                    for (let i = 0; i < allYears.length; i += chunkSize) {
                        const yearChunk = allYears.slice(i, i + chunkSize);

                        // Build GraphQL query for this chunk
                        const yearQueries = yearChunk.map(year => {
                            return `
                                contributionsCollection${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
                                    totalCommitContributions
                                }
                            `;
                        }).join('\n');

                        const response = await fetch(`https://api.github.com/graphql`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                query: `
                                    query {
                                        user(login: "${username}") {
                                            ${yearQueries}
                                        }
                                    }
                                `,
                            }),
                            signal: abortController.signal
                        });

                        if (abortController.signal.aborted) return { totalCommits: 0 };

                        const chunkData = await response.json();

                        if (chunkData.errors) {
                            throw new Error(chunkData.errors.map((e: any) => e.message).join(', '));
                        }

                        // Sum up commits from this chunk
                        const userData = chunkData.data.user;
                        for (const key in userData) {
                            if (key.startsWith('contributionsCollection') && userData[key]) {
                                totalCommits += userData[key].totalCommitContributions || 0;
                            }
                        }

                        // Add delay between chunks to be nice to the API
                        if (i + chunkSize < allYears.length) {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }

                    return { totalCommits };
                });

                if (abortController.signal.aborted) return;

                const totalCommits = commitData.totalCommits || 0;
                setCommits(totalCommits);

                // Cache the results
                const statsData: Stats = {
                    repositories: totalRepos,
                    commits: totalCommits,
                    loading: false,
                    error: null
                };

                statsCache.set(cacheKey, {
                    data: statsData,
                    timestamp: Date.now()
                });

            } catch (err) {
                if (abortController.signal.aborted) return;

                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
                console.error('GitHub API Error:', err);
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchStats();

        // Cleanup function
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [username]);

    return { repositories, commits, loading, error };
}

// Utility functions for managing GitHub stats
export const clearGitHubStatsCache = (username?: string) => {
    if (username) {
        statsCache.delete(`github-stats-${username}`);
    } else {
        statsCache.clear();
    }
};

export const getCacheSize = () => statsCache.size;

export const setCacheExpiry = (durationMs: number) => {
    // This would require refactoring to make CACHE_DURATION configurable
    // For now, this is a placeholder for future enhancement
    console.warn('Cache expiry configuration not yet implemented');
};