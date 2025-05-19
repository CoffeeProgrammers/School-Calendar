import React, {useEffect, useState} from 'react';
import {Divider, Stack} from '@mui/material';
import NotificationListBox from "./NotificationListBox";
import Loading from "../../../layouts/Loading";
import PaginationBox from "../../../layouts/lists/PaginationBox";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationService from "../../../../services/base/ext/NotificationService";
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationsContainer = () => {

    const [notifications, setNotifications] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NotificationService.getMyNotifications(
                    page - 1,
                    10
                );
                setNotifications(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5, mt: 1, ml: 1}}>
                <Box mt={0.5}>
                    <NotificationsIcon fontSize="medium" color="secondary"/>
                </Box>
                <Typography variant="h5">
                    Notifications
                </Typography>
            </Box>

            <Divider sx={{mb: 1, mt: 0.5}}/>

            <Stack spacing={1}>
                {notifications.map(notification => (
                    <NotificationListBox key={notification.id} notification={notification}/>
                ))}
            </Stack>

            {pagesCount > 1 && (
                <Box sx={{marginTop: "auto"}}>
                    <PaginationBox
                        page={page}
                        pagesCount={pagesCount}
                        setPage={setPage}
                    />
                </Box>
            )}
        </>
    )
}

export default NotificationsContainer