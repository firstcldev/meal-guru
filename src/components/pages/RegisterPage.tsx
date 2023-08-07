import { IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import BackButton from "../../assets/icons/BackButton";
import "./RegisterPage.css";
import ForwardArrow from "../../assets/icons/ForwardArrow";
import CustomInput from "../common/input";
import { useHistory } from "react-router";
import { useState } from "react";
import { useStore } from "../../../store";
import FilledForwardArrow from "../../assets/icons/FilledForwardArrow";

const RegisterPage: React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {phoneNumber, setPhoneNumber} = useStore();
    const [isFormFilled, setIsFormFilled] = useState(false);

    const checkFormFilled = () => {
        if (name && email && phoneNumber) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    };

    const handleNameChange = (value: string) => {
        setName(value);
        checkFormFilled();
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        checkFormFilled();
    };

    const handlePhoneNumberChange = (value: string) => {
        setPhoneNumber(value);
        checkFormFilled();
    };

    const navigateBack = () => {
        history.replace("/")
    };

    const goForwardToOTP = () => {
        if(isFormFilled){
            history.push({
                pathname: "/mfa",
            });
        }
    }

    return (
        <div>
            <div className="backButtonContainer" onClick={navigateBack}>
                <BackButton />
            </div>

            <div className="registerBanner">
                <div className="registerHeading">Register</div>
                <div className="registerBody">
                    Create an account to get started
                </div>
            </div>

            <IonList className="registerForm">
                <CustomInput
                    label="Name"
                    placeholder="ex: John Smith"
                    onChange={handleNameChange}
                />
                <CustomInput
                    label="Email ID"
                    placeholder="ex: name@email.com"
                    onChange={handleEmailChange}
                />
                <CustomInput
                    label="Phone Number"
                    placeholder="Phone number"
                    isMobileNumber={true}
                    onChange={handlePhoneNumberChange}
                />
            </IonList>

            <div className="forwardArrow" onClick={goForwardToOTP}>
                {isFormFilled ? (
                    <FilledForwardArrow></FilledForwardArrow>
                ) : (
                    <ForwardArrow />
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
