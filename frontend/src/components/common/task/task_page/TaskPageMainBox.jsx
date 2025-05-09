import React from 'react';
import {Box, Container, Divider, Typography} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Options from "../../../layouts/Options";
import SubjectIcon from "@mui/icons-material/Subject";
import DateService from "../../../../services/simple/DateService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskCheckbox from "../TaskCheckbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {SpaceDashboard} from "@mui/icons-material";


const TaskPageMainBox = ({task}) => {

    const formattedDate = DateService.formatDateToMDYT(task.deadline)

    const optionsList = [
        {
            icon: <CheckCircleIcon fontSize="small"/>,
            label: "IsDone:",
            value: <TaskCheckbox
                task={task}
                sx={{borderRadius: '5px', width: '20px', height: '20px'}}
            />
        },
        {
            icon: <CalendarMonthIcon fontSize="small"/>,
            label: "Deadline:",
            value: formattedDate
        },
        {
            icon: <AccountCircleIcon fontSize="small"/>,
            label: "Creator:",
            //TODO: TextUtils
            value: `${task.creator.first_name} ${task.creator.last_name}`
        },
        {
            icon: <SpaceDashboard fontSize="small"/>,
            label: "EventPage:",
            value: "---" //TODO task.event.name
        },
    ]

    return (
        <Box sx={{width: "90%", border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "10px", display: "flex", flexDirection: "column"}}>
            <Container maxWidth="md">
                <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                    <Box mt={0.5}>
                        <AssignmentIcon fontSize="medium" color="secondary"/>
                    </Box>
                    <Typography variant="h6">
                        {task.name}
                    </Typography>
                </Box>


                <Divider sx={{mt: 0.5, mb: 1}}/>

                <Options optionsList={optionsList}/>

                <Divider sx={{mt: 0.7, mb: 2}}/>

                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <SubjectIcon color="primary"/>
                    Content:
                </Typography>
                <Container>
                    <Typography variant="body1" color="primary">
                        {task.content}
                    </Typography>
                </Container>

            </Container>
        </Box>
    );
};

export default TaskPageMainBox;