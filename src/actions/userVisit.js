export const addUserVisit = (user) => {
    return {
        type: 'ADD_USER',
        payload: user,
    };
};