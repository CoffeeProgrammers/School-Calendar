import * as React from 'react';
import {List, Stack} from "@mui/material";
import ElementAdditionDialog from "../../../../layouts/dialog/ElementAdditionDialog";
import EventTaskBox from "../EventTaskBox";
import EventTasksAddDialogContainer from "../even_task_add_dialog/EventTasksAddDialogContainer";
import Cookies from "js-cookie";

const EventTasksDialog = (
    {
        event,
        tasks,
        pagesCount,
        page, setPage,
        handleToggleTask,
        handleRemove,
        handleAddTask
    }) => {

    const isEventCreator = event.creator.id.toString() === Cookies.get('userId');

    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Tasks"}
            content={
                <List>
                    <Stack spacing={1}>
                        {tasks.map(task => (
                            <EventTaskBox
                                isEventCreator={isEventCreator}
                                task={task}
                                handleToggleTask={() => handleToggleTask(task.id)}
                                handleRemove={() => handleRemove(task.id)}
                                key={task.id}
                            />
                        ))}
                    </Stack>
                </List>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            actions={isEventCreator && <EventTasksAddDialogContainer handleAddTask={handleAddTask}/>}
        />
    );
}

export default EventTasksDialog;