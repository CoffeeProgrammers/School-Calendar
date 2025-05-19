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
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#125598',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                        textDecoration: 'none',
                        color: '#1976d2',
                    },
                    '&:active': {
                        color: '#0d3c61',
                    }
                },
            },
            defaultProps: {
                underline: 'hover',
            },
        },
    },

});

export default theme;
