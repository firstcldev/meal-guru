import React, { useReducer, useState } from "react";
import { Window, Screen } from "../../../components/ui/ViewPort";
import {
    Button,
    Typography,
    Box,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useHistory } from "react-router-dom";
import { Emailfield, Passwordfield } from "../fields";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../../Cognito";
import { Close } from "@mui/icons-material";
import { isEmailValid } from "../validators";
import SnackbarAlert, {
    SnackbarAlertState,
} from "../../../components/ui/SnackbarAlert";
import { useIonRouter } from "@ionic/react";

interface LoginFormData {
    email: string;
    password: string;
    isValid: boolean;
}

interface LoginFormAction {
    type: "UPDATE_EMAIL" | "UPDATE_PASSWORD";
    payload: string;
}

const handleChange = (
    prevState: LoginFormData,
    action: LoginFormAction,
): LoginFormData => {
    let nextState: LoginFormData = structuredClone(prevState);
    switch (action.type) {
        case "UPDATE_EMAIL":
            nextState.email = action.payload;
            break;
        case "UPDATE_PASSWORD":
            nextState.password = action.payload;
            break;
        default:
            return nextState;
    }
    if (
        nextState.email &&
        nextState.password &&
        isEmailValid(nextState.email)
    ) {
        nextState.isValid = true;
    } else {
        nextState.isValid = false;
    }
    return nextState;
};

const Login: React.FC = () => {
    const [formData, updateFormData] = useReducer<typeof handleChange>(
        handleChange,
        {
            email: "",
            password: "",
            isValid: false,
        },
    );
    // snackbar for feedback
    const [snackBar, setSnackBar] = useState<SnackbarAlertState>({
        open: false,
        message: "",
        severity: "success",
    });

    const { isLoading, mutate: sendRequestToAuthenticate } = useMutation({
        mutationKey: ["login", formData.email],
        mutationFn: async () =>
            await authenticateUser(formData.email, formData.password),
        onSuccess: (response) => {
            setSnackBar({
                open: true,
                message: "Successfully logged in!",
                severity: "success",
            });
            //wait for 2.5 seconds and redirect to pantry page
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        },
        onError: (response: any) => {
            setSnackBar({
                open: true,
                message: response?.error,
                severity: "error",
            });
        },
    });

    return (
        <Screen>
            <Window
                paddingX={"25px"}
                paddingTop={"40px"}
                justifyContent={"space-between"}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendRequestToAuthenticate();
                    }}
                >
                    <Box width={"100%"}>
                        <Link to="/">
                            <IconButton size="large" color="secondary">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Typography marginTop={"20px"} variant="h4">
                            Sign in to Meal Guru
                        </Typography>
                        <Typography color={"GrayText"} marginY={"10px"}>
                            Enter your Email and Password
                        </Typography>

                        <Emailfield
                            value={formData.email}
                            onChange={(e) =>
                                updateFormData({
                                    type: "UPDATE_EMAIL",
                                    payload: e.target.value,
                                })
                            }
                        />
                        <Passwordfield
                            value={formData.password}
                            onChange={(e) =>
                                updateFormData({
                                    type: "UPDATE_PASSWORD",
                                    payload: e.target.value,
                                })
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            marginY: 3,
                        }}
                        width={"100%"}
                    >
                        <Button
                            disabled={!formData.isValid || isLoading}
                            fullWidth
                            variant="contained"
                            type="submit"
                        >
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                        <Typography component={"span"}>
                            {"Don't have an account? "}
                            <Link to={"/register"}>
                                <Typography
                                    component={"span"}
                                    color={"primary.dark"}
                                    fontWeight={600}
                                >
                                    Sign Up
                                </Typography>{" "}
                            </Link>
                        </Typography>
                    </Box>
                </form>
                <SnackbarAlert
                    open={snackBar.open}
                    message={snackBar.message}
                    severity={snackBar.severity}
                    onClose={() => setSnackBar({ ...snackBar, open: false })}
                />
            </Window>
        </Screen>
    );
};

export default Login;
