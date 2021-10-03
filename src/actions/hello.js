export const addNewHello = (hello) => {
    return {
        type: 'ADD_HELLO',
        payload: hello,
    };
};

export const setActiveHello = (hello) => {
    return {
        type: 'SET_ACTIVE_HELLO',
        payload: hello,
    };
};
