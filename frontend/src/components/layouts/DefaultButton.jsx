import React from 'react';
import theme from "../../assets/theme";
import {Button} from "@mui/material";

const DefaultButton = ({children, ...props}) => {
    return (
        <Button
            variant="contained"
            sx={{
                height: "40px",
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {backgroundColor: theme.palette.secondary.light},
                color: "white",
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default DefaultButton;