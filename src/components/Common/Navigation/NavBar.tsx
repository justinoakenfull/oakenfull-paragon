import React, { useState } from "react";
import { NavButton } from "./NavButton";
import '../../../styles/nav/nav.css'; // Assuming you have a CSS file for styling

const navBarItems = ["Home", "Projects", "About", "Contact"];

export function NavBar() {
    const [activeItem, setActiveItem] = useState(navBarItems[0]);

    return (
        <nav className="navbar">
            <ul className="nav-list relative flex">
                {navBarItems.map((item) => (
                    <NavButton
                        key={item}
                        label={item}
                        isActive={activeItem === item}
                        onClick={() => setActiveItem(item)}
                    />
                ))}
            </ul>
        </nav>
    );
}