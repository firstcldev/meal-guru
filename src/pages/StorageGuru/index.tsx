import React, { useState } from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import {
    AppBar,
    Avatar,
    Box,
    CircularProgress,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import BottomTabs from "../../components/ui/BottomTabs";
import { IonContent } from "@ionic/react";
import { getAllPantryDetails } from "../../API";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "./EmptyState";
import TipDrawer from "./TipDrawer";
import { Item } from "../AddToPantry/types";

const StorageGuru = () => {
    const [searchWord, setSearchWord] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<Item>(null);
    const [tipDrawerOpen, setTipDrawerOpen] = useState<boolean>(false);
    const { data: allItems, isLoading: allItemsLoading } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });

    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">Storage Guru</Typography>
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
                        <AppBar
                            elevation={0}
                            sx={{
                                paddingY: 3,
                                backgroundColor: "#f2f2f2",
                            }}
                            color="inherit"
                        >
                            <Toolbar sx={{ paddingTop: 9, paddingX: 4 }}>
                                <TextField
                                    value={searchWord}
                                    onChange={(e) =>
                                        setSearchWord(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth
                                    label="Search for an item"
                                    placeholder="Ex. Tomato"
                                />
                            </Toolbar>
                        </AppBar>

                        {!searchWord ? (
                            <EmptyState />
                        ) : (
                            <Box
                                width={"100%"}
                                display={"flex"}
                                flexDirection={"column"}
                                paddingTop={12}
                            >
                                {allItemsLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <List>
                                        {allItems
                                            ?.filter(
                                                (item) =>
                                                    item.Name.S?.toLowerCase().includes(
                                                        searchWord.toLowerCase(),
                                                    ),
                                            )
                                            .map((item, k) => (
                                                <ListItemButton
                                                    key={k}
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setTipDrawerOpen(true);
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={item.Name?.S}
                                                            src={item.URL?.S}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText>
                                                        {item.Name?.S}
                                                    </ListItemText>
                                                </ListItemButton>
                                            ))}
                                    </List>
                                )}
                            </Box>
                        )}
                    </Box>
                </IonContent>
                <TipDrawer
                    item={selectedItem}
                    open={tipDrawerOpen}
                    onClose={() => setTipDrawerOpen(false)}
                />
                <BottomTabs tab="storage-guru" color="secondary" />
            </Window>
        </Screen>
    );
};

export default StorageGuru;
