import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";
import {Typography} from "@mui/material";

const AppBarButton = ({text, link}) => {
    return (
        <Button
            component={Link}
            to={link}
        >
            <Typography variant="body1">{text}</Typography>
        </Button>
    )
}

export default AppBarButton;