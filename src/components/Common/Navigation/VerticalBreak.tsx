import React from "react";
import '../../../styles/nav/nav.css';

type VerticalBreakProps = {
    className?: string;
};

export function VerticalBreak({ className = "" }: VerticalBreakProps) {
    return (
        <div className={`vertical-break ${className}`} />
    );
}