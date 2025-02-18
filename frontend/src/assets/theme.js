import {createTheme} from "@mui/material/styles";
import "@fontsource/open-sans";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3d3d3d",
        },
        secondary: {
            main: "#347928",
            light: "#C0EBA6"
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
