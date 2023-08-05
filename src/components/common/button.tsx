import React from "react";
import "./button.css";

interface ContainerProps {
    text: string;
    color: string;
}

const Button: React.FC<ContainerProps> = ({ text, color }) => {
    const buttonStyle = `buttonStyle ${color}`;
    return <button className={buttonStyle}>{text}</button>;
};

export default Button;
