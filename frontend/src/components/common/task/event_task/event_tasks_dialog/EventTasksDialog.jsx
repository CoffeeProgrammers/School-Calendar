import * as React from 'react';
import {List, Stack} from "@mui/material";
import ElementAdditionDialog from "../../../../layouts/dialog/ElementAdditionDialog";
import EventTaskBox from "../EventTaskBox";
import EventTasksDialogContainer from "../even_task_add_dialog/EventTasksDialogContainer";

const EventTasksDialog = ({tasks, pagesCount, page, setPage, handleToggleTask, handleRemove, handleAddTask}) => {
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
                                handleToggleTask={() => handleToggleTask(task)}
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
            actions={<EventTasksDialogContainer handleAddTask={handleAddTask}/>}
        />
    );
}

export default EventTasksDialog;