import { useHistory } from "react-router";
import Button from "../common/button";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    const history = useHistory();

    const navigateToRegister = () => {
        history.push("/register");
    };

    return (
        <div className="container">
            <div className="introduction">
                <span className="welcomeBanner">WELCOME TO</span>
                <span className="appNameBanner">Meal Guru</span>
                <span className="createAccountTextBanner">
                    {" "}
                    Create an account to get started
                </span>
            </div>

            <div className="buttonsContainer">
                <div className="buttonContainer">
                    <Button
                        text="I'm new, Sign me up"
                        color="primary"
                        onClick={navigateToRegister}
                    ></Button>
                </div>
                <div className="buttonContainer">
                    <Button text="Sign in" color="secondary"></Button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
