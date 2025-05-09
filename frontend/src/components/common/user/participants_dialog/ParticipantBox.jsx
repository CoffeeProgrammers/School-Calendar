import React, {useState} from 'react';
import UserBox from "../UserBox";
import {Box} from "@mui/material";
import ParticipantsActionsMenu from "./ParticipantsActionsMenu";

const ParticipantBox = ({user, handleRemove}) => {
    const [menuPosition, setMenuPosition] = useState(null);
    const [menuUser, setMenuUser] = useState(null);

    const handleUserClick = (event, user) => {
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
            <Box onClick={(e) => handleUserClick(e, user)}>
                <UserBox user={user} />
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