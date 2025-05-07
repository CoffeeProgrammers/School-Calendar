import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import DateService from "../../../../services/simple/DateService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {SpaceDashboard} from "@mui/icons-material";
import TaskService from "../../../../services/ext/TaskService";
import TaskCheckbox from "../TaskCheckbox";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TaskView from "./TaskView";


const TaskContainer = () => {
    const {id} = useParams();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTaskById(id);
                setTask(response);
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

    const formattedDate = DateService.formatDateToMDYT(task.deadline)

    const optionList = [
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
            value: `${task.creator.first_name} ${task.creator.last_name}`
        },
        {
            icon: <SpaceDashboard fontSize="small"/>,
            label: "Event:",
            value: "---" //TODO task.event.name
        },
    ]

    return (
        <TaskView
            task={task}
            optionsList={optionList}
        />
    );
};

export default TaskContainer;