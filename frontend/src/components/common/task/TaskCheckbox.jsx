import * as React from 'react';
import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

const TaskCheckbox = ({task, handleToggleTask, sx = {}}) => {
    const [checked, setChecked] = useState(task.done ?? false)

    const handleChange =  () => {
       handleToggleTask()
        setChecked(!checked)
    };

    return (
        <Checkbox
            color="secondary"
            checked={checked}
            onChange={handleChange}
            sx={sx}
        />
    );
}

export default TaskCheckbox;