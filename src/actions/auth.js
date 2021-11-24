import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    LOGOUT
} from './types';
import axios from 'axios';


export const post_profile = async (email, full_name, address, phone_number, ktp_number, birth_date, profile_picture) => {
    var formDataToSend = new FormData();
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    formDataToSend.append('email', email);
    formDataToSend.append('full_name', full_name);
    formDataToSend.append('address', address);
    formDataToSend.append('phone_number', phone_number);
    formDataToSend.append('ktp_number', ktp_number);
    formDataToSend.append('birth_date', birth_date);
    formDataToSend.append('profile_picture', profile_picture);

    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/post`, formDataToSend, config);
        
        return {
            success: true,
        }
    } catch (err) {
        return {
            success: false,
            err
        }
    }
};

export const update_profile = async (email, full_name, address, phone_number, ktp_number, birth_date, profile_picture, imageChanged) => {
    var formDataToSend = new FormData();
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    formDataToSend.append('email', email);
    formDataToSend.append('full_name', full_name);
    formDataToSend.append('address', address);
    formDataToSend.append('phone_number', phone_number);
    formDataToSend.append('ktp_number', ktp_number);
    formDataToSend.append('birth_date', birth_date);
    if (imageChanged) {
        formDataToSend.append('profile_picture', profile_picture);
    }


    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/update/${email}`, formDataToSend, config);
        
        return {
            success: true,
        }
    } catch (err) {
        return {
            success: false,
            err
        }
    }
};

export const load_profile = () => async (email) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/${email}`, config);

            return {
                success: true,
                res
            }
        } catch (err) {
            return {
                success: false,
                err
            }
        }
    } else {
        return {
            success: false,
            err: new Error('missing token')
        }
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            return {
                login: true,
                userLoaded: true,
                res
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
            return {
                login: true,
                userLoaded: false,
                err
            }
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
        return {
            login: false,
            err: new Error('missing token')
        }
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    axios.defaults.withCredentials = true;
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code,
            'role':"Investor"
        };

        const formBody = Object.keys(details).map(key => key + '=' + details[key]).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            const loadRes = await dispatch(load_user());
            return loadRes
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        const loadRes = await dispatch(load_user());
        return loadRes;
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        return {
            login: false,
            userLoaded: false,
            err
        }
    }
};

export const logout = () => ({
    type: LOGOUT
})

export const signup = (first_name, last_name, email, password, re_password, role) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password, role});

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return {
            signup: true
        }
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        return {
            signup: false
        }
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        return {
            isSuccess: true,
        }
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
        return {
            isSuccess: false,
        }
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        return {
            isSuccess: true,
        }
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        return {
            isSuccess: false,
            error: err
        }
    }
};
