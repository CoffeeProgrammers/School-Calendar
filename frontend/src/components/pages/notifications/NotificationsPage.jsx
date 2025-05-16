import React from 'react';
import Box from '@mui/material/Box';
import NotificationsContainer from '../../common/notifications/list/NotificationsContainer';
import {Container} from "@mui/material";

const NotificationsPage = () => {

    return (
        <Container maxWidth={"md"}>
            <Box sx={{width: "100%", padding: "10px", border: '1px solid #ddd', borderRadius: "10px"}}>
                <Box sx={{width: '100%'}}>
                    <NotificationsContainer/>
                </Box>
            </Box>
        </Container>
    )
}

export default NotificationsPage