import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#AEE67F",
        },
        secondary: {
            main: "#2E4A13",
        },
    },
    typography: {
        fontFamily: [
            "Figtree",
            "Lato",
            "-apple-system",
            "BlinkMacSystemFont",
            "Roboto",
            '"Helvetica Neue"',
            "sans-serif",
        ].join(","),
    },
});
