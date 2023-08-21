import React from "react";
import { Box, BoxProps } from "@mui/material";

export const Window: React.FC<BoxProps> = ({ ...props }) => {
    return (
        <Box
            maxWidth={"480px"}
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            {...props}
        >
            {props?.children}
        </Box>
    );
};

export const Screen: React.FC<BoxProps> = ({ ...props }) => {
    return (
        <Box
            display={"flex"}
            width={"100%"}
            minHeight={"100%"}
            justifyContent={"center"}
            {...props}
        >
            {props?.children}
        </Box>
    );
};
