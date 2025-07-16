import React from "react";
import { ReactComponent as PerformanceIcon } from '../../../assets/icons/performance.svg';

type PerformanceButtonProps = {
    iconColour?: string;
    className: string;
    onClick?: () => void;
};

const baseClass = "";

export function PerformanceButton({ className = "", onClick }: PerformanceButtonProps) {
    return (
        <button className={`${baseClass} ${className}`} onClick={onClick}>
            <PerformanceIcon className="w-6 h-6" />
            <span className="performance-text">Performance</span>
        </button>
    );
}