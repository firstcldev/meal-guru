import { useState } from "react";
import { GetPantryByEmailData } from "../../API";
import { Item } from "../../pages/AddToPantry/types";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Typography,
} from "@mui/material";
import SnackbarAlert, { SnackbarAlertState } from "../ui/SnackbarAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyPantryByOps } from "../../API/modifyPantryByOps";
import { ExpandMore } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import PurchaseAndExpiryInput from "../ui/PurchaseAndExpiryInput";

export const ExpiryUpdatingBox = ({
    item,
    ...props
}: {
    item: GetPantryByEmailData[0] & { itemData?: Item };
}) => {
    const queryClient = useQueryClient();
    const [isExpiryEditorOpen, setIsExpiryEditorOpen] = useState(false);
    const [dateMode, setDateMode] = useState<"PURCHASE" | "EXPIRY">("PURCHASE");
    const [newExpiryDate, setNewExpiryDate] = useState<Dayjs | null>(
        item.expiryDate.S ? dayjs(item.expiryDate.S) : dayjs(),
    );
    const [newPurchaseDate, setNewPurchaseDate] = useState<Dayjs | null>(
        item.purchaseDate.S ? dayjs(item.purchaseDate.S) : dayjs(),
    );
    const [changed, setChanged] = useState<boolean>(false);
    const [snackbarAlert, setSnackbarAlert] = useState<SnackbarAlertState>({
        open: false,
        severity: "info",
        message: "",
    });

    const { mutate: sendExpiryUpdateRequest, isLoading: isUpdatingExpiry } =
        useMutation({
            mutationFn: () =>
                modifyPantryByOps({
                    pantryItems: [
                        {
                            status: "Update",
                            username: item.username.S,
                            pantryItemId: item.pantryItemId.S,
                            ...(dateMode == "EXPIRY"
                                ? {
                                      expiryDate:
                                          dayjs(newExpiryDate).format(
                                              "YYYY-MM-DD",
                                          ),
                                  }
                                : {
                                      purchaseDate:
                                          dayjs(newPurchaseDate).format(
                                              "YYYY-MM-DD",
                                          ),
                                      expiryDate: dayjs(newPurchaseDate)
                                          .add(
                                              Number(
                                                  item.itemData?.["Shelf Life"]
                                                      .S,
                                              ),
                                              "day",
                                          )
                                          .format("YYYY-MM-DD"),
                                  }),
                        },
                    ],
                }),
            onError: () => {
                setSnackbarAlert({
                    open: true,
                    severity: "error",
                    message: "Error updating Expiry",
                });
            },
            onSuccess: () => {
                setSnackbarAlert({
                    open: true,
                    severity: "success",
                    message:
                        "Expiry updated successfully. Refreshing your pantry...",
                });
                queryClient.refetchQueries(["pantry"]);
                setChanged(false);
                if (dateMode == "PURCHASE") {
                    setNewExpiryDate(
                        dayjs(newPurchaseDate).add(
                            Number(item.itemData?.["Shelf Life"].S),
                            "day",
                        ),
                    );
                }
            },
        });
    return (
        <>
            <SnackbarAlert
                {...snackbarAlert}
                onClose={() => setSnackbarAlert((p) => ({ ...p, open: false }))}
            />
            <Accordion
                expanded={isExpiryEditorOpen}
                onChange={() => setIsExpiryEditorOpen(!isExpiryEditorOpen)}
            >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Edit {dateMode == "EXPIRY" ? "expiry" : "purchase"}{" "}
                            date
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <PurchaseAndExpiryInput
                        date={
                            dateMode == "EXPIRY"
                                ? newExpiryDate
                                : newPurchaseDate
                        }
                        dateMode={dateMode}
                        onDateChange={(e) => {
                            dateMode == "EXPIRY"
                                ? setNewExpiryDate(e)
                                : setNewPurchaseDate(e);
                            setChanged(true);
                        }}
                        onDateModeChange={(e) => setDateMode(e)}
                    />
                </AccordionDetails>
                <AccordionActions sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        disabled={isUpdatingExpiry || !changed}
                        onClick={() => sendExpiryUpdateRequest()}
                    >
                        {isUpdatingExpiry ? "Updating..." : "Update"}
                    </Button>
                </AccordionActions>
            </Accordion>
            <Alert
                severity="warning"
                sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
                {
                    "Edit this only if you've entered the wrong date of expiry/purchase."
                }
            </Alert>
        </>
    );
};
