import * as React from 'react';
import {Stack} from "@mui/material";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import EventTaskBox from "../EventTaskBox";

const EventTasksDialog = ({tasks, pagesCount, page, setPage}) => {

    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Tasks"}
            content={
                <Stack spacing={1}>
                    {tasks.map(task => (
                        <EventTaskBox task={task} key={task.id}/>
                    ))}
                </Stack>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
        />
    );
}

export default EventTasksDialog;