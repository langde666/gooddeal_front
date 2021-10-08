export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user,
    };
};

export const updateAvatar = (avatar) => {
    return {
        type: 'UPDATE_AVATAR',
        payload: avatar,
    };
};