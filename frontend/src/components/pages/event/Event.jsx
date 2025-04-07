import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import EventService from "../../../services/ext/EventService";
import Loading from "../../layouts/Loading";
import {Box, Chip, Container, Divider, Typography} from "@mui/material";
import {listElementBoxTextStyle} from "../../../assets/styles";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaceIcon from "@mui/icons-material/Place";
import {SpaceDashboard} from "@mui/icons-material";
import SubjectIcon from '@mui/icons-material/Subject';
import ParticipantsContainer from "../../common/user/participants_dialog/ParticipantsContainer";
import CommentsContainer from "../../common/comment/comments_dialog/CommentsContainer";
import DateService from "../../../services/simple/DateService";

const Event = () => {
    const {id} = useParams();

    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getEventById(id);
                setEvent(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }


    const formattedDate =
        DateService.formatDateToMDYT(event.start_date)
        + "  ⭢  " +
        DateService.formatDateToMDYT(event.end_date)


    return (
        <Box
            fullWidth
            sx={{
                maxWidth: '1000px',
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Container maxWidth="md">

                <Typography variant="h4" sx={listElementBoxTextStyle}>
                    <SpaceDashboard fontSize="large" color="secondary"/>
                    {event.name}
                </Typography>

                <Divider sx={{mt: 1, mb: 1}}/>

                <table>
                    <tbody>
                    {[
                        {
                            icon: <FormatListBulletedIcon fontSize="small"/>,
                            label: "Type:",
                            value: <Chip sx={{ml: -0.75}} label={event.type} size="small"/>
                        },
                        {icon: <PlaceIcon fontSize="small"/>, label: "Place:", value: event.place},
                        {icon: <CalendarMonthIcon fontSize="small"/>, label: "Date:", value: formattedDate},
                        {
                            icon: <AccountCircleIcon fontSize="small"/>,
                            label: "Creator:",
                            value: `${event.creator.first_name} ${event.creator.last_name}`
                        }
                    ].map(({icon, label, value}, index) => (
                        <tr key={index}>
                            <td style={{paddingRight: "20px"}}>
                                <Typography noWrap variant="body1" color="primary" sx={listElementBoxTextStyle}>
                                    {icon}
                                    {label}
                                </Typography>
                            </td>
                            <td>
                                <Typography>{value}</Typography>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Divider sx={{mt: 1, mb: 0.7}}/>

                <ParticipantsContainer/>

                <CommentsContainer/>

                <Divider sx={{mt: 0.7, mb: 2}}/>

                <Typography variant="h6" sx={listElementBoxTextStyle}>
                    <SubjectIcon color="primary"/>
                    Content:
                </Typography>
                <Container>
                    <Typography variant="body1" color="primary">{event.content}</Typography>
                </Container>
            </Container>
        </Box>
    );
};

export default Event;