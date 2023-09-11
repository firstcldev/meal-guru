import React, { useReducer, useState } from "react";
import { Window, Screen } from "../../../components/ui/ViewPort";
import {
    Button,
    Typography,
    Box,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useHistory } from "react-router-dom";
import { registerNewUser } from "../../../Cognito";
import { isEmailValid, isPasswordValid } from "../validators";
import { Emailfield, Namefield, Passwordfield } from "../fields";
import { useMutation } from "@tanstack/react-query";
import { Close } from "@mui/icons-material";
import SnackbarAlert, {
    SnackbarAlertState,
} from "../../../components/ui/SnackbarAlert";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    isValid: boolean;
}

interface SignUpFormAction {
    type: "UPDATE_NAME" | "UPDATE_EMAIL" | "UPDATE_PASSWORD";
    payload: string;
}

const handleChange = (
    prevState: SignUpFormData,
    action: SignUpFormAction,
): SignUpFormData => {
    let nextState: SignUpFormData = structuredClone(prevState);
    switch (action.type) {
        case "UPDATE_NAME":
            nextState.name = action.payload;
            break;
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
        nextState.name &&
        nextState.password &&
        isEmailValid(nextState.email) &&
        isPasswordValid(nextState.password)
    ) {
        nextState.isValid = true;
    } else {
        nextState.isValid = false;
    }
    return nextState;
};

const Register: React.FC = () => {
    const history = useHistory();
    const [formData, updateFormData] = useReducer<typeof handleChange>(
        handleChange,
        {
            name: "",
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

    const { isLoading, mutate: sendRequestToRegister } = useMutation({
        mutationFn: async (t) =>
            await registerNewUser(
                formData.name,
                formData.email,
                formData.password,
            ),
        mutationKey: ["register-new-user", formData.email],
        onError: (response: any) =>
            setSnackBar({
                open: true,
                message: response?.error as string,
                severity: "error",
            }),
        onSuccess: (response) => {
            setSnackBar({
                open: true,
                message:
                    "Successfully registered! Please check your email for verification.",
                severity: "success",
            });
            //wait for 2.5 seconds and redirect to confirm page
            setTimeout(() => {
                history.push(
                    `/confirm-email?email=${response.data?.getUsername()}`,
                );
            }, 2500);
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
                        sendRequestToRegister();
                    }}
                >
                    <Box width={"100%"}>
                        <Link to="/">
                            <IconButton size="large" color="secondary">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Typography marginTop={"20px"} variant="h4">
                            Register
                        </Typography>
                        <Typography color={"GrayText"} marginY={"10px"}>
                            Create an account to get started
                        </Typography>

                        <Namefield
                            value={formData.name}
                            onChange={(e) =>
                                updateFormData({
                                    type: "UPDATE_NAME",
                                    payload: e.target.value,
                                })
                            }
                        />
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
                            {isLoading ? "Loading..." : "Sign Up"}
                        </Button>
                        <Typography component={"span"}>
                            Already have an account?{" "}
                            <Link to={"/login"}>
                                <Typography
                                    component={"span"}
                                    color={"primary.dark"}
                                    fontWeight={600}
                                >
                                    Login
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

export default Register;
