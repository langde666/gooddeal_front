import { combineReducers } from 'redux';
import userReducer from './user';
import storeReducer from './store';

const rootReducer = combineReducers({
    user: userReducer,
    store: storeReducer,
});

export default rootReducer;
