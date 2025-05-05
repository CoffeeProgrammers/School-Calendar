import React from 'react';
import UserContainer from "../../common/user/UserContainer";

const MyProfile = () => {
    const userId = 1;
    return (
        <UserContainer userId={userId}/>
    );
};

export default MyProfile;