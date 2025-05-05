import * as React from 'react';
import {useState} from 'react';
import {Box, Grid2} from "@mui/material";
import UserBox from "../UserBox";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import ParticipantsActionsMenu from "./ParticipantsActionsMenu";


const ParticipantsDialog = ({users, pagesCount, page, setPage}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <>
            <ElementAdditionDialog
                size={"sm"}
                title={"Participants"}
                content={
                    <Grid2 container spacing={1.5}>
                        {users.map(user => (
                            <Grid2 size={{xs: 12, sm: 6}} key={user.id}>
                                <Box>
                                    <Box onClick={(event) => setAnchorEl(event.currentTarget)}>
                                        <UserBox user={user}/>
                                        <ParticipantsActionsMenu
                                            user={user}
                                            anchorEl={anchorEl}
                                            setAnchorEl={setAnchorEl}
                                        />
                                    </Box>
                                </Box>

                            </Grid2>
                        ))}
                    </Grid2>
                }
                page={page}
                setPage={setPage}
                pagesCount={pagesCount}
            />

        </>

    );
}

export default ParticipantsDialog;