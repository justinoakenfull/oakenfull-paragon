import { useEffect, useState } from 'react';

type Stats = {
    repositories: number | null;
    commits: number | null;
    loading: boolean;
    error: string | null;
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const API_URL = process.env.GHSTATS_URL || 'http://localhost:4000/github/stats';

function readCache(key: string): Stats | null {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const { data, timestamp } = JSON.parse(raw) as {
            data: Stats;
            timestamp: number;
        };
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

function writeCache(key: string, data: Stats) {
    try {
        const payload = JSON.stringify({ data, timestamp: Date.now() });
        localStorage.setItem(key, payload);
    } catch {
        // Storage full or unavailable, just skip caching
    }
}

export function useGitHubStats(username: string): Stats {
    const [repositories, setRepositories] = useState<number | null>(null);
    const [commits, setCommits] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = `github-stats-${username}`;
        const cached = readCache(cacheKey);

        if (cached) {
            setRepositories(cached.repositories);
            setCommits(cached.commits);
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch(`${API_URL}?user=${username}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<{ repoCount: number; commitCount: number }>;
            })
            .then(json => {
                if (!isMounted) return;
                const fresh: Stats = {
                    repositories: json.repoCount,
                    commits: json.commitCount,
                    loading: false,
                    error: null
                };
                setRepositories(fresh.repositories);
                setCommits(fresh.commits);
                writeCache(cacheKey, fresh);
            })
            .catch(err => {
                if (!isMounted) return;
                setError(err.message || 'Unknown error');
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [username]);

    return { repositories, commits, loading, error };
}