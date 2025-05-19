import React, {createContext, useCallback, useContext, useState} from 'react';
import SnackbarAlert from "../components/layouts/SnackbarAlert";

export const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const showError = useCallback((errorObj) => {
        const messages = errorObj?.response?.data?.messages || errorObj?.messages.join("\n") || "Unknown error";
        setError(messages);
    }, []);

    const clearError = () => setError(null);

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {error && (
                <SnackbarAlert  message={error} onClose={clearError} />
            )}
        </ErrorContext.Provider>
    );
};
