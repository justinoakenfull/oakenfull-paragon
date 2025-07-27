import React from 'react';

type NavButtonProps = {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
};

function NavButton({ label, isActive, onClick }: NavButtonProps) {
    return (
        <button className={`nav relative glow-hover-maize ${isActive ? 'nav-active' : ''}`}
            onClick={onClick}> {label}</button>
    );
}

export { NavButton };