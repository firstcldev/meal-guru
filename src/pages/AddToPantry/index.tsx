import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import WhatsInPantry from "./WhatsInPantry";
import { useReducer, useState } from "react";
import { AddToPantryFormData, AddToPantryFormUpdateAction } from "./types";
import PurchaseAndExpiry from "./PurchaseAndExpiry";
import Quantity from "./Quantity";
import { IonContent } from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { modifyPantryByOps } from "../../API/modifyPantryByOps";
import { getCurrentCognitoUserData } from "../../Cognito";
import dayjs from "dayjs";
import SnackbarAlert, {
    SnackbarAlertState,
} from "../../components/ui/SnackbarAlert";

function handleFormUpdates(
    prevState: AddToPantryFormData,
    action: AddToPantryFormUpdateAction,
): AddToPantryFormData {
    const nextState = { ...prevState };
    switch (action.type) {
        case "UPDATE_ITEM":
            nextState.item = action.payload.item;
            break;
        case "UPDATE_QUANTITY":
            nextState.quantity = action.payload.quantity;
            break;
        case "UPDATE_UNIT":
            nextState.unit = action.payload.unit;
            break;
        case "UPDATE_PURCHASEDATE":
            nextState.purchaseDate = action.payload.purchaseDate;
            break;
        case "UPDATE_EXPIRYDATE":
            nextState.expiryDate = action.payload.expiryDate;
            break;
        default:
            return prevState;
    }
    if (
        nextState.item &&
        nextState.quantity &&
        nextState.unit &&
        (nextState.expiryDate || nextState.purchaseDate)
    ) {
        nextState.isValid = true;
    }
    return nextState;
}

const initialState: AddToPantryFormData = {
    item: null,
    quantity: 0,
    unit: "weight",
    purchaseDate: null,
    expiryDate: null,
    isValid: false,
};

const AddToPantry = () => {
    const queryClient = useQueryClient();
    const [formData, updateFormData] = useReducer<typeof handleFormUpdates>(
        handleFormUpdates,
        initialState,
    );
    const { data: userData, isLoading: isUserDataLoading } = useQuery(
        ["profile"],
        getCurrentCognitoUserData,
    );
    const [snackFeedback, setSnackFeedback] = useState<SnackbarAlertState>({
        open: false,
        message: "",
        severity: "info",
    });

    const {
        data,
        isLoading: isAddingItem,
        mutate: sendRequestToAddItem,
    } = useMutation({
        mutationKey: ["add-item", formData.item?.ID, formData.quantity],
        mutationFn: async () => {
            let computedExpiryDate: string;
            if (formData.expiryDate) {
                computedExpiryDate = dayjs(formData.expiryDate).format(
                    "YYYY-MM-DD",
                );
            } else {
                computedExpiryDate = dayjs(formData.purchaseDate)
                    .add(Number(formData.item?.["Shelf Life"].S), "days")
                    .format("YYYY-MM-DD");
            }

            await modifyPantryByOps({
                pantryItems: [
                    {
                        username: userData?.email as string,
                        status: "Create",
                        item: formData.item?.Name.S,
                        unit: formData.unit,
                        quantity: String(formData.quantity),
                        purchaseDate: dayjs(formData.purchaseDate).format(
                            "YYYY-MM-DD",
                        ),
                        expiryDate: computedExpiryDate,
                    },
                ],
            });
        },
        onError: () => {
            setSnackFeedback({
                open: true,
                message: "Something went wrong! Please try again later.",
                severity: "error",
            });
        },
        onSuccess: () => {
            setSnackFeedback({
                open: true,
                message: "Item added to pantry successfully!",
                severity: "success",
            });
            queryClient.refetchQueries(["pantry", userData?.email]);
        },
    });

    return (
        <Screen>
            <Window>
                {/* App bar */}
                <AppBar color="inherit">
                    <Toolbar>
                        <Link to="/pantry">
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6">Add to Pantry</Typography>
                    </Toolbar>
                </AppBar>

                {/* body */}
                <IonContent>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                        padding={3}
                        marginTop={9}
                        marginBottom={9}
                    >
                        <WhatsInPantry
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                        <PurchaseAndExpiry
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                        <Quantity
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    </Box>
                </IonContent>

                <AppBar
                    position="fixed"
                    color="inherit"
                    sx={{ top: "auto", bottom: 0 }}
                >
                    <Toolbar
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link to="/pantry">
                            <Button variant="text" color="secondary">
                                Done Adding
                            </Button>
                        </Link>
                        <Button
                            onClick={() => sendRequestToAddItem()}
                            disabled={
                                isAddingItem ||
                                isUserDataLoading ||
                                !formData.isValid
                            }
                            variant="contained"
                        >
                            {isAddingItem ? "Adding..." : "Add to Pantry"}
                        </Button>
                    </Toolbar>
                </AppBar>
                <SnackbarAlert
                    {...snackFeedback}
                    onClose={() =>
                        setSnackFeedback((snackFeedback) => ({
                            ...snackFeedback,
                            open: false,
                        }))
                    }
                />
            </Window>
        </Screen>
    );
};

export default AddToPantry;
