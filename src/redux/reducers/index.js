
import { combineReducers } from 'redux';
import fieldsReducer from "./fields";

const rootReducer = combineReducers({
    fieldsReducer,
});

export default rootReducer;