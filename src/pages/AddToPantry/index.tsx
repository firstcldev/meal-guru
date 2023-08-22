import { Screen, Window } from "../../components/ui/ViewPort";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import WhatsInPantry from "./WhatsInPantry";
import { useReducer } from "react";
import { AddToPantryFormData, AddToPantryFormUpdateAction } from "./types";

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
    unit: "pcs",
    purchaseDate: new Date(),
    expiryDate: new Date(),
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
                <Box
                    width={"100%"}
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    padding={3}
                    paddingY={12}
                    overflow={"auto"}
                    sx={{
                        transition: "all",
                        transitionDelay: "300ms",
                        transitionTimingFunction: "ease-out",
                    }}
                >
                    <WhatsInPantry
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                </Box>
            </Window>
        </Screen>
    );
};

export default AddToPantry;
