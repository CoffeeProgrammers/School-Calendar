import React from 'react';
import NotificationsIcon from "@mui/icons-material/Notifications";
import {IconButton} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const NotificationButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname === '/notifications';
    return (
        <IconButton color={isActive ? "secondary" : "primary"}
                    onClick={() => navigate('/notifications')}>
            <NotificationsIcon />
        </IconButton>
    );
};

export default NotificationButton;