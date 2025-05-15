import React from 'react';
import dayjs from "dayjs";
import theme from "../../assets/theme";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";

const DefaultDateTimePicker = ({label, value, setValue}) => {
    return (
        <DateTimePicker
            label={label}
            views={['month', 'day', 'hours', 'minutes']}
            ampm={false}
            defaultValue={value ? dayjs(value) : null}
            onChange={(newValue) => setValue(newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null)}
            slotProps={{
                textField: {
                    sx: {
                        '& .MuiInputAdornment-root .MuiIconButton-root': {
                            color: theme.palette.secondary.main,
                        },
                        '& .MuiInputAdornment-root .MuiIconButton-root:hover': {
                            color: theme.palette.secondary.light,
                        },
                    },
                }
            }}
        />
    );
};

export default DefaultDateTimePicker;