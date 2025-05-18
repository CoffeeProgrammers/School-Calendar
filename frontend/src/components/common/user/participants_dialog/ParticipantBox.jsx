import React, {useState} from 'react';
import UserListBox from "../list/UserListBox";
import {Box} from "@mui/material";
import ParticipantsActionsMenu from "./ParticipantsActionsMenu";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const ParticipantBox = ({event, user, handleRemove}) => {
    const navigate = useNavigate();

    const isEventCreator = event.creator.id.toString() === Cookies.get('userId');

    const [menuPosition, setMenuPosition] = useState(null);
    const [menuUser, setMenuUser] = useState(null);

    const handleUserClick = (event) => {
        event.preventDefault();
        setMenuUser(user);
        setMenuPosition({
            top: event.clientY,
            left: event.clientX
        });
    };

    const handleCloseMenu = () => {
        setMenuUser(null);
        setMenuPosition(null);
    };
    return (
        <>
            <Box onClick={isEventCreator ? handleUserClick : () => navigate(`/users/${user.id}`)}>
                <UserListBox user={user} />
            </Box>

            <ParticipantsActionsMenu
                user={menuUser}
                anchorPosition={menuPosition}
                onClose={handleCloseMenu}
                handleRemove={handleRemove}
            />
        </>
    );
};

export default ParticipantBox;