import {Link, useLocation} from "react-router-dom";
import {Button, Typography, useTheme} from "@mui/material";

const AppBarButton = ({ link, text }) => {
    const location = useLocation();
    const theme = useTheme();

    const isActive = location.pathname === link;

    return (
        <Button
            sx={{
                borderBottom: "2.5px solid",
                borderRadius: 0,
                height: "64px",
                padding: 1.5,
                outline: "none",
                borderBottomColor: isActive ? theme.palette.secondary.main : "transparent",
            }}
            component={Link}
            to={link}
        >
            <Typography variant="body1">
                {text}
            </Typography>
        </Button>
    );
};

export default AppBarButton;