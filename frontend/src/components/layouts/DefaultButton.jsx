import React from 'react';
import theme from "../../assets/theme";
import {Button} from "@mui/material";

const DefaultButton = ({children, ...props}) => {
    return (
        <Button
            sx={{
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {backgroundColor: theme.palette.secondary.light},
                color: "white",
                fontWeight: 'bold'

            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default DefaultButton;