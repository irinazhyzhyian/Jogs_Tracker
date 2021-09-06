import {combineReducers} from 'redux';

// import reducers
import AuthReducer from './auth/reducer';
import JogsReducer from './jogs/reducer';


const getRootReducer = (asyncReducers) => {
    const reducers = {
        ...asyncReducers,
        auth: AuthReducer,
        jogs: JogsReducer,
    };

    return combineReducers(reducers)
};
export default getRootReducer;
