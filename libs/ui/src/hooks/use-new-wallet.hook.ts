import { useState, useEffect } from 'react';

// Singleton state
let isNewWalletGlobal = true;
let listeners: Array<(value: boolean) => void> = [];

const setIsNewWalletGlobal = (value: boolean) => {
    isNewWalletGlobal = value;
    listeners.forEach(listener => listener(isNewWalletGlobal));
};

export const useNewWallet = () => {
    const [isNewWallet, setIsNewWallet] = useState(isNewWalletGlobal);

    useEffect(() => {
        // Add listener on mount
        const listener = (value: boolean) => setIsNewWallet(value);
        listeners.push(listener);

        // Remove listener on unmount
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    return {
        isNewWallet,
        setIsNewWallet: setIsNewWalletGlobal,
    };
};