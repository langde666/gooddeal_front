const initialState = {
    user: {},
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ACCOUNT': {
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

export default accountReducer;