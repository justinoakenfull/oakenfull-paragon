import React from "react";
import { NavButton } from "./NavButton";
import '../../../styles/nav/nav.css'; // Assuming you have a CSS file for styling

const navBarItems = ["Home", "Projects", "About", "Skills", "Contact"] as const;
type NavItem = typeof navBarItems[number];

type NavBarProps = {
    activeItem: NavItem;
    onChange: (item: NavItem) => void;
};

export function NavBar({ activeItem, onChange }: NavBarProps) {

    return (
        <nav className="navbar backdrop-blur-lg">
            <ul className="nav-list relative flex">
                {navBarItems.map((item) => (
                    <NavButton
                        key={item}
                        label={item}
                        isActive={activeItem === item}
                        onClick={() => onChange(item)}
                    />
                ))}
            </ul>
        </nav>
    );
}