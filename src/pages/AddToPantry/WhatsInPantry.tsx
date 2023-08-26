import { SearchOutlined } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Drawer,
    DrawerProps,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { AddToPantryFormData, Item, UpdateFormData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getAllPantryDetails } from "../../API";

type SearchDrawerProps = {
    setItem: (item: Item) => void;
} & DrawerProps;

const SearchDrawer: React.FC<SearchDrawerProps> = ({ ...props }) => {
    const { data: allItems, isLoading: allItemsLoading } = useQuery({
        queryKey: ["all-items"],
        queryFn: getAllPantryDetails,
    });
    return (
        <Drawer
            anchor={"bottom"}
            {...props}
            sx={{ borderTopRightRadius: "25px", backdropFilter: "blur(5px)" }}
        >
            <Box
                sx={{
                    paddingX: 2,
                    paddingY: 3,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "500px",
                }}
            >
                <Autocomplete
                    options={
                        allItems || [
                            {
                                Name: "A",
                                Category: "A",
                            },
                        ]
                    }
                    groupBy={(option: any) => option?.Category}
                    getOptionLabel={(option) => option.Name}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Item Name"
                            placeholder="Ex. Tomato"
                        />
                    )}
                />
            </Box>
            {/* render list of items, onClick: call setItem(item) */}
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
                <Typography variant="h6">What's in your Pantry?</Typography>
                {/* mock */}
                {/* <Typography variant="subtitle1">Tomato</Typography> */}
            </Box>
            <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<SearchOutlined />}
                fullWidth
                onClick={() => setSearchDrawerOpen(true)}
            >
                Search to add
            </Button>
            <SearchDrawer
                open={searchDrawerOpen}
                onClose={() => setSearchDrawerOpen(false)}
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
