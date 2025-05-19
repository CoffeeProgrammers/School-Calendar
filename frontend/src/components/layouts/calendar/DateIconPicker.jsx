import React, {useRef, useState} from 'react';
import {Box, IconButton, Popover} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

export default function DateIconCalendar({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleSelect = (date) => {
        if (date && date.isValid()) {
            onChange(date.format('YYYY-MM-DD'));
        }
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                size="small"
                onClick={() => setOpen(true)}
                sx={{ color: 'secondary.main' }}
            >
                <CalendarMonthIcon />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorRef.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ p: 1 }}>
                        <DateCalendar
                            views={['year', 'month', 'day']}
                            value={value}
                            onChange={handleSelect}
                        />
                </Box>
            </Popover>
        </>
    );
}
