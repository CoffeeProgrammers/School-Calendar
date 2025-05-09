import React from 'react';
import {Box, Grid} from "@mui/material";
import UserBox from "./UserBox";
import {useNavigate} from "react-router-dom";

const UserList = ({users}) => {
    const navigate = useNavigate();

    return (
        //TODO: list optimize
        <Grid container spacing={1.5}>
            {users.map(user => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4}}  key={user.id}>
                    <Box onClick={() => navigate(`${user.id}`)}>
                        <UserBox user={user}/>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default UserList;