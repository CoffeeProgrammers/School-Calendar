import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const TaskCheckbox = ({task, handleToggleTask, sx = {}}) => {

    const handleChange =  () => {
       handleToggleTask()
    };

    return (
        <Checkbox
            color="secondary"
            checked={task.done}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
            sx={sx}
        />
    );
}

export default TaskCheckbox;