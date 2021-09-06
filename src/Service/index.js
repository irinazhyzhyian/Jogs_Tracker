import * as AuthActionsTypes from './auth/actionTypes';
import * as JogsActionsTypes from './jogs/actionTypes';

import * as AuthActions from './auth/actions';
import * as JogsActions from './jogs/actions';


export const actions = {
    AuthActions,
    JogsActions,
};

export const ActionTypes = {
    AuthActionsTypes,
    JogsActionsTypes,
};

export default {actions, ActionTypes};
