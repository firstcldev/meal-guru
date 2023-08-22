import React, { useReducer } from "react";
import { Window, Screen } from "../../../components/ui/ViewPort";
import { Button, Typography, Box, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SignUpFormData {
    name: string;
    email: string;
    phone: string;
    isValid: boolean;
}

interface SignUpFormAction {
    type: "UPDATE_NAME" | "UPDATE_EMAIL" | "UPDATE_PHONE";
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
        case "UPDATE_PHONE":
            nextState.phone = action.payload;
            break;
        default:
            return nextState;
    }
    // TODO: perform validation
    if (nextState.email && nextState.name && nextState.phone) {
        nextState.isValid = true;
    } else {
        nextState.isValid = false;
    }
    return nextState;
};

const Register: React.FC = () => {
    const [formData, updateFormData] = useReducer<typeof handleChange>(
        handleChange,
        {
            name: "",
            email: "",
            phone: "",
            isValid: false,
        },
    );

    const handleFormSubmit = () => {
        // TODO: submit
    };

    return (
        <Screen>
            <Window
                paddingX={"25px"}
                paddingY={"40px"}
                justifyContent={"space-between"}
            >
                <Box width={"100%"}>
                    <IconButton href="/" size="large" color="secondary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography marginTop={"20px"} variant="h4">
                        Register
                    </Typography>
                    <Typography color={"GrayText"} marginY={"10px"}>
                        Create an account to get started
                    </Typography>

                    <TextField
                        sx={{ marginTop: "60px" }}
                        fullWidth
                        label="Name"
                        type="text"
                        required
                        placeholder="ex: Pratik Shanbhag"
                        variant="standard"
                        value={formData.name}
                        onChange={(e) =>
                            updateFormData({
                                type: "UPDATE_NAME",
                                payload: e.target.value,
                            })
                        }
                    />
                    <TextField
                        sx={{ marginTop: "25px" }}
                        fullWidth
                        label="Email"
                        type="email"
                        required
                        placeholder="ex: name@email.com"
                        variant="standard"
                        value={formData.email}
                        onChange={(e) =>
                            updateFormData({
                                type: "UPDATE_EMAIL",
                                payload: e.target.value,
                            })
                        }
                    />
                    <TextField
                        sx={{ marginTop: "25px" }}
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        required
                        placeholder="Phone Number"
                        variant="standard"
                        value={formData.phone}
                        onChange={(e) =>
                            updateFormData({
                                type: "UPDATE_PHONE",
                                payload: e.target.value,
                            })
                        }
                    />
                </Box>
                <Button
                    disabled={!formData.isValid}
                    fullWidth
                    variant="contained"
                    onClick={handleFormSubmit}
                >
                    Sign Up
                </Button>
            </Window>
        </Screen>
    );
};

export default Register;
