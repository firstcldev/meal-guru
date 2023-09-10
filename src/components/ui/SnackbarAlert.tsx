import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

const SnackbarAlert: React.FC<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    onClose?: () => void;
}> = ({ ...props }) => {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={4000}
            onClose={props?.onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            action={
                <IconButton aria-label="close" onClick={props?.onClose}>
                    <Close fontSize="small" />
                </IconButton>
            }
        >
            <Alert severity={props.severity}>{props.message}</Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;
