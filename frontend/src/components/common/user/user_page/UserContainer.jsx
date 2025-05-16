import React, {useEffect, useState} from 'react';
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import UserView from "./UserView";
import UserService from "../../../../services/base/ext/UserService";

const UserContainer = ({userId}) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getUser(userId);
                setUser(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <UserView
            user={user}
        />
    );
};

export default UserContainer;