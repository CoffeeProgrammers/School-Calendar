import React from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import DateUtils from "../../../../utils/DateUtils";
import CircleIcon from '@mui/icons-material/Circle';

const NotificationListBox = ({ notification }) => {
    return (
        <Card variant='outlined' sx={{ borderRadius: "10px" }}>
            <Box mb={-2}>
                <CardContent >
                    <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5, }}>
                        <Box mt={0.45}>
                            <CircleIcon sx={{fontSize: 10}} color="secondary"/>
                        </Box>
                        <Typography variant='body1'>{notification.content}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Typography variant='body2' color='grey'>{DateUtils.formatDate(notification.time)}</Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default NotificationListBox;