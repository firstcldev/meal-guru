import { Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import { AddToPantryFormData, UpdateFormData } from "./types";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PurchaseAndExpiryProps = {
    formData: AddToPantryFormData;
    updateFormData: UpdateFormData;
};

const PurchaseAndExpiry: React.FC<PurchaseAndExpiryProps> = ({ ...props }) => {
    const [dateMode, setDateMode] = useState<"PURCHASE" | "EXPIRY">("PURCHASE");

    function changeDateMode(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.checked) {
            props?.updateFormData({
                type: "UPDATE_PURCHASEDATE",
                payload: { ...props?.formData, purchaseDate: null },
            });
        } else {
            props?.updateFormData({
                type: "UPDATE_EXPIRYDATE",
                payload: { ...props?.formData, expiryDate: null },
            });
        }
        setDateMode(e.target.checked ? "EXPIRY" : "PURCHASE");
    }

    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 2,
                // to disable this widget if item is not selected yet
                // ...(!props.formData.item
                //     ? { opacity: 0.5, pointerEvents: "none" }
                //     : {}),
            }}
        >
            <FormControlLabel
                sx={{
                    marginX: -3,
                    marginTop: -3,
                    padding: 2,
                    borderRadius: 2,
                    borderEndEndRadius: 0,
                    borderEndStartRadius: 0,
                    backgroundColor: "primary.light",
                }}
                control={
                    <Checkbox
                        color="secondary"
                        checked={dateMode == "EXPIRY"}
                        onChange={(e) => changeDateMode(e)}
                    />
                }
                label="I know the expiry date"
            />
            <Typography variant="h6">
                {dateMode == "PURCHASE"
                    ? "When did you purchase it?"
                    : "When does it expire?"}
            </Typography>
            {dateMode == "PURCHASE" ? (
                <DatePicker
                    value={props?.formData?.purchaseDate}
                    onChange={(e) =>
                        props?.updateFormData({
                            type: "UPDATE_PURCHASEDATE",
                            payload: { ...props.formData, purchaseDate: e },
                        })
                    }
                    disableFuture
                />
            ) : (
                <DatePicker
                    value={props.formData.expiryDate}
                    views={["year", "month"]}
                    openTo="year"
                    onChange={(e) =>
                        props?.updateFormData({
                            type: "UPDATE_EXPIRYDATE",
                            payload: { ...props.formData, expiryDate: e },
                        })
                    }
                    disablePast
                />
            )}
        </Paper>
    );
};

export default PurchaseAndExpiry;
