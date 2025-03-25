import React from 'react';
import {Grid} from "@mui/material";
import UserBox from "./UserBox";

const UserList = ({users}) => {
    return (
        //Todo: deprecated + size
        <Grid container spacing={1.5}>
            {users.map(user => (
                <Grid item  xs={12} sm={6} md={4} lg={2.4} key={user.id}>
                    <UserBox user={user}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default UserList;