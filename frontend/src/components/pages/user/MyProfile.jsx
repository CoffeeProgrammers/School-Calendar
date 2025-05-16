import React from 'react';
import UserContainer from "../../common/user/user_page/UserContainer";
import Cookies from "js-cookie";

const MyProfile = () => {
    //TODO: refactor for getMyUser
    const userId = Cookies.get('userId');
    return (
        <UserContainer userId={userId}/>
    );
};

export default MyProfile;