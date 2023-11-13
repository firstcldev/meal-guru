import {
    Box,
    Button,
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
                <Typography variant="h5" marginY={2}>
                    {props.item?.Name.S}
                </Typography>
                <img
                    src={props?.item?.URL?.S}
                    alt={props.item?.Name?.S}
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        aspectRatio: "2 / 1",
                        borderRadius: "8px",
                    }}
                />
                <Typography marginY={2} color={"#737373"}>
                    {props.item?.["Storage Tips"]?.S}
                </Typography>
            </Box>
        </Drawer>
    );
};

export default TipDrawer;
