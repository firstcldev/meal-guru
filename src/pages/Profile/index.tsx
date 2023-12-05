import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    CircularProgress,
    Divider,
    Toolbar,
    Typography,
} from "@mui/material";
import { IonContent } from "@ionic/react";
import BottomTabs from "../../components/ui/BottomTabs";
import { useCurrentUser } from "../../utils/hooks/useCurrentUser";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { setupNotification } from "../../utils/setupNotif";

const Account = () => {
    const { userData, isLoading } = useCurrentUser();
    const timeInLocalStorage = localStorage.getItem("notificationTime");
    const [notifTime, setNotifTime] = useState<string | null>(
        timeInLocalStorage || null,
    );
    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">My Account</Typography>
                    </Toolbar>
                </AppBar>
                <IonContent>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
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
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="body1">
                                    When to recieve notification?
                                </Typography>
                                <Typography variant="caption">
                                    You'll receive a notification everyday at
                                    this time.
                                </Typography>
                                <TimePicker
                                    sx={{ my: 2 }}
                                    value={dayjs(notifTime, "HH:mm")}
                                    onChange={(e) => {
                                        setNotifTime(
                                            e?.format("HH:mm") || null,
                                        );
                                        setupNotification({
                                            time: e?.format("HH:mm"),
                                        });
                                    }}
                                />
                            </>
                        )}
                    </Box>
                </IonContent>
                <BottomTabs tab="account" color="secondary" />
            </Window>
        </Screen>
    );
};

export default Account;
