import { Paper } from "@mui/material";
import { AddToPantryFormData, UpdateFormData } from "./types";
import { useState } from "react";
import PurchaseAndExpiryInput from "../../components/ui/PurchaseAndExpiryInput";
import dayjs from "dayjs";

type PurchaseAndExpiryProps = {
    formData: AddToPantryFormData;
    updateFormData: UpdateFormData;
};

const PurchaseAndExpiry: React.FC<PurchaseAndExpiryProps> = ({ ...props }) => {
    const [dateMode, setDateMode] = useState<"PURCHASE" | "EXPIRY">("PURCHASE");

    function changeDateMode(newMode: "PURCHASE" | "EXPIRY"): void {
        if (newMode == "EXPIRY") {
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
        setDateMode(newMode);
    }

    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                // to disable this widget if item is not selected yet
                // ...(!props.formData.item
                //     ? { opacity: 0.5, pointerEvents: "none" }
                //     : {}),
            }}
        >
            <PurchaseAndExpiryInput
                date={
                    dateMode === "EXPIRY"
                        ? dayjs(props.formData.expiryDate)
                        : dayjs(props.formData.purchaseDate)
                }
                onDateChange={(e) =>
                    props?.updateFormData({
                        type:
                            dateMode === "EXPIRY"
                                ? "UPDATE_EXPIRYDATE"
                                : "UPDATE_PURCHASEDATE",
                        payload: {
                            ...props.formData,
                            ...(dateMode === "EXPIRY"
                                ? { expiryDate: e?.toDate() || null }
                                : { purchaseDate: e?.toDate() || null }),
                        },
                    })
                }
                dateMode={dateMode}
                onDateModeChange={(e) => changeDateMode(e)}
            />
        </Paper>
    );
};

export default PurchaseAndExpiry;
