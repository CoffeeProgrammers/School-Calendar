import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import DefaultButton from "../../layouts/DefaultButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import TaskList from "../../common/task/TaskList";
import TaskService from "../../../services/base/ext/TaskService";
import {listPanelStyles} from "../../../assets/styles";

const isDoneSelectOptions = [
    {value: '', label: <em>None</em>},
    {value: true, label: 'Done'},
    {value: false, label: 'To-Do'}
];

const Tasks = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [isDone, setIsDone] = useState('');
    const [deadline, setDeadline] = useState('');


    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getMyTasks(
                    {
                        page: page,
                        size: 15,

                    }
            );
                console.log(response)
                setTasks(response.content);
                setPagesCount(response.totalPages - 1)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, deadline, isDone, page]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{
                width: "1295px",
                //maxWidth: "1295px",
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <Stack direction="row"  sx={listPanelStyles}>
                    <Typography variant="h4">Tasks</Typography>
                    <Box sx={listPanelStyles} gap={0.5}>
                        <Search
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <OpenFiltersButton
                            isOpenFilterMenu={isOpenFilterMenu}
                            setOpenFilterMenu={setOpenFilterMenu}
                        />

                        <DefaultButton>
                            New
                        </DefaultButton>
                    </Box>
                </Stack>


                <Divider sx={{mb: 1}}/>

                {isOpenFilterMenu && (
                    <Box sx={{mb: 1}}>
                        <FiltersGroup
                            //TODO: date
                            filters={[
                                {
                                    label: "Status",
                                    value: isDone,
                                    setValue: setIsDone,
                                    options: isDoneSelectOptions
                                },
                                {
                                    label: "Date",
                                    options: [{value: "", label: <em>____</em>}]
                                }
                            ]}
                        />
                    </Box>
                )}

                <TaskList
                    tasks={tasks}
                />

                {pagesCount > 1 && (
                    <Box sx={{ marginTop: "auto" }}>
                        <PaginationBox
                            page={page}
                            pagesCount={pagesCount}
                            setPage={setPage}
                        />
                    </Box>
                )}


            </Box>
        </>
    );
};

export default Tasks;
