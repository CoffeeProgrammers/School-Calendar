import React, {createContext, useCallback, useContext, useState} from 'react';
import SnackbarAlert from "../components/layouts/SnackbarAlert";

export const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const showError = useCallback((errorObj) => {
        if(errorObj){
            if(errorObj.response){
                if(errorObj.response.data){
                    if(errorObj?.response?.data?.messages){
                        setError(errorObj?.response?.data?.messages.join(". "))
                        return
                    }
                }
            }else {
                if(errorObj.message){
                    setError(errorObj.message)
                    return;
                }
            }
        }
        setError("Unknown error")
    }, []);

    const clearError = () => setError(null);

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {error && (
                <SnackbarAlert message={error} onClose={clearError} />
            )}
        </ErrorContext.Provider>
    );
};
