import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT
} from './types';
import axios from 'axios';

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
                userLoaded: true
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

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password ,"role":"Investor"});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        // console.log(res.data)
        // alert("Cek email anda untuk aktivasi akun")
        return {
            signup : true
        }
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        return {
            signup : false
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
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};