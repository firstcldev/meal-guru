import React, { useEffect, useState } from "react";
import { Window, Screen } from "../../../components/ui/ViewPort";
import {
    Button,
    Typography,
    Box,
    IconButton,
    Snackbar,
    Alert,
    TextField,
    Link,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { confirmUserWithCode, resendConfirmationCode } from "../../../Cognito";
import { useMutation } from "@tanstack/react-query";
import { Close } from "@mui/icons-material";
import SnackbarAlert, {
    SnackbarAlertState,
} from "../../../components/ui/SnackbarAlert";

const ConfirmEmail: React.FC = () => {
    const history = useHistory();
    const [conformationCode, setConfirmationCode] = useState<string>("");
    const emailId = history.location.search.split("=")[1];
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0)
                setTimeRemaining((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // snackbar for feedback
    const [snackBar, setSnackBar] = useState<SnackbarAlertState>({
        open: false,
        message: "",
        severity: "success",
    });

    const { isLoading: isResendLoading, mutate: sendRequestToResendCode } =
        useMutation({
            mutationFn: async (t) => await resendConfirmationCode(emailId),
            mutationKey: ["resend-confirmation-code", emailId],
            onSuccess: (response) => {
                setSnackBar({
                    open: true,
                    message:
                        "Confirmation code sent successfully! Check you mail.",
                    severity: "success",
                });
                setTimeRemaining(60);
            },
            onError: (response: any) => {
                setSnackBar({
                    open: true,
                    message: response?.error as string,
                    severity: "error",
                });
            },
        });

    const { isLoading, mutate: sendRequestToConfirmCode } = useMutation({
        mutationFn: async (t) =>
            await confirmUserWithCode(emailId, conformationCode),
        mutationKey: ["confirm-email", emailId],
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
                    "Email confirmed successfully! Please login to continue.",
                severity: "success",
            });
            //wait for 2.5 seconds and redirect to login
            setTimeout(() => {
                history.push(`/login`);
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
                    style={{ height: "100%" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendRequestToConfirmCode();
                    }}
                >
                    <Box width={"100%"}>
                        <Typography marginTop={"20px"} variant="h4">
                            Confirm your Email
                        </Typography>
                        <Typography color={"GrayText"} marginY={3}>
                            {`Enter the 6 digit confirmation code that was sent to your email: ${emailId}`}
                        </Typography>

                        <TextField
                            label={"Confirmation Code"}
                            sx={{ marginTop: 2 }}
                            variant="outlined"
                            value={conformationCode}
                            onChange={(e) =>
                                setConfirmationCode(e.target.value)
                            }
                            placeholder="Ex. 123456"
                            fullWidth
                            required
                            type="text"
                            error={
                                conformationCode.length > 0 &&
                                conformationCode.length !== 6
                            }
                        />
                        <Typography component={"span"}>
                            Didn't receive the code?{" "}
                            <Button
                                onClick={() => sendRequestToResendCode()}
                                disabled={isResendLoading || timeRemaining != 0}
                                component={"span"}
                                variant="text"
                            >
                                Resend
                            </Button>{" "}
                            <Typography component={"span"} color={"GrayText"}>
                                {`${timeRemaining}s`}
                            </Typography>
                        </Typography>
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
                            disabled={conformationCode.length != 6 || isLoading}
                            fullWidth
                            variant="contained"
                            type="submit"
                        >
                            {isLoading ? "Loading..." : "Confirm my Email"}
                        </Button>
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

export default ConfirmEmail;
