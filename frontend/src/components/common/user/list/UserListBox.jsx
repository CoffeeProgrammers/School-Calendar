import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import {listElementBoxStyle, listElementBoxTextStyle} from "../../../../assets/styles";
import TextUtils from "../../../../utils/TextUtils";


const UserListBox = ({user}) => {
    return (
        <Box sx={listElementBoxStyle}>
            <Typography noWrap variant="subtitle1" sx={listElementBoxTextStyle}>
                <AccountBoxIcon fontSize="medium" color="secondary"/>
                {TextUtils.getUserFullName(user)}
            </Typography>

            <Divider sx={{marginBottom: "5px"}}/>

            <Typography noWrap variant="body2" mb={0.5} sx={listElementBoxTextStyle}>
                <EmailIcon sx={{fontSize: "18px"}} color="primary"/>
                {user.email}
            </Typography>

            <Chip sx={{ml: -0.5}} label={TextUtils.formatEnumText(user.role)} size="small"/>


        </Box>
    );
};

export default UserListBox;