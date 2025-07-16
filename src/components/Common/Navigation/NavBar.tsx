import React from "react";
import { NavButton } from "./NavButton";
import { PerformanceButton } from "./PerformanceButton";
import { GitHub } from "./GitHub/GitHub";
import { VerticalBreak } from "./VerticalBreak";
import { SocialLinks } from "./SocialLinks";
import '../../../styles/nav/nav.css';
import '../../../styles/nav/performance-button.css';

import { ReactComponent as gitHubIcon } from '../../../assets/icons/github.svg';
import { ReactComponent as linkedInIcon } from '../../../assets/icons/linkedin.svg';

const navBarItems = ["Home", "Projects", "About", "Skills", "Contact"] as const;
type NavItem = typeof navBarItems[number];

type NavBarProps = {
    activeItem: NavItem;
    onChange: (item: NavItem) => void;
};

export function NavBar({ activeItem, onChange }: NavBarProps) {

    return (
        // Main navigation bar container
        <nav className="navbar">
            {/* Left hand side */}
            <ul className="nav-list">
                {navBarItems.map((item) => (
                    <NavButton
                        key={item}
                        label={item}
                        isActive={activeItem === item}
                        onClick={() => onChange(item)}
                    />
                ))}
            </ul>

            {/* Right hand side */}
            <div className="nav-actions">
                <PerformanceButton
                    className="performance-button"
                    onClick={() => console.log("Performance button clicked")} // TODO: Implement actual performance logic
                />
                <GitHub username="justinoakenfull" />
                <VerticalBreak className="ms-5 bg-davy-gray rounded" />
                <SocialLinks className="fill-ghost-white" link={{ linkName: "GitHub", url: "/", icon: gitHubIcon }} />
                <VerticalBreak className="bg-davy-gray rounded" />
                <SocialLinks className="fill-ghost-white pe-3" link={{ linkName: "LinkedIn", url: "/", icon: linkedInIcon }} />
            </div>
        </nav>
    );
}