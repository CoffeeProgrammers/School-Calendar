import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import EventTasksDialog from "./EventTasksDialog";
import TaskService from "../../../../../services/base/ext/TaskService";

const EventTasksContainer = ({event}) => {
    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTasksByEvent(
                    event.id,
                    page - 1,
                    9
                );
                console.log("tasks:")
                console.log(response)

                setTasks(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [event, page]);

    const handleToggleTask = async (taskId) => {
        try {
            await TaskService.toggleTaskDone(taskId);
        } catch (error) {
            console.error("Failed to toggle task:", error);
            setError(error);
        }
        
    }

    const handleRemove = async (taskId) => {
        try {
            await TaskService.unassignTaskFromEvent(taskId);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Failed to remove task:", error);
            setError(error);
        }
    };


    const handleAdd = async (taskId) => {
        try {
            const createdTask = await TaskService.assignTaskToEvent(taskId, event.id);
            console.log("createdTask:")
            console.log(createdTask)
            setTasks(prevTasks => [...prevTasks, createdTask]);
        } catch (error) {
            console.error("Failed to add task:", error);
            setError(error);
        }
    };
    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventTasksDialog
            event={event}
            tasks={tasks}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            handleToggleTask={handleToggleTask}
            handleRemove={handleRemove}
            handleAddTask={handleAdd}
        />
    );
}

export default EventTasksContainer;