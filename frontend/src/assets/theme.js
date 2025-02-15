import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto"

const theme = createTheme({
    palette: {
        primary: {
            main: "#3d3d3d",
        },

    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                },
            },
        },
    },

});

export default theme;
