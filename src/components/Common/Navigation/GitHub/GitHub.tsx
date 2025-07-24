import React from "react";

import { ReactComponent as RepoIcon } from '../../../../assets/icons/repo.svg';
import { ReactComponent as CommitIcon } from '../../../../assets/icons/commits.svg';

import '../../../../styles/nav/github.css';
import { useGitHubStats } from "../../../../hooks/useGitHubStats";

type GitHubProps = {
    className?: string;
    username: string; // Optional username prop for flexibility
};

export function GitHub({ className = "", username }: GitHubProps) {
    const { repositories, commits, loading, error } = useGitHubStats(username);

    if (error) {
        return <div className={`github ${className}`}>Error: {error}</div>;
    }

    return (
        <div className={`github ${className}`}>
            <div className="github-text">GitHub Stats</div>
            <div className="github-split" />
            {loading ? (
                <div className="stats-row">Loading…</div>
            ) : (
                <div className="stats-row">
                    <div className="stat-item">
                        <RepoIcon className="icon" />
                        <span className="stat-value">{repositories}</span>
                        <span className="stat-label">Repositories</span>
                    </div>
                    <div className="stat-item">
                        <CommitIcon className="icon" />
                        <span className="stat-value">{commits}</span>
                        <span className="stat-label">Commits</span>
                    </div>
                </div>
            )}
        </div>
    );
}