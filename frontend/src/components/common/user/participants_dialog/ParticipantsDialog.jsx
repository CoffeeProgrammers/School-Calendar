import * as React from 'react';
import {Grid2} from "@mui/material";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import EventInviteContainer from "../invite_dialog/EventInviteContainer";
import ParticipantBox from "./ParticipantBox";

const ParticipantsDialog = ({ users, pagesCount, page, setPage, handleRemove }) => {
    return (
        <>
            <ElementAdditionDialog
                size={"sm"}
                title={"Participants"}
                content={
                    //TODO: list optimize
                    <Grid2 container spacing={1.5}>
                        {users.map(user => (
                            <Grid2 size={{ xs: 12, sm: 6}} key={user.id}>
                                <ParticipantBox user={user} handleRemove={handleRemove}/>
                            </Grid2>
                        ))}
                    </Grid2>
                }
                page={page}
                setPage={setPage}
                pagesCount={pagesCount}
                actions={<EventInviteContainer/>}
            />
        </>
    );
};

export default ParticipantsDialog;
