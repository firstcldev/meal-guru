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
import { useReducer } from "react";
import { AddToPantryFormData, AddToPantryFormUpdateAction } from "./types";
import PurchaseAndExpiry from "./PurchaseAndExpiry";
import Quantity from "./Quantity";
import { IonContent } from "@ionic/react";

function handleFormUpdates(
    prevState: AddToPantryFormData,
    action: AddToPantryFormUpdateAction,
): AddToPantryFormData {
    switch (action.type) {
        case "UPDATE_ITEM":
            return { ...prevState, item: action.payload.item };
        case "UPDATE_QUANTITY":
            return { ...prevState, quantity: action.payload.quantity };
        case "UPDATE_UNIT":
            return { ...prevState, unit: action.payload.unit };
        case "UPDATE_PURCHASEDATE":
            return { ...prevState, purchaseDate: action.payload.purchaseDate };
        case "UPDATE_EXPIRYDATE":
            return { ...prevState, expiryDate: action.payload.expiryDate };
        default:
            return prevState;
    }
}

const initialState: AddToPantryFormData = {
    item: "",
    quantity: 0,
    unit: "Weight",
    purchaseDate: null,
    expiryDate: null,
};

const AddToPantry = () => {
    const [formData, updateFormData] = useReducer<typeof handleFormUpdates>(
        handleFormUpdates,
        initialState,
    );
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
                        height={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                        padding={3}
                        marginTop={12}
                        marginBottom={16}
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
                        {/* pantry data from formData is sent to server */}
                        <Button variant="contained">Add to Pantry</Button>
                    </Toolbar>
                </AppBar>
            </Window>
        </Screen>
    );
};

export default AddToPantry;
