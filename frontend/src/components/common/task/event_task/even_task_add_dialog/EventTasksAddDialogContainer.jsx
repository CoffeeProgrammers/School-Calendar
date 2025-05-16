import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import EventTasksAddDialog from "./EventTasksAddDialog";
import TaskService from "../../../../../services/base/ext/TaskService";


const EventTasksAddDialogContainer = ({handleAddTask, eventId}) => {
    const [tasks, setTasks] = useState([])

    const [searchName, setSearchName] = useState('');
    const [isDone, setIsDone] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isPast, setIsPast] = useState('');

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)


    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getMyTasksWithoutEvent(
                    page - 1,
                    15,
                    // searchName,
                    // deadline,
                    // isDone,
                    // isPast
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
    }, [searchName, deadline, isDone, page, isPast]);

    const handleAdd = async (taskId) => {
        handleAddTask(eventId, taskId);
        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }
    return (
        <EventTasksAddDialog
            tasks={tasks}
            searchName={searchName}
            setSearchName={setSearchName}
            isDone={isDone}
            setIsDone={setIsDone}
            deadline={deadline}
            setDeadline={setDeadline}
            isPast={isPast}
            setIsPast={setIsPast}
            isOpenFilterMenu={isOpenFilterMenu}
            setOpenFilterMenu={setOpenFilterMenu}
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            handleAdd={handleAdd}
        />
    );
};

export default EventTasksAddDialogContainer;