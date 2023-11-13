import { useQuery } from "@tanstack/react-query";
import { GetPantryByEmailData, getAllPantryDetails } from "../../API";
import { Item } from "../AddToPantry/types";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { IonContent } from "@ionic/react";
import ItemCard from "./ItemCard";

const PantryDisplay = ({
    pantryData,
}: {
    pantryData: GetPantryByEmailData;
}) => {
    // preparing data
    const { data: allItems, isLoading: allItemsLoading } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });
    let groups: { [key: string]: string } = {};
    let populatedPantryData: (GetPantryByEmailData[0] & { itemData?: Item })[] =
        pantryData;
    if (allItems) {
        populatedPantryData.forEach((e) => {
            e.itemData = allItems.find((i) => i.Name.S === e.item.S);
            if (e.itemData?.Category.S) {
                groups[e.itemData.Category.S] = e.itemData.URL.S;
            }
        });
    }
    const [tab, setTab] = useState<keyof typeof groups>(Object.keys(groups)[0]);
    if (allItemsLoading) {
        return (
            <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <CircularProgress />
            </Box>
        );
    }
    // ----
    const selectedTab = tab || Object.keys(groups)[0];
    return (
        <Box
            width={"100%"}
            display={"flex"}
            marginTop={2}
            height={"100%"}
            gap={1}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab}
                onChange={(_, t) => setTab(t)}
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    height: "100%",
                }}
            >
                {Object.keys(groups).map((g) => (
                    <Tab
                        icon={
                            <img
                                src={groups[g]}
                                width={"35"}
                                height={"35"}
                                alt={g}
                            />
                        }
                        key={g}
                        label={g}
                        value={g}
                        sx={{
                            fontSize: "10px",
                            textDecoration: "none",
                            color: "GrayText",
                            maxWidth: 90,
                        }}
                    />
                ))}
            </Tabs>
            <IonContent style={{ width: "100%", height: "100%", flex: 1 }}>
                <Box
                    width={"100%"}
                    height={"min-content"}
                    display={"grid"}
                    gridTemplateColumns={"1fr 1fr"}
                    gap={1.5}
                    borderRadius={2}
                >
                    {populatedPantryData
                        .filter((e) => e.itemData?.Category.S === selectedTab)
                        .map((i, k) => (
                            <ItemCard item={i} key={k} />
                        ))}
                </Box>
            </IonContent>
        </Box>
    );
};

export default PantryDisplay;
