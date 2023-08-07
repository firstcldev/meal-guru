import { useState , useEffect  } from "react";
import BackButton from "../../assets/icons/BackButton";
import "./MFAPage.css";
import { useHistory } from "react-router";
import FilledForwardArrow from "../../assets/icons/FilledForwardArrow";
import ForwardArrow from "../../assets/icons/ForwardArrow";
import { useStore } from "../../../store";
import CustomInput from "../common/input";

interface ContainerProps {
    phoneNumberActual?: string;
}

const MFAPage: React.FC<ContainerProps> = ({ phoneNumberActual }) => {
    const history = useHistory();
    const { phoneNumber, setPhoneNumber } = useStore();
    phoneNumberActual = phoneNumber;

    const [OTPFilled, isOTPFilled] = useState(false);
    const [OTP, setOTP] = useState("");

    const navigateBack = () => {
        history.push("/register");
    };

    const checkIfOTPFiled = () => {
        if (OTP && OTP.length > 0) {
            isOTPFilled(true);
        } else {
            isOTPFilled(false);
        }
    };

    const handleOTPChange = (value: string) => {
        setOTP(value);
        if(value.length > 0){
            isOTPFilled(false);
        }
        else{
            isOTPFilled(true);
        }
        checkIfOTPFiled();
    };
    const goForward = () => {
        if (OTPFilled) {
            history.push({
                pathname: "/pantry",
            });
        }
    };

    useEffect(() => {
        checkIfOTPFiled();
    }, [OTP]);

    return (
        <div>
            <div className="backButtonContainer" onClick={navigateBack}>
                <BackButton />
            </div>

            <div className="mfaBanner">
                <div className="mfaHeading">Register</div>
                <div className="mfaBody">
                    Enter the OTP we sent to +91 {phoneNumberActual} to proceed
                </div>
            </div>

            <div className="otpForm">
                <CustomInput
                    label="OTP"
                    placeholder="4 digit OTP"
                    onChange={handleOTPChange}
                ></CustomInput>
            </div>

            <div className="forwardArrow" onClick={goForward}>
                {OTPFilled ? <FilledForwardArrow /> : <ForwardArrow />}
            </div>
        </div>
    );
};

export default MFAPage;
