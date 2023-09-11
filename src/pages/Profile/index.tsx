import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import { IonContent } from "@ionic/react";
import BottomTabs from "../../components/ui/BottomTabs";
import { useQuery } from "@tanstack/react-query";
import { getCurrentCognitoUserData } from "../../Cognito";

const Profile = () => {
    const { data: userData, isLoading } = useQuery(
        ["profile"],
        getCurrentCognitoUserData,
    );

    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">My Profile</Typography>
                    </Toolbar>
                </AppBar>
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
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <Typography variant="h6">
                                    {userData?.name}
                                </Typography>
                                <Typography color={"GrayText"} variant="body1">
                                    {userData?.email}
                                </Typography>
                            </>
                        )}
                    </Box>
                </IonContent>
                <BottomTabs tab="profile" color="secondary" />
            </Window>
        </Screen>
    );
};

export default Profile;
