import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import TaskView from "./TaskView";
import TaskService from "../../../../services/base/ext/TaskService";


const TaskContainer = () => {
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
            console.error("Error deleting task:", error);
        }
    }

    const handleUpdate = async (data) => {
        try {
            console.log(
                task
            )
            const updatedTask = await TaskService.updateTask(task.id, data);
            console.log(
                task
            )
            console.log("task is updated");
            setTask(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }
    const handleToggleTask = async () => {
        try {
            await TaskService.toggleTaskDone(task.id);
            console.log("toggle task");
            const updatedTask = {...task, done: !task.done};
            setTask(updatedTask);
        } catch (error) {
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