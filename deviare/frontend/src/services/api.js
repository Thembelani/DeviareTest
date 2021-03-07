import apisauce from 'apisauce';
import qs from 'qs';

import { LOGIN_URL } from '../constants';

const create = (baseURL = 'http://localhost:8000') => {
    const api = apisauce.create({
        baseURL,
        headers: {
        },
        timeout: 60000
    });

    const postLogin = (email, password) => {
        console.log(email, password)
        return api.post(`${LOGIN_URL}`, qs.stringify({email, password}))
    }

    return {
        postLogin,
    }
}

export default { create }