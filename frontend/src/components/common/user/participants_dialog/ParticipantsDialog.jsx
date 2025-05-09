import * as React from 'react';
import {Grid} from "@mui/material";
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
                    <Grid container spacing={1.5}>
                        {users.map(user => (
                            <Grid size={{ xs: 12, sm: 6}} key={user.id}>
                                <ParticipantBox user={user} handleRemove={handleRemove}/>
                            </Grid>
                        ))}
                    </Grid>
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
