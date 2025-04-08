import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {IconButton} from "@mui/material";

const AccountButton = () => {
    return (
        <IconButton>
            <AccountCircleIcon fontSize="large" color="primary"/>
        </IconButton>
    );
};

export default AccountButton;