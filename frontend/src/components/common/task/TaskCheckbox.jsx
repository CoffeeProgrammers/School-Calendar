import * as React from 'react';
import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

const TaskCheckbox = ({taskId}) => {

    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Checkbox
            color={"secondary"}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

export default TaskCheckbox;