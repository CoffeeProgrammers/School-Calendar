import * as React from 'react';
import {Box, Grid2} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserBox from "../UserBox";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";


const ParticipantsDialog = ({users, pagesCount, page, setPage}) => {
    const navigate = useNavigate();

    return (

        <ElementAdditionDialog
            size={"sm"}
            title={"Participants"}
            content={
                <Grid2 container spacing={1.5}>
                    {users.map(user => (
                        <Grid2 size={{xs: 12, sm: 6}} key={user.id}>
                            <Box onClick={() => navigate(`${user.id}`)}>
                                <UserBox user={user}/>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
        />
    );
}

export default ParticipantsDialog;