import { useQuery } from "@tanstack/react-query";
import {
    GetPantryByEmailData,
    getAllPantryDetails,
    getPantryByEmail,
} from "../../API";
import BottomTabs from "../../components/ui/BottomTabs";
import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Box,
    CircularProgress,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import { getCurrentCognitoUserData } from "../../Cognito";
import { Item } from "../AddToPantry/types";
import EmptyPantryDisplay from "../Pantry/EmptyPantryDisplay";
import ItemCard from "../../components/ItemCard";
import { IonContent } from "@ionic/react";
import dayjs from "dayjs";

const PantryCalendar = () => {
    const { data: allItems, isLoading: allItemsLoading } = useQuery({
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

    let groupsByExpiry: {
        [key: string]: (GetPantryByEmailData[0] & { itemData?: Item })[];
    } = {};

    let populatedPantryData:
        | (GetPantryByEmailData[0] & { itemData?: Item })[]
        | undefined = pantryData;

    if (allItems && populatedPantryData) {
        populatedPantryData.forEach((item) => {
            item.itemData = allItems.find((i) => i.Name.S === item.item.S);
            if (item.expiryDate.S) {
                if (groupsByExpiry[item.expiryDate.S]) {
                    groupsByExpiry[item.expiryDate.S].push(item);
                } else {
                    groupsByExpiry[item.expiryDate.S] = [item];
                }
            }
        });
    }

    const expiryDatesInOrder = Object.keys(groupsByExpiry).sort();
    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 2,
                                gap: 1,
                            }}
                        >
                            <Typography variant="h6">
                                Pantry Calendar
                            </Typography>
                            <Typography lineHeight={1}>
                                See all expiring items in one place and update
                                your consumption with a click
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
                <IonContent>
                    <Box sx={{ mt: 16, px: 2 }}>
                        {allItemsLoading || isPantryLoading ? (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : !pantryData || pantryData?.length === 0 ? (
                            <EmptyPantryDisplay />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                {expiryDatesInOrder.map((date) => {
                                    const items = groupsByExpiry[date];
                                    return (
                                        <Paper
                                            key={date}
                                            sx={{
                                                width: "100%",
                                                backgroundColor: "#fff",
                                                p: 2,
                                                borderRadius: 2,
                                                borderLeft:
                                                    dayjs().format(
                                                        "YYYY-MM-DD",
                                                    ) == date
                                                        ? "6px solid #AEE67F"
                                                        : "none",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{ mb: 1, color: "#2E4A13" }}
                                            >
                                                {`${dayjs(date).format(
                                                    "ddd",
                                                )}, ${dayjs(date).format(
                                                    "D",
                                                )} ${dayjs(date).format(
                                                    "MMM",
                                                )}`}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    overflowX: "auto",
                                                    maxWidth: "100%",
                                                    gap: 2,
                                                    py: 1,
                                                }}
                                            >
                                                {items.map((item, k) => (
                                                    <ItemCard
                                                        item={item}
                                                        key={k}
                                                        variant="thumbnail"
                                                    />
                                                ))}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        )}
                    </Box>
                </IonContent>
            </Window>
            <BottomTabs tab="calendar" />
        </Screen>
    );
};

export default PantryCalendar;
