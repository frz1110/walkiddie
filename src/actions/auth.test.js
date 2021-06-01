import configureMockStore from 'redux-mock-store';
import * as types from './types';
import axios from 'axios';
import * as actions from './auth';
import thunk from 'redux-thunk';

jest.mock('axios');

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('login', () => {
  test('should return dispatch LOGIN_SUCCESS and LOAD_USER_SUCCESS on login successful', () => {
    const loginData = {
      data: {
        refresh: 'refresh-token',
        access: 'access-token'
      }
    }

    const user = {
      id: 1,
      email: 'email',
      first_name: 'first_name',
      last_name: 'last_name',
      role: 'role'
    }

    const expectedActions = [
      { type: types.LOGIN_SUCCESS, payload: loginData.data },
      { type: types.USER_LOADED_SUCCESS, payload: user }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve(loginData));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));
    localStorage.setItem('access', 'token')

    const store = mockStore({})

    return store.dispatch(actions.login('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      localStorage.removeItem('access')
    })
  })

  test('dispatch LOGIN_SUCCESS but token wasn\'t saved to localStorage', async () => {
    const loginData = {
      refresh: 'refresh-token',
      access: 'access-token'
    }

    const store = mockStore({})

    const expectedActions = [
      { type: types.LOGIN_SUCCESS, payload: loginData },
      { type: types.USER_LOADED_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: loginData }));

    return store.dispatch(actions.login('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  test('dispatch LOGIN_SUCCESS but API called on load_user fail', async () => {
    const loginData = {
      refresh: 'refresh-token',
      access: 'access-token'
    }

    const store = mockStore({})

    const expectedActions = [
      { type: types.LOGIN_SUCCESS, payload: loginData },
      { type: types.USER_LOADED_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: loginData }));
    localStorage.setItem('access', 'token')
    axios.get.mockImplementationOnce(() => Promise.reject());

    return store.dispatch(actions.login('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      localStorage.removeItem('access');
    })
  })

  test('return dispatch LOGIN_FAIL on post rejected', async () => {

    const expectedActions = [
      { type: types.LOGIN_FAIL },
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})

    return store.dispatch(actions.login('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})

describe('logout', () => {
  it('should clear state token', () => {
    const expectedAction = { type: types.LOGOUT };

    expect(actions.logout()).toEqual(expectedAction);
  })
})

describe('signup', () => {
  it('dispatch SIGNUP_SUCCESS and payload', () => {

    const signupData = {
      data: {
        first_name: "Udma",
        last_name: "Wijaya",
        role: "Investor",
        email: "ajiinisti12@gmail.com",
        id: 1
      }
    }

    const expectedActions = [
      { type: types.SIGNUP_SUCCESS, payload: signupData.data }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve(signupData));

    const store = mockStore({})
    return store.dispatch(actions.signup("Udma", "Wijaya", "ajiinisti12@gmail.com", "MyAwesome123", "MyAwesome123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch SIGNUP_FAIL', () => {

    const expectedActions = [
      { type: types.SIGNUP_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})
    return store.dispatch(actions.signup("Udma", "Wijaya", "ajiinisti12@gmail.com", "MyAwesome123", "MyAwesome123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

  })
})

describe('signup mitra', () => {
  it('dispatch SIGNUP_SUCCESS and payload', () => {

    const signupData = {
      data: {
        first_name: "Udma",
        last_name: "Wijaya",
        role: "Mitra",
        email: "ajiinisti12@gmail.com",
        id: 1
      }
    }

    const expectedActions = [
      { type: types.SIGNUP_SUCCESS, payload: signupData.data }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve(signupData));

    const store = mockStore({})
    return store.dispatch(actions.signupMitra("Udma", "Wijaya", "ajiinisti12@gmail.com", "MyAwesome123", "MyAwesome123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch SIGNUP_FAIL', () => {

    const expectedActions = [
      { type: types.SIGNUP_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})
    return store.dispatch(actions.signupMitra("Udma", "Wijaya", "ajiinisti12@gmail.com", "MyAwesome123", "MyAwesome123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

  })
})

describe('activation', () => {
  it('dispatch ACTIVATION_SUCCESS', () => {
    const expectedActions = [
      { type: types.ACTIVATION_SUCCESS }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve());

    const store = mockStore({})
    return store.dispatch(actions.verify("UID", "TOKEN")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch ACTIVATION_FAIL', () => {

    const expectedActions = [
      { type: types.ACTIVATION_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})
    return store.dispatch(actions.verify("UID", "TOKEN")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

  })
})

describe('google', () => {
  test('dispatch GOOGLE_AUTH_SUCCESS but token wasn\'t saved to localStorage', async () => {
    localStorage.removeItem('access', 'token');
    const loginData = {
      refresh: 'refresh-token',
      access: 'access-token'
    }

    const store = mockStore({})

    const expectedActions = [
      { type: types.GOOGLE_AUTH_SUCCESS, payload: loginData },
      { type: types.USER_LOADED_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: loginData }));

    return store.dispatch(actions.googleAuthenticate('state', 'code')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  test('dispatch GOOGLE_AUTH_SUCCESS but API called on load_user fail', async () => {
    localStorage.removeItem('access', 'token');
    const loginData = {
      refresh: 'refresh-token',
      access: 'access-token'
    }

    const store = mockStore({})

    const expectedActions = [
      { type: types.GOOGLE_AUTH_SUCCESS, payload: loginData },
      { type: types.USER_LOADED_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: loginData }));
    axios.get.mockImplementationOnce(() => Promise.reject());

    return store.dispatch(actions.googleAuthenticate('state', 'code')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  test('return dispatch GOOGLE_AUTH_FAIL on post rejected', async () => {
    localStorage.removeItem('access');
    const expectedActions = [
      { type: types.GOOGLE_AUTH_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})

    return store.dispatch(actions.googleAuthenticate('state', 'code')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  test('return google auth return empty list', async () => {
    localStorage.setItem('access', 'token');
    const expectedActions = []

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})

    return store.dispatch(actions.googleAuthenticate('state', 'code')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})

describe('reset password', () => {
  it('dispatch PASSWORD_RESET_SUCCESS', () => {
    const expectedActions = [
      { type: types.PASSWORD_RESET_SUCCESS }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve());

    const store = mockStore({})
    return store.dispatch(actions.reset_password("EMAIL")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch PASSWORD_RESET_FAIL', () => {

    const expectedActions = [
      { type: types.PASSWORD_RESET_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})
    return store.dispatch(actions.reset_password("EMAIL")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch PASSWORD_RESET_CONFIRM_SUCCESS', () => {
    const expectedActions = [
      { type: types.PASSWORD_RESET_CONFIRM_SUCCESS }
    ]

    axios.post.mockImplementationOnce(() => Promise.resolve());

    const store = mockStore({})
    return store.dispatch(actions.reset_password_confirm("UID", "TOKEN", "NEW_PASSWORD", "RE_NEW_PASSWORD")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatch PASSWORD_RESET_CONFIRM_FAIL', () => {

    const expectedActions = [
      { type: types.PASSWORD_RESET_CONFIRM_FAIL }
    ]

    axios.post.mockImplementationOnce(() => Promise.reject());

    const store = mockStore({})
    return store.dispatch(actions.reset_password_confirm("UID", "TOKEN", "NEW_PASSWORD", "RE_NEW_PASSWORD")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
