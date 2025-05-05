import React from 'react';
import {Divider, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ParticipantsActionsMenu = ({anchorEl, setAnchorEl, user}) => {
    const navigate = useNavigate()

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenOption = () => {
        navigate(`/users/${user.id}`)
        handleClose()
    };

    const handleRemoveOption = () => {
        handleClose()
    };


    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleOpenOption}>
                    Open
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleRemoveOption}>
                    Remove
                </MenuItem>
            </Menu>
        </>
    );
};

export default ParticipantsActionsMenu;