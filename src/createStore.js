import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import getRootReducer from './Service/reducer';
import {init} from './Service/auth/actions';


const middlewares = [
    thunk,
];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({collapsed: true});
    middlewares.push(logger);
}

const enhancers = [
    applyMiddleware(...middlewares),
];

const store = createStore(
    getRootReducer(),
    compose(...enhancers)
);


store.dispatch(init());

export default store;
