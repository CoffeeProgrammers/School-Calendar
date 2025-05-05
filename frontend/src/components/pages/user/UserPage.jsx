import React from 'react';
import UserContainer from "../../common/user/UserContainer";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const {id} = useParams();

    return (
        <UserContainer userId={id}/>
    );
};

export default UserPage;