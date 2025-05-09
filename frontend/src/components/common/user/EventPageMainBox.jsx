import React from 'react';
import {Box, Chip, Container, Divider, Stack, Typography} from "@mui/material";
import {SpaceDashboard} from "@mui/icons-material";
import Options from "../../layouts/Options";
import ParticipantsContainer from "./participants_dialog/ParticipantsContainer";
import CommentsContainer from "../comment/event_comments_dialog/CommentsContainer";
import EventTasksContainer from "../task/event_task/event_tasks_dialog/EventTasksContainer";
import {listElementBoxTextStyle} from "../../../assets/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateUtils from "../../../utils/DateUtils";
import TextUtils from "../../../utils/TextUtils";


const EventPageMainBox = ({event}) => {

    const formattedDate =
        DateUtils.formatDateToMDYT(event.startDate)
        + "  ⭢  " +
        DateUtils.formatDateToMDYT(event.endDate)


    const optionList = [
        {
            icon: <FormatListBulletedIcon fontSize="small"/>,
            label: "Type:",
            value:
                (<Chip
                    sx={{ml: -0.75}}
                    label={TextUtils.formatEnumText(event.type)}
                    size="small"
                />)
        },
        {
            icon: <PlaceIcon fontSize="small"/>,
            label: "Place:",
            value: event.place
        },
        {
            icon: <CalendarMonthIcon fontSize="small"/>,
            label: "Date:",
            value: formattedDate
        },
        {
            icon: <AccountCircleIcon fontSize="small"/>,
            label: "Creator:",
            value: TextUtils.getUserFullName(event.creator)
        }
    ]

    return (
        <Box sx={{width: "800px", border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "10px", display: "flex", flexDirection: "column"}}>
            <Container maxWidth="md">
                <Typography variant="h4" sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                    <SpaceDashboard fontSize="large" color="secondary"/>
                    {event.name}
                </Typography>

                <Divider sx={{mt: 1, mb: 1}}/>

                <Options optionsList={optionList}/>

                <Divider sx={{mt: 1, mb: 0.7}}/>

                <Stack direction="row" spacing={0.5}>
                    <ParticipantsContainer/>
                    <CommentsContainer/>
                    <EventTasksContainer/>
                </Stack>

                <Divider sx={{mt: 0.7, mb: 2}}/>

                <Typography variant="h6" sx={listElementBoxTextStyle}>
                    <SubjectIcon color="primary"/>
                    Content:
                </Typography>
                <Container>
                    <Typography variant="body1" color="primary">
                        {event.content}
                    </Typography>
                </Container>
            </Container>
        </Box>
    );
};

export default EventPageMainBox;