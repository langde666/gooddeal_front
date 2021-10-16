const initialState = {
    store: {},
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STORE': {
            const store = action.payload;

            return {
                ...state,
                store: store,
            };
        }

        default: {
            return state;
        }
    }
};

export default storeReducer;
