import React from "react";
import { NavButton } from "./NavButton";
import { PerformanceButton } from "./PerformanceButton";
import '../../../styles/nav/nav.css';
import '../../../styles/nav/performance-button.css';

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
            </div>
        </nav>
    );
}