import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";
import { Typography } from "@mui/material";
import '../../../assets/css/style.css'

const AppBarButton = ({ text, link }) => {
    return (
        <Button
            sx={{ borderBottom: '2px solid #027a0a', borderRadius: '0' }}
            component={Link}
            to={link}
            className="header-button"
        >
            <Typography variant="body1">{text}</Typography>
        </Button>
    )
}

export default AppBarButton;