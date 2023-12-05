import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React from "react";

type PurchaseAndExpiryInputProps = {
    date: Dayjs | null;
    dateMode: "PURCHASE" | "EXPIRY";
    onDateModeChange: (newMode: "PURCHASE" | "EXPIRY") => void;
    onDateChange: (e: Dayjs | null) => void;
};

export const PurchaseAndExpiryInput: React.FC<PurchaseAndExpiryInputProps> = ({
    ...props
}) => {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <FormControlLabel
                sx={{
                    padding: 2,
                    margin: 0,
                    borderRadius: 2,
                    borderEndEndRadius: 0,
                    borderEndStartRadius: 0,
                    backgroundColor: "#F5FBF0",
                }}
                control={
                    <Checkbox
                        color="secondary"
                        checked={props?.dateMode == "EXPIRY"}
                        onChange={(e) =>
                            props?.onDateModeChange(
                                e?.target.checked ? "EXPIRY" : "PURCHASE",
                            )
                        }
                    />
                }
                label="I know the expiry date"
            />
            <Typography variant="h6" mx={2} mt={2}>
                {props?.dateMode == "PURCHASE"
                    ? "When did you purchase it?"
                    : "When does it expire?"}
            </Typography>
            <DatePicker
                sx={{ m: 2 }}
                value={props?.date}
                onChange={(e) => props?.onDateChange(e)}
                disablePast={props?.dateMode === "EXPIRY"}
                disableFuture={props?.dateMode === "PURCHASE"}
            />
        </Box>
    );
};

export default PurchaseAndExpiryInput;
