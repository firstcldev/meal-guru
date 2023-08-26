import { Screen, Window } from "../../components/ui/ViewPort";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import BottomTabs from "../../components/ui/BottomTabs";
import EmptyPantryDisplay from "./EmptyPantryDisplay";

const Pantry = () => {
    const PantryData = false; //TODO: fetchdata
    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">My Pantry</Typography>
                    </Toolbar>
                </AppBar>
                {PantryData ? (
                    <Box>{/* pantry UI  */}</Box>
                ) : (
                    <EmptyPantryDisplay />
                )}
                <BottomTabs tab="pantry" color="secondary" />
            </Window>
        </Screen>
    );
};

export default Pantry;
