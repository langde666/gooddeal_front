const initialState = {
    store: {},
};

const storeVisitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STORE_VISIT': {
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

export default storeVisitReducer;
