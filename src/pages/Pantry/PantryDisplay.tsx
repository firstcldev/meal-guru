import { useQuery } from "@tanstack/react-query";
import { GetPantryByEmailData, getAllPantryDetails } from "../../API";
import { Item } from "../AddToPantry/types";
import { Badge, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { IonContent } from "@ionic/react";
import ItemCard from "../../components/ItemCard";
import dayjs from "dayjs";

const PantryDisplay = ({
    pantryData,
}: {
    pantryData: GetPantryByEmailData;
}) => {
    // preparing data
    const { data: allItems } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });
    let groups: {
        [key: string]: { image: string; alertCount: number };
    } = {};

    let populatedPantryData: (GetPantryByEmailData[0] & { itemData?: Item })[] =
        pantryData;
    if (allItems) {
        populatedPantryData.forEach((e) => {
            e.itemData = allItems.find((i) => i.Name.S === e.item.S);
            const incrementAlertBy =
                e.expiryDate.S == dayjs().format("YYYY-MM-DD") ? 1 : 0;
            if (e.itemData?.Category.S) {
                groups[e.itemData.Category.S] = {
                    image: e.itemData.URL.S,
                    alertCount:
                        groups?.[e.itemData.Category.S]?.alertCount == undefined
                            ? incrementAlertBy
                            : groups[e.itemData.Category.S].alertCount +
                              incrementAlertBy,
                };
            }
        });
    }
    const [tab, setTab] = useState<keyof typeof groups>(Object.keys(groups)[0]);
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
                            <Badge
                                badgeContent={groups[g].alertCount}
                                color={"error"}
                            >
                                <img
                                    src={groups[g].image}
                                    width={"35"}
                                    height={"35"}
                                    alt={g}
                                />
                            </Badge>
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
            <IonContent
                style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                }}
            >
                {(() => {
                    const itemsForThisTab = populatedPantryData.filter(
                        (e) => e.itemData?.Category.S === selectedTab,
                    );
                    // if (itemsForThisTab.length === 0) {
                    //     setTab(Object.keys(groups)[0] as keyof typeof groups);
                    // }
                    return (
                        <Box
                            width={"100%"}
                            minHeight={"100%"}
                            display={"grid"}
                            gridTemplateColumns={"1fr 1fr"}
                            gap={1.5}
                            borderRadius={2}
                            sx={{ backgroundColor: "#f2f2f2" }}
                        >
                            {populatedPantryData
                                .filter(
                                    (e) =>
                                        e.itemData?.Category.S === selectedTab,
                                )
                                .map((i, k) => (
                                    <ItemCard item={i} key={k} />
                                ))}
                        </Box>
                    );
                })()}
            </IonContent>
        </Box>
    );
};

export default PantryDisplay;
