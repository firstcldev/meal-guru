import { Box, Typography } from "@mui/material";

const EmptyState = () => {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingY={16}
        >
            <Typography variant="h6" textAlign={"center"}>
                Store Smarter, Waste less.
            </Typography>
            <Typography
                variant="subtitle1"
                textAlign={"center"}
                color={"#737373"}
            >
                Search for items to learn how to store them properly and reduce
                waste.
            </Typography>
        </Box>
    );
};

export default EmptyState;
