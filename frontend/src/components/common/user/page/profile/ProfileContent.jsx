import React, {useEffect, useState} from 'react';
import Loading from "../../../../layouts/Loading";
import {Typography} from "@mui/material";
import UserView from "../UserView";
import UserService from "../../../../../services/base/ext/UserService";
import EventService from "../../../../../services/base/ext/EventService";
import Cookies from "js-cookie";
import TaskService from "../../../../../services/base/ext/TaskService";
import CommentService from "../../../../../services/base/ext/CommentService";

const ProfileContent = () => {
    const myId = Cookies.get('userId');
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [visitedEventsCount, setVisitedEventsCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState({countCompleted:0, countAll: 0});
    const [writtenCommentsCount, setWrittenCommentsCount] = useState(0);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await UserService.getMyUser();
                const response2 = await EventService.getPastEventCountByUser(myId)
                const response3 = await TaskService.countAllUserTasks(myId)
                const response4 = await CommentService.getUserCommentsCount(myId)

                setUser(response1);
                setVisitedEventsCount(response2.count);
                setCompletedTasksCount(response3);
                 setWrittenCommentsCount(response4.count);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [myId]);

    const handleUpdate = async (updatedUser) => {
        try {
            const response = await UserService.updateMyUser(updatedUser);
            setUser(response);
        } catch (error) {
            setError(error);
        }
    }
    
    const handleUpdatePassword = async (password, newPassword) => {
        try {
            await UserService.updateMyPassword(password, newPassword);
        } catch (error) {
            setError(error);
        }
        
    }
    
    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <UserView
            handleUpdate={handleUpdate}
            user={user}
            handleUpdatePassword={handleUpdatePassword}
            visitedEventsCount={visitedEventsCount}
            completedTasksCount={completedTasksCount}
            writtenCommentsCount={writtenCommentsCount}
        />
    );
};

export default ProfileContent;