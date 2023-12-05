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
import { getAllPantryDetails, getPantryByEmail } from "../../API";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PantryDisplay from "./PantryDisplay";

const Pantry = () => {
    const { isLoading: allItemsLoading } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });
    const { data: pantryData, isLoading: isPantryLoading } = useQuery(
        ["pantry"],
        async () => {
            const userData = await getCurrentCognitoUserData();
            return getPantryByEmail(userData?.email as string);
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
                {isPantryLoading || allItemsLoading ? (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            my: 5,
                        }}
                    >
                        <CircularProgress sx={{ marginTop: 5 }} />
                    </Box>
                ) : pantryData && pantryData?.length > 0 ? (
                    <Box
                        paddingX={1}
                        height={"100%"}
                        marginTop={9}
                        marginBottom={16}
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
