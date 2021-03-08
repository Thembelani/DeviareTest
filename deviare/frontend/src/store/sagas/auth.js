import { call, put, race, select, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';


import API from '../../services/api';
import Redux from '../redux/exports';

export const api = API.create();

export function * loginSaga(action) {
    try {
        const {username, password} = action;

        yield delay(4000);
        const response = yield call(api.postLogin, username, password);
        if (response.ok) {
            const { user, token, refresh_token } = response.data;
            yield put(Redux.AuthActions.loginSuccess(token, refresh_token, user));
            yield put(push('/home'));
        } else {
            yield put(Redux.AuthActions.loginFailure(response.data, 'Login Failed'));
            /** 
             * Check for expired token, attempt refresh
             * 
             */
            yield call(manageLoginAttemptsSaga);
        }
    } catch (e) {
        /**
         * Global error logging
         */
    }

}

export function * logoutSaga () {
    try {
        /**
         * Does some Fancy Cleanup
         */
        yield delay(4000);
        yield put(Redux.AuthActions.logoutSuccess());
        yield put(push('/login'));
    } catch (e) {
        /**
         * Global error logging
         */
    }
    
}

function * manageLoginAttemptsSaga () {
    try {
        const attempts = yield select(Redux.AuthSelectors.selectAttempts());
        const isLocked = yield select(Redux.AuthSelectors.selectLocked());
        if (attempts >= 3 && !isLocked) {
            yield put(Redux.AuthActions.isLocked(true));
            yield delay(10000);
            yield put(Redux.AuthActions.isLocked(false));
            yield put(Redux.AuthActions.resetAttempts())
        }
    } catch (e) {
        /**
         * Global error logging
         */
    }
}
