import React, { useState } from "react";
import { GetPantryByEmailData } from "../../../API";
import { Item } from "../../AddToPantry/types";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography,
} from "@mui/material";
import SnackbarAlert, {
    SnackbarAlertState,
} from "../../../components/ui/SnackbarAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyPantryByOps } from "../../../API/modifyPantryByOps";
import { ExpandMore } from "@mui/icons-material";
import { QuantityInput } from "../../../components/ui/QuantityInput";
import { formatQuantity } from "../../../utils/formatQuantity";

export const QuantityUpdatingBox = ({
    item,
    ...props
}: {
    item: GetPantryByEmailData[0] & { itemData?: Item };
}) => {
    const queryClient = useQueryClient();
    const [isQuantityEditorOpen, setIsQuantityEditorOpen] = useState(false);
    const [consumedQuantity, setConsumedQuantity] = useState<number>(0);
    const [snackbarAlert, setSnackbarAlert] = useState<SnackbarAlertState>({
        open: false,
        severity: "info",
        message: "",
    });

    const { mutate: sendQuantityUpdateRequest, isLoading: isUpdatingQuantity } =
        useMutation({
            mutationFn: () =>
                modifyPantryByOps({
                    pantryItems: [
                        {
                            status: "Update",
                            username: item.username.S,
                            pantryItemId: item.pantryItemId.S,
                            quantity: (
                                Number(item.quantity.S) - consumedQuantity
                            ).toFixed(3),
                        },
                    ],
                }),
            onError: () => {
                setSnackbarAlert({
                    open: true,
                    severity: "error",
                    message: "Error updating quantity",
                });
            },
            onSuccess: () => {
                setSnackbarAlert({
                    open: true,
                    severity: "success",
                    message:
                        "Quantity updated successfully. Refreshing your pantry...",
                });
                queryClient.refetchQueries(["pantry"]);
                setConsumedQuantity(0);
            },
        });
    return (
        <>
            <SnackbarAlert
                {...snackbarAlert}
                onClose={() => setSnackbarAlert((p) => ({ ...p, open: false }))}
            />
            <Accordion
                expanded={isQuantityEditorOpen}
                onChange={() => setIsQuantityEditorOpen(!isQuantityEditorOpen)}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Update inventory</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 1,
                        }}
                    >
                        <Typography>Currently available </Typography>
                        <Typography
                            variant="subtitle1"
                            padding={1}
                            sx={{
                                backgroundColor: "#ECF1F8",
                                borderRadius: 2,
                            }}
                        >
                            <>{formatQuantity(item.quantity.S, item.unit.S)}</>
                        </Typography>
                    </Box>
                    <Typography px={1} my={2}>
                        Consumed:
                    </Typography>
                    <QuantityInput
                        unit={item.unit.S}
                        onChange={(v) => setConsumedQuantity(v)}
                        value={consumedQuantity}
                    />
                </AccordionDetails>
                <AccordionActions sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        disabled={consumedQuantity == 0 || isUpdatingQuantity}
                        onClick={() => {
                            if (
                                Number(item.quantity.S) - consumedQuantity <
                                0
                            ) {
                                setSnackbarAlert({
                                    message:
                                        "Cannot consume more than what's available.",
                                    open: true,
                                    severity: "error",
                                });
                            } else {
                                sendQuantityUpdateRequest();
                            }
                        }}
                    >
                        {isUpdatingQuantity ? "Updating..." : "Update"}
                    </Button>
                </AccordionActions>
            </Accordion>
        </>
    );
};
