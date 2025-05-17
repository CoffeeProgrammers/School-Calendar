import React from 'react';
import {Box, Button, ButtonGroup, Typography} from '@mui/material';

const CustomToolbar = (toolbar) => {
    const goToBack = () => toolbar.onNavigate('PREV');
    const goToNext = () => toolbar.onNavigate('NEXT');
    const goToToday = () => toolbar.onNavigate('TODAY');
    const handleViewChange = (view) => toolbar.onView(view);

    const handleDateChange = (date) => {
        if (date?.isValid?.()) {
            toolbar.onNavigate('DATE', date.toDate());
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap" gap={2}>
            <ButtonGroup>
                <Button
                    onClick={() => handleViewChange('month')}
                    variant="outlined"
                    sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}
                >
                    Month
                </Button>
                <Button
                    onClick={() => handleViewChange('week')}
                    variant="outlined"
                    sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}
                >
                    Week
                </Button>
                <Button
                    onClick={() => handleViewChange('day')}
                    variant="outlined"
                    sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}
                >
                    Day
                </Button>
            </ButtonGroup>


            <Typography fontWeight="bold" fontSize='17px'>
                {toolbar.label}
            </Typography>
            {/*<DatePicker*/}
            {/*    // label="Date"*/}
            {/*    // value={dayjs(toolbar.date)}*/}
            {/*    onChange={handleDateChange}*/}
            {/*    slotProps={{*/}
            {/*        textField: { size: 'small', variant: 'outlined' },*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<DatePicker*/}
            {/*    value={dayjs(toolbar.date)}*/}
            {/*    onChange={handleDateChange}*/}
            {/*    renderInput={(params) => (*/}
            {/*        <TextField*/}
            {/*            {...params}*/}
            {/*            sx={{ display: 'none' }}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>


                <ButtonGroup>
                    <Button onClick={goToBack} sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}>{'<'}</Button>
                    <Button onClick={goToToday} sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}>Today</Button>
                    <Button onClick={goToNext} sx={{borderColor: 'secondary.main', color: 'secondary.main', borderWidth: 2, fontWeight: 'bold'}}>{'>'}</Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default CustomToolbar;
