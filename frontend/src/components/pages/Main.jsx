import React, { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';

const Main = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        // <Typography variant="h4">
        //     Main
        // </Typography>
        <div className="tasks-calendar">
            <div className="tasks">
                <Button className='tasks-button'>
                    <Typography variant='p'>
                        Create new
                    </Typography>
                    <AddIcon></AddIcon>
                </Button>
                <Typography variant='h5' fontSize={30}>Tasks</Typography>
                <ul className='tasks-list'>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                    <li className="tasks-item">
                        <Checkbox {...label} />
                        <Typography variant='p'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero.</Typography>
                    </li>
                </ul>
            </div>
            <div className="calendar-block">
                <div className="calendar-header"></div>
                <div className="calendar">
                    <div className="calendar-months">

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Main;