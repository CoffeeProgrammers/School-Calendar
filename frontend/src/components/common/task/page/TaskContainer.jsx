import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import TaskView from "./TaskView";
import TaskService from "../../../../services/base/ext/TaskService";
import {useError} from "../../../../contexts/ErrorContext";


const TaskContainer = () => {
    const {showError} = useError()

    const {id} = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTask(id);

                console.log("task")
                console.log(response);

                setTask(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await TaskService.deleteTask(task.id);
            console.log("task is deleted");
            navigate('/tasks');
        } catch (error) {
            showError(error);
            console.error("Error deleting task:", error);
        }
    }

    const handleUpdate = async (data) => {
        try {
            const updatedTask = await TaskService.updateTask(task.id, data);
            setTask(updatedTask);
        } catch (error) {
            showError(error);
        }

    }
    const handleToggleTask = async () => {
        try {
            await TaskService.toggleTaskDone(task.id);
            console.log("toggle task");
        } catch (error) {
            showError(error);
            console.error("Error toggling task:", error);
        }
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <TaskView
            task={task}
            handleToggleTask={handleToggleTask}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
        />
    );
};

export default TaskContainer;