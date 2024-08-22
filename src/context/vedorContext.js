import React, { createContext, useState, useEffect } from 'react';

const VendorContext = createContext();

const VendorProvider = ({ children }) => {
    const [vendorData, setVendorData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVendorData().then(
            data => {
                setVendorData(data);
                setLoading(false);
            },
            error => {
                setError(error);
                setLoading(false);
            }
        );
    }, []);

    const fetchVendorData = async () => {
        let baseUrl;
        if (process.env.NODE_ENV === 'development') {
            baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
        } else {
            baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
        }
        const response = await fetch(`${baseUrl}/vendors`);
        const data = await response.json();
        return data;
    };

    return (
        <VendorContext.Provider value={{ vendorData, setVendorData, loading, error }}>
            {children}
        </VendorContext.Provider>
    );
};

export { VendorContext, VendorProvider };
