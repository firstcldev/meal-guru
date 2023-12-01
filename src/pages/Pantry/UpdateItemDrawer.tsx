import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Typography,
} from "@mui/material";
import { GetPantryByEmailData } from "../../API";
import { Item } from "../AddToPantry/types";
import { Close, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { QuantityInput } from "../../components/ui/QuantityInput";

const UpdateItemDrawer = ({
    item,
    open,
    onClose,
}: {
    item: GetPantryByEmailData[0] & { itemData?: Item };
    open: boolean;
    onClose: () => void;
}) => {
    const [isQuantityEditorOpen, setIsQuantityEditorOpen] = useState(false);
    const [isExpiryEditorOpen, setIsExpiryEditorOpen] = useState(false);
    const [consumedQuantity, setConsumedQuantity] = useState(0);
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor={"bottom"}
            sx={{ backdropFilter: "blur(5px)" }}
        >
            <Box
                sx={{
                    paddingX: 2,
                    paddingY: 3,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "80vh",
                    backgroundColor: "#F6F7F5",
                }}
            >
                <IconButton sx={{ alignSelf: "end" }} onClick={onClose}>
                    <Close />
                </IconButton>
                <Typography variant="h5" fontWeight={600} marginBottom={2}>
                    {item.itemData?.Name.S}
                </Typography>
                <Accordion
                    expanded={isQuantityEditorOpen}
                    onChange={() =>
                        setIsQuantityEditorOpen(!isQuantityEditorOpen)
                    }
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Update inventory</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                px: 1,
                            }}
                        >
                            <Typography>Currently available </Typography>
                            <Typography
                                variant="subtitle1"
                                padding={1}
                                sx={{
                                    backgroundColor: "#ECF1F8",
                                    borderRadius: 2,
                                }}
                            >
                                {Math.floor(Number(item?.quantity?.S))}{" "}
                                {item.unit.S == "weight"
                                    ? "Kg"
                                    : item.unit.S == "volume"
                                    ? "Ltr"
                                    : "Pcs"}{" "}
                                {item.unit.S !== "quantity" && (
                                    <>
                                        {(Number(item?.quantity?.S) -
                                            Math.floor(
                                                Number(item?.quantity?.S),
                                            )) *
                                            1000}{" "}
                                        {item.unit.S == "weight" ? "gm" : "ml"}
                                    </>
                                )}
                            </Typography>
                        </Box>
                        <Typography px={1} my={2}>
                            Consumed:
                        </Typography>
                        <QuantityInput
                            unit={item.unit.S}
                            onChange={(v) => setConsumedQuantity(v)}
                            value={consumedQuantity}
                        />
                    </AccordionDetails>
                    <AccordionActions sx={{ p: 2 }}>
                        <Button variant="contained">Update</Button>
                    </AccordionActions>
                </Accordion>
            </Box>
        </Drawer>
    );
};

export default UpdateItemDrawer;
