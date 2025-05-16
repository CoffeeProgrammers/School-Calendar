import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import {useLocation, useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";

const InvitationsButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname === '/invitations';
    return (
        <IconButton color={isActive ? "secondary" : "primary"}
                    onClick={() => navigate('/invitations')}>
            <MailIcon/>
        </IconButton>
    );
};

export default InvitationsButton;