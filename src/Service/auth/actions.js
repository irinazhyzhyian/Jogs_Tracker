import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import history from "../../history";

export function init() {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.APP_INIT});
    }
}

export function signIn() {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.REQUEST_SIGN_IN_REQUEST});
                HttpService.postPure('/auth/uuidLogin', {uuid: 'hello'}, ({response}) => {
                    dispatch({type: actionTypes.REQUEST_SIGN_IN_SUCCESS, user: response.user});
                    localStorage.setItem('token', response.access_token);
                    dispatch({type: actionTypes.TOKEN_SUCCESS, token: response.access_token});
                    dispatch({type: actionTypes.APP_INIT});
                    return resolve(response);
                }, (error) => {
                    dispatch({type: actionTypes.REQUEST_SIGN_IN_FAIL});
                    return reject(error);
                });
            });

        } catch (error) {
            dispatch({type: actionTypes.REQUEST_SIGN_IN_ERROR});
            history.push('/sign-in');
        }
    }
}