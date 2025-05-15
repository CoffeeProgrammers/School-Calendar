import React from 'react';
import {Divider, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

const EventTaskActionsMenu = ({ anchorPosition, onClose, task, handleRemove }) => {
    const navigate = useNavigate();

    const handleOpenOption = () => {
        navigate(`/tasks/${task.id}`);
        onClose();
    };

    const handleRemoveOption = () => {
        handleRemove()
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

export default EventTaskActionsMenu;
