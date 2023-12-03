import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import { GetPantryByEmailData } from "../../../API";
import { Item } from "../../AddToPantry/types";
import { Close } from "@mui/icons-material";
import { QuantityUpdatingBox } from "./QuantityUpdate";
import { ExpiryUpdatingBox } from "./ExpiryUpdate";

const UpdateItemDrawer = ({
    item,
    open,
    onClose,
}: {
    item: GetPantryByEmailData[0] & { itemData?: Item };
    open: boolean;
    onClose: () => void;
}) => {
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
                <Typography variant="h5" fontWeight={600} marginBottom={3}>
                    {item.itemData?.Name.S}
                </Typography>
                <QuantityUpdatingBox item={item} />
                <Divider sx={{ my: 2 }} />
                <ExpiryUpdatingBox item={item} />
            </Box>
        </Drawer>
    );
};

export default UpdateItemDrawer;
