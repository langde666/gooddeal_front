import { combineReducers } from 'redux';
import userReducer from './user';
import userVisitReducer from './userVisit';
import storeReducer from './store';
import storeVisitReducer from './storeVisit';

const rootReducer = combineReducers({
    user: userReducer,
    userVisit: userVisitReducer,
    store: storeReducer,
    storeVisit: storeVisitReducer,
});

export default rootReducer;
