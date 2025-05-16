import * as React from 'react';
import {List, Stack} from "@mui/material";
import ElementAdditionDialog from "../../../../layouts/dialog/ElementAdditionDialog";
import EventTaskBox from "../EventTaskBox";
import EventTasksAddDialogContainer from "../even_task_add_dialog/EventTasksAddDialogContainer";

const EventTasksDialog = (
    {
        eventId,
        tasks,
        pagesCount,
        page, setPage,
        handleToggleTask,
        handleRemove,
        handleAddTask
    }) => {
    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Tasks"}
            content={
                <List>
                    <Stack spacing={1}>
                        {tasks.map(task => (
                            <EventTaskBox
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
            actions={<EventTasksAddDialogContainer handleAddTask={handleAddTask} eventId={eventId}/>}
        />
    );
}

export default EventTasksDialog;