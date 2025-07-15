import { type } from "os";
import React from "react";

type ButtonProps = {
    className: string;
    buttonText: string;
    onClick?: () => void;
};


export function Button({ className, buttonText, onClick }: ButtonProps) {
    return (
        <button className={className} onClick={onClick}>
            {buttonText}
        </button>
    );
}