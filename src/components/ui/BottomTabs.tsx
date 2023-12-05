import {
    BottomNavigation,
    BottomNavigationAction,
    BottomNavigationProps,
} from "@mui/material";
import React from "react";
import { Dns as PantryIcon } from "@mui/icons-material";
import { Kitchen as StorageGuruIcon } from "@mui/icons-material";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";
import { useHistory } from "react-router";
import { CalendarIcon } from "@mui/x-date-pickers";

type BottomTabProps = {
    tab: "pantry" | "storage-guru" | "account" | "calendar";
};

const BottomTabs: React.FC<BottomNavigationProps & BottomTabProps> = ({
    ...props
}) => {
    const history = useHistory();
    return (
        <BottomNavigation
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            showLabels
            value={props?.tab}
            onChange={(_, newValue: BottomTabProps["tab"]) => {
                history.push("/" + newValue);
            }}
        >
            <BottomNavigationAction
                label="Pantry"
                value={"pantry"}
                icon={<PantryIcon />}
            />
            <BottomNavigationAction
                label="Calendar"
                value={"calendar"}
                icon={<CalendarIcon />}
            />
            <BottomNavigationAction
                label="Storage Guru"
                value={"storage-guru"}
                icon={<StorageGuruIcon />}
            />
            <BottomNavigationAction
                label="Account"
                value={"account"}
                icon={<ProfileIcon />}
            />
        </BottomNavigation>
    );
};

export default BottomTabs;
