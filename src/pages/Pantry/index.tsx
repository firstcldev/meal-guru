import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";

import BottomTabs from "../../components/ui/BottomTabs";
import EmptyPantryDisplay from "./EmptyPantryDisplay";
import { useQuery } from "@tanstack/react-query";
import { getCurrentCognitoUserData } from "../../Cognito";
import { getPantryByEmail } from "../../API";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PantryDisplay from "./PantryDisplay";

const Pantry = () => {
    const { data: userData, isLoading: isUserDataLoading } = useQuery(
        ["profile"],
        getCurrentCognitoUserData,
    );
    const { data: pantryData, isLoading: isPantryLoading } = useQuery(
        ["pantry", userData?.email],
        async () => await getPantryByEmail(userData?.email as string),
        {
            enabled: !!userData?.email,
        },
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
                    <CircularProgress sx={{ marginTop: 5 }} />
                ) : pantryData && pantryData?.length > 0 ? (
                    <Box
                        paddingX={1}
                        height={"100%"}
                        marginTop={9}
                        marginBottom={15}
                    >
                        <Link to={"/add-to-pantry"}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Add />}
                                fullWidth
                            >
                                Add to Pantry
                            </Button>
                        </Link>
                        <PantryDisplay pantryData={pantryData} />
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
