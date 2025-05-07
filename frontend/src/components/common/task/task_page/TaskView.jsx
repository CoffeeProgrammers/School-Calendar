import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubjectIcon from '@mui/icons-material/Subject';
import Options from "../../../layouts/Options";

const TaskView = ({task, optionsList}) => {
    return (
        <Box sx={{
            width: "90%",
            border: '1px solid #ddd',
            padding: '20px',
            margin: '10px',
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column"
        }}>
            <Container maxWidth="md">
                <Typography variant="h6" sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                    <Box mt={0.5}>
                        <AssignmentIcon fontSize="medium" color="secondary"/>
                    </Box>

                    {task.name}
                </Typography>

                <Divider sx={{mt: 0.5, mb: 1}}/>

                <Options optionsList={optionsList}/>

                <Divider sx={{mt: 0.7, mb: 2}}/>

                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <SubjectIcon color="primary"/>
                    Content:
                </Typography>
                <Container>
                    <Typography variant="body1" color="primary">
                        {task.content}
                    </Typography>
                </Container>

            </Container>
        </Box>
    );
};

export default TaskView;