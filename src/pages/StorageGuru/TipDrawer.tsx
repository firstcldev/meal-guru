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
                    minHeight: "550px",
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
                <Typography variant="h5" marginTop={2}>
                    {props.item?.Name.S}
                </Typography>
                <Typography marginY={2} color={"#737373"}>
                    {props.item?.["Storage Tips"]?.S}
                </Typography>
            </Box>
        </Drawer>
    );
};

export default TipDrawer;
