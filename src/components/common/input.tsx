import React from "react";
import "./input.css"; // You can define your custom styles here

interface CustomInputProps {
    label: string;
    placeholder: string;
    isMobileNumber?: boolean;
    onChange?: (value:string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    placeholder,
    isMobileNumber,
    onChange
}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue); // Call the onChange prop with the new value
    };
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
                onChange={handleChange}
            />
            <div className="custom-input-line"></div>
        </div>
    );
};

export default CustomInput;
