import { Item } from "../pages/AddToPantry/types";
import { GetPantryByEmailData } from "../API";
import { Box, Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import UpdateItemDrawer from "./UpdatingPantry/UpdateItemDrawer";
import { useState } from "react";
import { formatQuantity } from "../utils/formatQuantity";

const ItemCard = ({
    item,
    variant = "standard",
}: {
    item: GetPantryByEmailData[0] & { itemData?: Item };
    variant?: "standard" | "thumbnail";
}) => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const expiresInDays = -dayjs().diff(dayjs(item.expiryDate.S), "days");
    return (
        <>
            <Card
                onClick={() => setUpdateOpen((p) => !p)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    height: "min-content",
                    borderTop:
                        variant == "standard"
                            ? expiresInDays < 0
                                ? "4px solid gray"
                                : expiresInDays == 0
                                ? "4px solid red"
                                : "none"
                            : "1px solid #CACCC8",
                    boxSizing: "border-box",
                    aspectRatio: variant == "thumbnail" ? "1 / 1" : "auto",
                    minWidth: variant == "thumbnail" ? "90px" : "auto",
                }}
            >
                <img
                    style={{ alignSelf: "center" }}
                    src={item.itemData?.URL.S}
                    width={100}
                    height={100}
                    alt={item.itemData?.Name.S}
                />
                {variant != "thumbnail" && (
                    <>
                        <Typography
                            variant="subtitle1"
                            paddingX={2}
                            marginTop={2}
                            fontWeight={600}
                        >
                            {item.itemData?.Name.S}
                        </Typography>
                        <Typography variant="subtitle2" paddingX={2}>
                            {formatQuantity(item.quantity.S, item.unit.S)}
                        </Typography>
                        <Box
                            borderRadius={1}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{
                                backgroundColor:
                                    expiresInDays < 0
                                        ? "#eee"
                                        : expiresInDays == 0
                                        ? "#D72C0D"
                                        : expiresInDays < 5
                                        ? "#FFF5EA"
                                        : "#ECF8F3",
                            }}
                            margin={1}
                            padding={1}
                        >
                            <Typography
                                variant="caption"
                                color={expiresInDays == 0 ? "#fff" : "#000"}
                            >
                                {expiresInDays < 0 ? (
                                    <>
                                        Expired{" "}
                                        <span style={{ fontWeight: "600" }}>
                                            {Math.abs(expiresInDays)} days
                                        </span>{" "}
                                        ago
                                    </>
                                ) : expiresInDays == 0 ? (
                                    <span style={{ fontWeight: "600" }}>
                                        {dayjs().format("YYYY-MM-DD") ==
                                        item.expiryDate.S
                                            ? "Expires Today!"
                                            : "Expires Tomorrow!"}
                                    </span>
                                ) : (
                                    <>
                                        Expires in{" "}
                                        <span style={{ fontWeight: "600" }}>
                                            {Math.abs(expiresInDays)} days
                                        </span>
                                    </>
                                )}
                            </Typography>
                        </Box>
                    </>
                )}
            </Card>
            <UpdateItemDrawer
                item={item}
                onClose={() => setUpdateOpen(false)}
                open={updateOpen}
            />
        </>
    );
};

export default ItemCard;
