import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

const TaskCheckbox = ({ task, handleToggleTask, sx = {} }) => {
    const [checked, setChecked] = useState(task.done ?? false);

    useEffect(() => {
        setChecked(task.done ?? false);
    }, [task.done]);

    const handleChange = (e) => {
        e.stopPropagation();
        handleToggleTask(task.id);
        setChecked(prev => !prev);
    };

    return (
        <Checkbox
            color="secondary"
            checked={checked}
            onChange={handleChange}
            onClick={e => e.stopPropagation()}
            sx={sx}
        />
    );
};

export default TaskCheckbox;
