import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { GetPantryByEmailData } from "../../API";
import { Item } from "../AddToPantry/types";
import { Close } from "@mui/icons-material";

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
                }}
            >
                <IconButton sx={{ alignSelf: "end" }} onClick={onClose}>
                    <Close />
                </IconButton>
                <Typography variant="h5" fontWeight={600}>
                    {item.itemData?.Name.S}
                </Typography>
            </Box>
        </Drawer>
    );
};

export default UpdateItemDrawer;
