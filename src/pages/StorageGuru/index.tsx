import React from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import { AppBar, Toolbar, Typography } from "@mui/material";
import BottomTabs from "../../components/ui/BottomTabs";

const StorageGuru = () => {
    return (
        <Screen>
            <Window>
                <AppBar color="inherit">
                    <Toolbar>
                        <Typography variant="h6">Storage Guru</Typography>
                    </Toolbar>
                </AppBar>
                <BottomTabs tab="storage-guru" color="secondary" />
            </Window>
        </Screen>
    );
};

export default StorageGuru;
