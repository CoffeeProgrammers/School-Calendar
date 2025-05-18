import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import TaskService from "../../../services/base/ext/TaskService";
import Loading from "../../layouts/Loading";
import {listPanelStyles} from "../../../assets/styles";
import PaginationBox from "../../layouts/lists/PaginationBox";
import {useNavigate} from "react-router-dom";
import TaskCheckbox from "./TaskCheckbox";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIcon from '@mui/icons-material/Assignment';

const TasksMainPageContent = () => {
    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTodayTasks(
                    page - 1,
                    10,
                );
                console.log("tasks:")
                console.log(response)

                setTasks(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    const handleToggleTask = async (taskId) => {
        try {
            await TaskService.toggleTaskDone(taskId);
        } catch (error) {
            console.error("Failed to toggle task:", error);
            setError(error);
        }

    }


    return (
        <>
            <Stack direction="row" sx={listPanelStyles}>
                <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                    <Box mt={0.15}>
                        <AssignmentIcon fontSize='medium' color="secondary"/>
                    </Box>
                    <Typography fontWeight='bold' fontSize='17px'>Today's Tasks</Typography>
                </Box>
            </Stack>

            <Divider sx={{mb: 0.3}}/>

            <TasksList tasks={tasks} handleToggleTask={handleToggleTask}/>

            {pagesCount > 1 && (
                <Box sx={{marginTop: "auto"}}>
                    <PaginationBox
                        page={page}
                        pagesCount={pagesCount}
                        siblingCount={0}
                        setPage={setPage}
                        size={"small"}
                    />
                </Box>
            )}
        </>
    );
};

export default TasksMainPageContent;

const TasksList = ({tasks, handleToggleTask}) => {
    const navigate = useNavigate();

    const columns = [
        {
            id: 'checkbox',
            label: <Checkbox/>,
            render: task => <TaskCheckbox
                task={task}
                handleToggleTask={handleToggleTask}
                sx={{borderRadius: '5px', width: '20px', height: '20px'}}
            />
        },
        {
            id: 'name',
            label: "Name",
            render: task => task.name
        },
    ];
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow
                            key={task.id}
                            hover
                            sx={{cursor: 'pointer', height: "36px"}}
                            onClick={() => navigate(`/tasks/${task.id}`)}
                        >
                            {columns.map(col => (
                                <TableCell key={col.id} align={col.align || "left"}
                                           sx={{padding: "8px"}}>
                                    {col.render(task, index)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}