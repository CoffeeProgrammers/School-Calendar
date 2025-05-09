import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import TaskService from "../../../../services/ext/TaskService";
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

    return (
        <TaskView task={task}/>
    );
};

export default TaskContainer;