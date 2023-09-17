import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";

import BottomTabs from "../../components/ui/BottomTabs";
import EmptyPantryDisplay from "./EmptyPantryDisplay";
import { useQuery } from "@tanstack/react-query";
import { getCurrentCognitoUserData } from "../../Cognito";
import { getPantryByEmail } from "../../API";

const Pantry = () => {
    const { data: userData, isLoading: isUserDataLoading } = useQuery(
        ["profile"],
        getCurrentCognitoUserData,
    );
    const { data: pantryData, isLoading: isPantryLoading } = useQuery(
        ["pantry", userData?.email],
        async () => await getPantryByEmail(userData?.email as string),
    );
    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">My Pantry</Typography>
                    </Toolbar>
                </AppBar>
                {isUserDataLoading || isPantryLoading ? (
                    <CircularProgress />
                ) : pantryData ? (
                    <Box>
                        <Typography>{JSON.stringify(pantryData)}</Typography>
                    </Box>
                ) : (
                    <EmptyPantryDisplay />
                )}
                <BottomTabs tab="pantry" color="secondary" />
            </Window>
        </Screen>
    );
};

export default Pantry;
