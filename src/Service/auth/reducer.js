import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    processing: false,
    user: null,
    token: ''
});

export default function (state = initialState, {type, ...action}) {

    switch (type) {

        case actionTypes.TOKEN_SUCCESS:
            return state.merge({
                token: action.token,
            });

        // SIGN_IN
        case actionTypes.REQUEST_SIGN_IN_REQUEST:
            return state.merge({
                processing: true,
            });
        case actionTypes.REQUEST_SIGN_IN_SUCCESS:
            return state.merge({
                processing: false,
                user: action.user,
            });
        case actionTypes.REQUEST_SIGN_IN_FAIL:
            return state.merge({
                processing: false,
            });
        case actionTypes.REQUEST_SIGN_IN_ERROR:
            return state.merge({
                processing: false,
            });
        // END SIGN_IN

        case actionTypes.LOGOUT:
            return state.merge(initialState);
        default:
            return state;
    }
}