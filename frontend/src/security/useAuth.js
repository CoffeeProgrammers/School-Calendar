// import Cookies from 'js-cookie';

import Cookies from "js-cookie";

export const useAuth = () => {
    const isAuthenticated = () => {
        return Cookies.get('accessToken') !== undefined;
    };

    return { isAuthenticated};
};
