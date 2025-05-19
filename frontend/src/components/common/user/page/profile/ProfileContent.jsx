import React, {useEffect, useState} from 'react';
import Loading from "../../../../layouts/Loading";
import {Typography} from "@mui/material";
import UserView from "../UserView";
import UserService from "../../../../../services/base/ext/UserService";

const ProfileContent = () => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getMyUser();
                setUser(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        />
    );
};

export default ProfileContent;