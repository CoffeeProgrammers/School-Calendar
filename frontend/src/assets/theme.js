import {createTheme} from "@mui/material/styles";
import "@fontsource/open-sans";

const theme = createTheme({
    palette: {
        primary: {
            main: "#222222",
        },
        secondary: {
            main: "#347928",
        },
        success: {
            main: "#c6e3c3"
        },
        text: {
            secondary: "#222222",
        }
    },
    typography: {
        fontFamily: "Open Sans, Arial, sans-serif",
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
