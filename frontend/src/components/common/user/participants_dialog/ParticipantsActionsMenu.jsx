import React from 'react';
import {Divider, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ParticipantsActionsMenu = ({ anchorPosition, onClose, user, handleRemove }) => {
    const navigate = useNavigate();

    const handleOpenOption = () => {
        navigate(`/users/${user.id}`);
        onClose();
    };

    const handleRemoveOption = () => {
        handleRemove(user.id)
        onClose();
    };

    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
            open={Boolean(anchorPosition)}
            onClose={onClose}
        >
            <MenuItem onClick={handleOpenOption}>Open</MenuItem>
            <Divider />
            <MenuItem onClick={handleRemoveOption}>Remove</MenuItem>
        </Menu>
    );
};

export default ParticipantsActionsMenu;
