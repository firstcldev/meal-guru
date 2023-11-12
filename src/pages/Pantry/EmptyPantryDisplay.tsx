import { Box, Button, Typography } from "@mui/material";
import Empty_Pantry_Image from "./Empty_Pantry_Illustration.png";
import { Link } from "react-router-dom";

const EmptyPantryDisplay = () => {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            padding={"25px"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            paddingY={"120px"}
        >
            <img src={Empty_Pantry_Image} alt="Pantry is empty" />
            <Typography
                color={"GrayText"}
                textAlign={"center"}
                marginY={"20px"}
            >
                Simply add your groceries, and let Meal Guru handle the rest!
            </Typography>
            <Link to="/add-to-pantry">
                <Button variant="contained">Let's get Started</Button>
            </Link>
        </Box>
    );
};

export default EmptyPantryDisplay;
