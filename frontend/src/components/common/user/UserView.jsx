import React from "react"
import "../../../assets/css/profile.css"
import UserPageMainBox from "./UserPageMainBox";
import {Box} from "@mui/material";

const UserView = ({user}) => {

    return (
        <Box sx={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <UserPageMainBox user={user}/>
        </Box>


)
}

export default UserView