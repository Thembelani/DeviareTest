import {createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import moment from  'moment';
/** Types and Actions Creators */

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    loginSuccess: ['token', 'refresh_token', 'user'],
    loginFailure: ['error' , 'message'],
    logoutRequest: null,
    logoutSuccess: null,
    logoutFailure: null,
    reset: null,
    isLocked: ['locked'],
    resetAttempts: ['value']
});

export const AuthTypes = Types;
export default Creators;


/** Initial State */

const INITIAL_STATE = Immutable({
    user: null,
    token: null,
    refresh_token: null,
    error: null,
    message: '',
    is_loading: false,
    attempts: 0,
    locked: false
})

/** Reducers */ 

export const loginRequestReducer = (state) => ({
    ...state,
    is_loading: true,
    error: null
});

export const loginSuccessReducer = (state, {token, refresh_token, user}) => ({
    ...state,
    is_loading: false,
    error: null,
    message: '',
    token,
    refresh_token,
    user,
    attempts: 0,
    locked: false
});

export const loginFailureReducer = (state, {error, message}) => ({
    ...state,
    is_loading: false,
    error,
    message,
    token: null,
    refresh_token: null,
    user: null,
    attempts: state.attempts + 1,

});

export const logoutRequestReducer = (state) => ({
    ...state,
    is_loading: true,
});

export const logoutSuccessReducer = (state) => ({
    ...INITIAL_STATE
})

export const logoutFailureReducer = (state, {error} ) => ({
    ...INITIAL_STATE,
    error 
})

export const resetReducer = (state) => ({
    ...INITIAL_STATE
}) 

export const isLockedReducer = (state, {locked}) => ({
    ...state,
    locked
})

export const resetAttemptsReducer = (state) => ({
    ...state,
    attempts: 0
})

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequestReducer,
    [Types.LOGIN_SUCCESS]: loginSuccessReducer,
    [Types.LOGIN_FAILURE]: loginFailureReducer,
    [Types.LOGOUT_REQUEST]: logoutRequestReducer,
    [Types.LOGOUT_SUCCESS]: logoutSuccessReducer,
    [Types.LOGOUT_FAILURE]: logoutFailureReducer,
    [Types.RESET]: resetReducer,
    [Types.IS_LOCKED]: isLockedReducer,
    [Types.RESET_ATTEMPTS]: resetAttemptsReducer,
})

const selectAuth = (state) => state.auth;
const selectToken = () => createSelector(selectAuth, (authState) => authState.token);
const selectUser = () => createSelector(selectAuth, (authState) => authState.user);
const selectAttempts = () => createSelector(selectAuth, (authState) => authState.attempts);
const selectLocked = () => createSelector(selectAuth, (authState) => authState.locked);

export const AuthSelectors = {
    selectToken,
    selectUser,
    selectAttempts,
    selectLocked,
}
