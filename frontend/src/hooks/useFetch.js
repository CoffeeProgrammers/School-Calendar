import {useEffect, useState} from 'react';


//TODO: basic fetch
export const useFetch = (fetchFunction, ...args) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction(...args);
                setData(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [args, fetchFunction]);

    return { data, loading, error };
};
