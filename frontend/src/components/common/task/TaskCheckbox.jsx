import * as React from 'react';
import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TaskService from "../../../services/ext/TaskService";

const TaskCheckbox = ({task, sx = {}}) => {
    const [checked, setChecked] = useState(task.isDone)

    const handleChange = async () => {
        await handleToggleTask(task);
        setChecked(!checked);
    };

    const handleToggleTask = async (task) => {
        await TaskService.toggleTask({
            taskId: task.id,
            isDone: task.isDone
        });
    }
    return (
        <Checkbox
            color="secondary"
            checked={checked}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
            sx={sx}
        />
    );
}

export default TaskCheckbox;