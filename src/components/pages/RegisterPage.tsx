import { IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import BackButton from "../../assets/icons/BackButton";
import "./RegisterPage.css";
import ForwardArrow from "../../assets/icons/ForwardArrow";
import CustomInput from "../common/input";
import { useHistory } from "react-router";

const RegisterPage: React.FC = () => {
    const history = useHistory();

    const navigateBack = () => {
        history.goBack();
    };

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
                <CustomInput label="Name" placeholder="ex: John Smith" />
                <CustomInput
                    label="Email ID"
                    placeholder="ex: name@email.com"
                />
                <CustomInput
                    label="Phone Number"
                    placeholder="Phone number"
                    isMobileNumber={true}
                />
            </IonList>

            <div className="forwardArrow">
                <ForwardArrow />
            </div>
        </div>
    );
};

export default RegisterPage;
