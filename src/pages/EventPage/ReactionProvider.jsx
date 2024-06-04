import React, { createContext, useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper";

export const ReactionContext = createContext();

export const ReactionProvider = ({ children }) => {
    const [userReactions, setUserReactions] = useState(() => {
        const storedReactions = localStorage.getItem('userReactions');
        return storedReactions ? JSON.parse(storedReactions) : {};
    });

    useEffect(() => {
        const fetchUserReactions = async () => {
            try {
                const response = await request('GET', '/reaction');
                const reactions = response.data;
                setUserReactions(reactions);
                localStorage.setItem('userReactions', JSON.stringify(reactions));
            } catch (error) {
                console.error('Error fetching user reactions:', error);
            }
        };

        fetchUserReactions();
    }, []);

    const handleReaction = async (eventId, reaction) => {
        try {
            await request('POST', '/reaction', { eventId, reaction });
            setUserReactions(prevState => {
                const updatedReactions = { ...prevState, [eventId]: reaction };
                localStorage.setItem('userReactions', JSON.stringify(updatedReactions));
                return updatedReactions;
            });
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    };

    return (
        <ReactionContext.Provider value={{ userReactions, handleReaction }}>
            {children}
        </ReactionContext.Provider>
    );
};
