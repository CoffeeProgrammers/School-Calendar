import * as React from 'react';
import {useState} from 'react';
import {Box, Grid} from "@mui/material";
import UserBox from "../UserBox";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import ParticipantsActionsMenu from "./ParticipantsActionsMenu";
import EventInviteContainer from "../invite_dialog/EventInviteContainer";

const ParticipantsDialog = ({ users, pagesCount, page, setPage, handleRemove }) => {
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
            <ElementAdditionDialog
                size={"sm"}
                title={"Participants"}
                content={
                    <Grid container spacing={1.5}>
                        {users.map(user => (
                            <Grid item xs={12} sm={6} key={user.id}>
                                <Box onClick={(e) => handleUserClick(e, user)}>
                                    <UserBox user={user} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                }
                page={page}
                setPage={setPage}
                pagesCount={pagesCount}
                actions={<EventInviteContainer/>}
            />

            <ParticipantsActionsMenu
                user={menuUser}
                anchorPosition={menuPosition}
                onClose={handleCloseMenu}
                handleRemove={handleRemove}
            />
        </>
    );
};

export default ParticipantsDialog;
