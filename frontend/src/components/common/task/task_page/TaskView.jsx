import React from 'react';
import {Box, Divider} from '@mui/material';
import TaskCreatorPanel from "../creator_panel/TaskCreatorPanel";
import TaskPageMainBox from "./TaskPageMainBox";
import Cookies from "js-cookie";

const TaskView = (
    {
        task,
        handleToggleTask,
        handleDelete,
        handleUpdate,
    }) => {

    const isCreator = task.creator.id.toString() === Cookies.get('userId');
    console.log(`Is event creator: ` + isCreator)
    return (
        <Box sx={{width: "850px", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            {isCreator &&
                <>
                    <TaskCreatorPanel
                        task={task}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                    <Divider sx={{width: '100%', mb: 0.5}}/>
                </>
            }

            <TaskPageMainBox
                task={task}
                handleToggleTask={handleToggleTask}
            />
        </Box>
    );
};

export default TaskView;