import { combineReducers } from 'redux';
import { homeReducer } from './components/Home/reducer.js';

const rootReducer = combineReducers({
    homeReducer
});

export default rootReducer;