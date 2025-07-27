import React from "react";
import { useState } from "react";
import { NavButton } from "./NavButton";
import { PerformanceButton } from "./PerformanceButton";
import { GitHub } from "./GitHub/GitHub";
import { VerticalBreak } from "./VerticalBreak";
import { SocialLinks } from "./SocialLinks";
import '../../../styles/nav/nav.css';
import '../../../styles/nav/performance-button.css';

import { ReactComponent as gitHubIcon } from '../../../assets/icons/github.svg';
import { ReactComponent as linkedInIcon } from '../../../assets/icons/linkedin.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/commits.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/github.svg';

const navBarItems = ["Home", "Projects", "About", "Skills", "Contact"] as const;
type NavItem = typeof navBarItems[number];

type NavBarProps = {
    activeItem: NavItem;
    onChange: (item: NavItem) => void;
};

export function NavBar({ activeItem, onChange }: NavBarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        // Main navigation bar container
        <nav className="navbar">
            {/* Left hand side */}
            <div className="flex items-center">
                <button className="md:hidden me-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <CloseIcon className="w-6 h-6 fill-ghost-white" /> : <MenuIcon className="w-6 h-6 fill-ghost-white" />}
                </button>
                <ul className={`nav-list flex-col md:flex-row md:flex ${isMobileMenuOpen ? "flex items-start" : "hidden"}`}>
                    {navBarItems.map((item) => (
                        <NavButton
                            key={item}
                            label={item}
                            isActive={activeItem === item}
                            onClick={() => {
                                onChange(item);
                                setIsMobileMenuOpen(false);
                            }}
                        />
                    ))}
                </ul>
            </div>

            {/* Right hand side */}
            <div className="nav-actions">
                <PerformanceButton
                    className="performance-button glow-hover-maize"
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