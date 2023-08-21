import React from "react";
import MealGuruTitle from "../../../assets/icons/MealGuruTitle";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Window, Screen } from "../../../components/ui/ViewPort";

const Welcome: React.FC = () => {
    return (
        <Screen>
            <Window alignItems={"center"} padding={"25px"}>
                <MealGuruTitle style={{ marginTop: "90px" }} />
                <Typography
                    variant="h6"
                    marginY={"10px"}
                    color={"primary.dark"}
                >
                    Waste less. Save more.
                </Typography>

                <Typography marginTop={"120px"} variant="h6">
                    Create an account to get started.
                </Typography>
                <Button
                    href="/register"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginY: "20px" }}
                >
                    I'm new, sign me up
                </Button>
                <Button variant="outlined" color="secondary" fullWidth>
                    Sign in
                </Button>
            </Window>
        </Screen>
    );
};

export default Welcome;
