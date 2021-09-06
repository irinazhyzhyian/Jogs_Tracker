import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';


const initialState = Immutable({
    processing: false,
    update_processing: false,
    jogs: [],
    filteredJogs: [],
});

let jogs;
let jog;
export default function (state = initialState, {type, ...action}) {

    switch (type) {

        case actionTypes.GET_JOGS_REQUEST:
            return state.merge({
                processing: true,
            });
        case actionTypes.GET_JOGS_SUCCESS:
            return state.merge({
                processing: false,
                jogs: action.jogs,
                filteredJogs: action.jogs,
            });
        case actionTypes.GET_JOGS_FAIL:
            return state.merge({
                processing: false,
            });
        case actionTypes.GET_JOGS_ERROR:
            return state.merge({
                processing: false,
            });
        case actionTypes.UPDATE_JOG_REQUEST:
            return state.merge({
                update_processing: true,
            });
        case actionTypes.UPDATE_JOG_SUCCESS:
            jogs = state.jogs.asMutable();
            jogs.forEach((jog, index) => {
                if(jog.id === action.jog.id) {
                    jogs[index] = {...jogs[index], ...action.jog};
                }
            })
            return state.merge({
                update_processing: false,
                jogs: jogs,
                filteredJogs: jogs,
            });
        case actionTypes.UPDATE_JOG_FAIL:
            return state.merge({
                update_processing: false,
            });
        case actionTypes.UPDATE_JOG_ERROR:
            return state.merge({
                update_processing: false,
            });
        case actionTypes.CREATE_JOG_REQUEST:
            return state.merge({
                processing: true,
            });
        case actionTypes.CREATE_JOG_SUCCESS:
            jog = {
                ...action.jog,
                date: moment(action.jog.date).unix(),
            }
            jogs = state.jogs.asMutable();
            jogs.push(jog);
            return state.merge({
                processing: false,
                jogs: jogs,
                filteredJogs: jogs,
            });
        case actionTypes.CREATE_JOG_FAIL:
            return state.merge({
                processing: false,
            });
        case actionTypes.CREATE_JOG_ERROR:
            return state.merge({
                processing: false,
            });
        case actionTypes.FILTER_JOGS:
            return state.merge({
                filteredJogs: action.jogs,
            });
        
        default:
            return state;
    }
}