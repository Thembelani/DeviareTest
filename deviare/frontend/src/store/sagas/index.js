import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import Redux from '../redux/exports';

import { loginSaga, logoutSaga, manageLoginAttemptsSaga } from './auth';

export default function * root () {
    yield all([
        takeLatest(Redux.AuthTypes.LOGIN_REQUEST, loginSaga),
        takeLatest(Redux.AuthTypes.LOGOUT_REQUEST, logoutSaga),
    ])
}
