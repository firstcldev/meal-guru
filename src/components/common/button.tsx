import React from "react";
import "./button.css";

interface ContainerProps {
    text: string;
    color: string;
    onClick?: () => void;
}

const Button: React.FC<ContainerProps> = ({ text, color, onClick }) => {
    const buttonStyle = `buttonStyle ${color}`;
    return (
        <button className={buttonStyle} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
