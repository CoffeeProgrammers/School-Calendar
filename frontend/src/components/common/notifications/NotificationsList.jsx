import React, {useEffect, useState} from 'react';
import {Stack} from '@mui/material';
import NotificationBox from "./NotificationBox";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationService from "../../../services/base/ext/NotificationService";

const NotificationsList = () => {

    const [notifications, setNotifications] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NotificationService.getMyNotifications(
                    {
                        page: page
                    }
                ); console.log(response.data)
                setNotifications(response.data);
                setPagesCount(response.pages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);


    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Stack spacing={1} mt={-1}>
                {notifications.map(notification => (
                    <NotificationBox notification={notification} />
                ))}
            </Stack>
            {pagesCount > 1 && (
                <Box sx={{ marginTop: "auto" }}>
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

export default NotificationsList