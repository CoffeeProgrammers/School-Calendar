import * as React from 'react';
import {List, Stack} from "@mui/material";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import EventTaskBox from "../EventTaskBox";

const EventTasksDialog = ({tasks, pagesCount, page, setPage, handleToggleTask}) => {

    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Tasks"}
            content={
                <List fullWidth={true}>
                    <Stack spacing={1}>
                        {tasks.map(task => (
                            <EventTaskBox task={task} handleToggleTask={() => handleToggleTask(task)} key={task.id}/>
                        ))}
                    </Stack>
                </List>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
        />
    );
}

export default EventTasksDialog;