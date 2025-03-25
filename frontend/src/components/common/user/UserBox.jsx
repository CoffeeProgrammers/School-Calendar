import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const mainBoxStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    borderRadius: "10px"
}

const textBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5
}

const UserBox = ({user}) => {
    return (
        <Box sx={mainBoxStyle}>
            <Typography noWrap variant="subtitle1" sx={textBoxStyle}>
                <AccountBoxIcon fontSize="small" color="secondary"/>
                {user.first_name + " " + user.last_name}
            </Typography>

            <Divider sx={{marginBottom: "5px"}}/>

            <Chip sx={{ml: -0.5, mb: 0.25}} label={user.role} size="small"/>

            <Typography noWrap variant="body2" sx={textBoxStyle}>
                <AlternateEmailIcon fontSize="small" color="primary"/>
                {user.email}
            </Typography>

        </Box>
    );
};

export default UserBox;