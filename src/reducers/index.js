import { combineReducers } from 'redux';
import helloReducer from './hello';

const rootReducer = combineReducers({
    hello: helloReducer,
});

export default rootReducer;
