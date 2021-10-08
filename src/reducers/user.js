const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER': {
            const user = action.payload;

            return {
                ...state,
                user: user,
            };
        }

        case 'UPDATE_AVATAR': {
            const avatar = action.payload;
            const newUser = state.user;
            newUser.avatar = avatar;

            return {
                ...state,
                user: newUser,
            }
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
