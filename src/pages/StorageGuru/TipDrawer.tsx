import {
    Box,
    Button,
    Divider,
    Drawer,
    DrawerProps,
    IconButton,
    Typography,
} from "@mui/material";
import { Item } from "../AddToPantry/types";
import { Close } from "@mui/icons-material";

type TipDrawerProps = {
    item: Item;
} & DrawerProps;

const TipDrawer: React.FC<TipDrawerProps> = ({ ...props }) => {
    return (
        <Drawer
            open={props?.open}
            onClose={props.onClose}
            anchor={"bottom"}
            sx={{ backdropFilter: "blur(5px)" }}
        >
            <Box
                sx={{
                    paddingX: 2,
                    paddingY: 3,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "90vh",
                    alignItems: "start",
                }}
            >
                <IconButton
                    sx={{ alignSelf: "end" }}
                    onClick={(e) =>
                        props.onClose && props.onClose(e, "escapeKeyDown")
                    }
                >
                    <Close />
                </IconButton>
                <Typography variant="h5" mb={2}>
                    {props.item?.Name.S}
                </Typography>
                <img
                    src={props?.item?.URL?.S}
                    alt={props.item?.Name?.S}
                    style={{
                        width: "100%",
                        objectFit: "contain",
                        aspectRatio: "2 / 1",
                        borderRadius: "8px",
                    }}
                />
                <Typography variant="h6" sx={{ color: "#2E4A13" }}>
                    Storage Tips
                </Typography>
                <Typography marginY={2} color={"#737373"}>
                    {props.item?.["Storage Tips"]?.S}
                </Typography>
                <Divider sx={{ borderColor: "#CACCC8" }} />
                <Typography variant="h6" sx={{ color: "#2E4A13" }}>
                    Freshness Tips
                </Typography>
                <Typography marginY={2} color={"#737373"}>
                    {props.item?.["Freshness Tips"]?.S}
                </Typography>
            </Box>
        </Drawer>
    );
};

export default TipDrawer;
