import { useEffect, useState } from 'react';

type Stats = {
    repositories: number | null;
    commits: number | null;
    loading: boolean;
    error: string | null;
}

export function useGitHubStats(username: string): Stats {
    const [repositories, setRepositories] = useState<number | null>(null);
    const [commits, setCommits] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        if (!token) {
            setError("GitHub token is not set");
            setLoading(false);
            return;
        }

        const fetchRepositories = fetch(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${token}` },
        })
            .then(response => {
                if (!response.ok) throw new Error("Error: Failed to fetch user!");
                return response.json();
            })
            .then(data => setRepositories(data.public_repos));
        const fetchCommits = fetch(`https://api.github.com/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: `
                    query {
                        user(login: "${username}") {
                            contributionsCollection {
                                totalCommitContributions
                            }
                        }
                    }
                `,
            }),
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join(', '));
                setCommits(json.data.user.contributionsCollection.totalCommitContributions);
            });

        Promise.all([fetchRepositories, fetchCommits])
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [username]);

    return { repositories, commits, loading, error };
}