import React from "react";

type HorizontalBreak = {
    className?: string;
};

export function HorizontalBreak({ className = "" }: HorizontalBreak) {
    return (
        <hr className={`horizontal-break ${className}`} />
    );
}

