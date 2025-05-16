import React, {useState} from 'react';
import {Box, Button, Divider, Grid, Stack} from "@mui/material";
import {defaultButtonStyles, listPanelStyles} from "../../../../../assets/styles";
import Search from "../../../../layouts/lists/Search";
import OpenFiltersButton from "../../../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../../../layouts/lists/FiltersGroup";
import BasicDataDialog from "../../../../layouts/dialog/BasicDataDialog";
import AddTaskBox from "./AddTaskBox";


const EventTasksAddDialog = (
    {
        tasks,
        page,
        pagesCount,
        setPage,
        searchName,
        setSearchName,
        isDone,
        setIsDone,
        deadline,
        setDeadline,
        isPast,
        setIsPast,
        isOpenFilterMenu,
        setOpenFilterMenu,
        handleAdd,
    }) => {

    const isDoneSelectOptions = [
        {value: '', label: <em>None</em>},
        {value: true, label: 'Done'},
        {value: false, label: 'To-Do'}
    ];

    const isPastSelectOptions = [
        {value: '', label: <em>None</em>},
        {value: true, label: 'Is past'},
        {value: false, label: 'Is future'}
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPage(1);
    };
    return (
        <>
            <Button onClick={handleClickOpen} variant="contained" sx={defaultButtonStyles}>
                Add
            </Button>

            <BasicDataDialog
                open={open}
                handleClose={handleClose}
                title={"Choose the tasks to add"}
                size={"md"}
                content={
                    //TODO: refactor bp
                    <>
                        <Stack direction="row" sx={listPanelStyles}>
                            <Box sx={listPanelStyles} gap={0.5}>
                                <Search
                                    searchQuery={searchName}
                                    setSearchQuery={setSearchName}
                                />
                                <OpenFiltersButton
                                    isOpenFilterMenu={isOpenFilterMenu}
                                    setOpenFilterMenu={setOpenFilterMenu}
                                />
                            </Box>
                        </Stack>


                        <Divider sx={{mb: 1, mt: 0.5}}/>

                        {isOpenFilterMenu && (
                            <Box sx={{mb: 1}}>
                                <FiltersGroup
                                    filters={[
                                        {
                                            label: "Status",
                                            value: isDone,
                                            setValue: setIsDone,
                                            options: isDoneSelectOptions,
                                            type: "select"
                                        },
                                        {
                                            label: "Is past",
                                            value: isPast,
                                            setValue: setIsPast,
                                            options: isPastSelectOptions,
                                            type: "select"
                                        },
                                        {
                                            label: "Deadline <",
                                            value: deadline,
                                            setValue: setDeadline,
                                            type: "date"
                                        }
                                    ]}
                                />
                            </Box>
                        )}

                        <Grid container spacing={1.5}>
                            {tasks.map(task => (
                                <Grid size={{xs: 12, sm: 6, md: 4}} key={task.id}>
                                    <AddTaskBox task={task} handleAdd={() => handleAdd(task.id)}/>
                                </Grid>
                            ))}
                        </Grid>

                    </>

                }
                pagesCount={pagesCount}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default EventTasksAddDialog;