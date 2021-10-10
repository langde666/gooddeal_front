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

export const updateCover = (cover) => {
    return {
        type: 'UPDATE_COVER',
        payload: cover,
    };
};