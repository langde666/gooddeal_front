export const addStore = (store) => {
    return {
        type: 'ADD_STORE',
        payload: store,
    };
};

export const updateIsFollowing = (isFollowing) => {
    return {
        type: 'UPDATE_IS_FOLLOWING',
        payload: isFollowing,
    };
};

export const updateLevel = (level) => {
    return {
        type: 'UPDATE_LEVEL',
        payload: level,
    };
};