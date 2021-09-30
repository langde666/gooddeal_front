const initalState = {
    list: [],
    actionId: null,
}

const helloReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD_HELLO': {
            const newList = [...state.list];
            const hello = action.payload;
            const newActiveId = hello.id;
            newList.push(hello);

            return {
                ...state,
                list: newList,
                activeId: newActiveId,
            }
        }

        case 'SET_ACTIVE_HELLO': {
            const hello = action.payload;
            const newActiveId = hello.id;

            return {
                ...state,
                activeId: newActiveId,
            }
        }

        default: {
            return state;
        }
    }
}

export default helloReducer;