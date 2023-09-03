import { SearchOutlined } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerProps,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { AddToPantryFormData, Item, UpdateFormData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getAllPantryDetails, GetAllPantryDetailsData } from "../../API";
import { Kitchen as StorageGuruIcon } from "@mui/icons-material";

type SearchDrawerProps = {
    setItem: (item: Item) => void;
    selectedItem: Item;
} & DrawerProps;

const SearchDrawer: React.FC<SearchDrawerProps> = ({ ...props }) => {
    const { data: allItems, isLoading: allItemsLoading } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });
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
                }}
            >
                <Autocomplete
                    disabled={allItemsLoading}
                    options={
                        allItems != undefined
                            ? allItems
                            : ([] as GetAllPantryDetailsData)
                    }
                    value={props.selectedItem}
                    onChange={(e, v) => {
                        props.setItem(v);
                        if (v != null) {
                            props.onClose && props.onClose(e, "backdropClick");
                        }
                    }}
                    groupBy={(option) => option?.Category.S}
                    getOptionLabel={(option) => option.Name.S}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Item Name"
                            placeholder={
                                allItemsLoading ? "Plese wait..." : "Ex. Tomato"
                            }
                        />
                    )}
                />
            </Box>
        </Drawer>
    );
};

type WhatsInPantryProps = {
    formData: AddToPantryFormData;
    updateFormData: UpdateFormData;
};

const WhatsInPantry: React.FC<WhatsInPantryProps> = ({ ...props }) => {
    const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 2,
            }}
        >
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography
                    variant={props.formData.item ? "subtitle1" : "h6"}
                    color={props.formData.item ? "#737373" : "inherit"}
                >
                    {props.formData.item ? "What" : "What's in your Pantry?"}
                </Typography>
                <Typography variant="subtitle1">
                    {props.formData.item?.Name?.S}
                </Typography>
            </Box>
            {/* storage tips */}
            {props.formData.item && (
                <Box
                    sx={{ backgroundColor: "#EBF9FC", marginX: -3, padding: 3 }}
                >
                    <Typography
                        variant="subtitle1"
                        color={"#00A0AC"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                    >
                        <StorageGuruIcon />
                        {"  "} Storage Tip
                    </Typography>
                    <Typography marginY={2} color={"#737373"}>
                        {props.formData.item?.["Storage Tips"]?.S}
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography
                        variant="subtitle2"
                        component={"span"}
                        color={"#737373"}
                    >
                        <Typography component={"span"} color="#00A0AC">
                            {">>"}
                        </Typography>{" "}
                        You can always find this in{" "}
                        <Typography
                            component={"span"}
                            fontWeight="bold"
                            variant="subtitle2"
                        >{`"Storage Guru"`}</Typography>{" "}
                        Tab{" "}
                        <Typography component={"span"} color="#00A0AC">
                            {"<<"}
                        </Typography>
                    </Typography>
                </Box>
            )}
            <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<SearchOutlined />}
                fullWidth
                onClick={() => setSearchDrawerOpen(true)}
            >
                {props.formData.item ? "Change Item" : "Search to Add"}
            </Button>
            <SearchDrawer
                open={searchDrawerOpen}
                onClose={() => setSearchDrawerOpen(false)}
                selectedItem={props.formData.item}
                setItem={(item: Item) =>
                    props?.updateFormData({
                        type: "UPDATE_ITEM",
                        payload: { ...props?.formData, item: item },
                    })
                }
            />
        </Paper>
    );
};

export default WhatsInPantry;
