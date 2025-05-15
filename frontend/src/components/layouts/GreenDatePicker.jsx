import React from 'react';
import {TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

const styles= {
    textField: {
        InputLabelProps: {
            sx: {
                '&.Mui-error': {
                    color: 'green',
                },
            },
        },
        size: 'small',
        sx: {
            width: 150,
            '& input': {
                color: 'green',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: 1.5,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: 1.5,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: 1.5,
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',

            }
        },

    },
    openPickerButton: {
        sx: {
            color: 'secondary.main',
        },
    },
}

const GreenDatePicker = ({label,value, setValue}) => {
    return (
        <DatePicker
            key={label}
            label={label}
            value={value}
            onChange={(newValue) => setValue(newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null)}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: TextField }}
            slotProps={styles}
        />
    );
};

export default GreenDatePicker;