import { combineReducers } from 'redux';
import helloReducer from './hello';
import userReducer from './user';

const rootReducer = combineReducers({
    hello: helloReducer,
    user: userReducer,
});

export default rootReducer;
