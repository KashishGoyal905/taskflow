import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563eb", // blue-600 style
        },
        secondary: {
            main: "#7c3aed", // violet
        },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        h4: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
        },
    },
    shape: {
        borderRadius: 8,
    },
});
