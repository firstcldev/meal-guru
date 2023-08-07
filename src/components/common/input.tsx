import React from "react";
import "./input.css"; // You can define your custom styles here

interface CustomInputProps {
    label: string;
    placeholder: string;
    isMobileNumber?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    placeholder,
    isMobileNumber,
}) => {
    return (
        <div className="custom-input-container">
            <label className="custom-input-label">{label}</label>
            {isMobileNumber && <span className="mobile-prefix">IN +91 |</span>}
            <input
                type="text"
                className={`custom-input-field ${
                    isMobileNumber ? "mobile-input" : ""
                }`}
                placeholder={placeholder}
            />
            <div className="custom-input-line"></div>
        </div>
    );
};

export default CustomInput;
