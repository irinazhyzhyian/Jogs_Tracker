import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import history from "../../history";
import moment from 'moment';

export function getJogs() {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.GET_JOGS_REQUEST});
                HttpService.get('/data/sync', {}, ({response}) => {
                    dispatch({type: actionTypes.GET_JOGS_SUCCESS, jogs: response.jogs});
                    return resolve(response);
                }, (error) => {
                    dispatch({type: actionTypes.GET_JOGS_FAIL});
                    return reject(error);
                });
            });

        } catch (error) {
            dispatch({type: actionTypes.GET_JOGS_ERROR});
            history.push('/sign-in');
        }
    }
}

export function updateJog(data) {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.UPDATE_JOG_REQUEST});
                HttpService.put('/data/jog', data, ({response}) => {
                    dispatch({type: actionTypes.UPDATE_JOG_SUCCESS, jog: response});
                    return resolve(response);
                }, (error) => {
                    dispatch({type: actionTypes.UPDATE_JOG_FAIL});
                    return reject(error);
                });
            });

        } catch (error) {
            dispatch({type: actionTypes.UPDATE_JOG_ERROR});
            history.push('/sign-in');
        }
    }
}

export function createJog(data) {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.CREATE_JOG_REQUEST});
                HttpService.post('/data/jog', data, ({response}) => {
                    dispatch({type: actionTypes.CREATE_JOG_SUCCESS, jog: response});
                    return resolve(response);
                }, (error) => {
                    dispatch({type: actionTypes.CREATE_JOG_FAIL});
                    return reject(error);
                });
            });

        } catch (error) {
            dispatch({type: actionTypes.CREATE_JOG_ERROR});
            history.push('/sign-in');
        }
    }
}

export function updateFilter(startDate, finishDate) {
    return function (dispatch, getState) {
        const unixStart = moment(startDate).unix();
        const unixFinish = moment(finishDate).unix();
        const jogs = getState().jogs.jogs;
        const fiteredJogs = jogs.filter(item => {
            if (unixStart && unixFinish) {
                return item.date >= unixStart && item.date <= unixFinish;
            }
            if (unixFinish) {
                return item.date <= unixFinish;
            }
            if (unixStart) {
                return item.date >= unixStart;
            }
        });
        dispatch({type: actionTypes.FILTER_JOGS, jogs: fiteredJogs});
    }
}