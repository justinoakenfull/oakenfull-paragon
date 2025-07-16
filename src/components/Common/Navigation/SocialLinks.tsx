import React from "react";
import '../../../styles/nav/nav.css';

type SocialLink = {
    linkName: string;
    url: string;
    // <-- accept a component (not an already-instantiated ReactNode)
    icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
};

type SocialLinksProps = {
    className?: string;
    link: SocialLink;
};

export function SocialLinks({ className = "", link: { linkName, url, icon: Icon } }: SocialLinksProps) {
    return (
        <a href={url} className={`social-link ${className}`} target="_blank" rel="noopener noreferrer">
            <div className="social-icon">
                <Icon className="w-6 h-6" />
            </div>
        </a>
    );
}