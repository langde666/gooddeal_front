const initialState = {
    user: {},
};

const userVisitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER_VISIT': {
            const user = action.payload;

            return {
                ...state,
                user: user,
            };
        }

        default: {
            return state;
        }
    }
};

export default userVisitReducer;