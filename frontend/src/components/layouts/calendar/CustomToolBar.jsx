import React from 'react';
import {Box, Button, ButtonGroup, Typography} from '@mui/material';
import dayjs from 'dayjs';
import DateIconPicker from "./DateIconPicker";

const CustomToolbar = (
    {
        goToBack,
        goToNext,
        goToToday,
        handleViewChange,
        date,
        onDateChange,
    }) => {
    const pickerValue = date ? dayjs(date) : null;

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap" gap={2}>
            <ButtonGroup>
                <Button onClick={() => handleViewChange('month-grid')} variant="outlined" sx={{
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    borderWidth: 2,
                    fontWeight: 'bold'
                }}>
                    Month
                </Button>
                <Button onClick={() => handleViewChange('week')} variant="outlined" sx={{
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    borderWidth: 2,
                    fontWeight: 'bold'
                }}>
                    Week
                </Button>
                <Button onClick={() => handleViewChange('day')} variant="outlined" sx={{
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    borderWidth: 2,
                    fontWeight: 'bold'
                }}>
                    Day
                </Button>
            </ButtonGroup>

            <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" fontSize="17px">
                    {date ? (dayjs(date).format('MMMM YYYY')) : '—'}
                </Typography>
                <DateIconPicker value={pickerValue} onChange={onDateChange}/>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <ButtonGroup>
                    <Button onClick={goToBack} sx={{
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        borderWidth: 2,
                        fontWeight: 'bold'
                    }}>{'<'}</Button>
                    <Button onClick={goToToday} sx={{
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        borderWidth: 2,
                        fontWeight: 'bold'
                    }}>Today</Button>
                    <Button onClick={goToNext} sx={{
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        borderWidth: 2,
                        fontWeight: 'bold'
                    }}>{'>'}</Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default CustomToolbar;
