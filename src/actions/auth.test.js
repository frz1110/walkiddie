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
    axios.get.mockImplementationOnce(() => Promise.resolve({data: user}));
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

    axios.post.mockImplementationOnce(() => Promise.resolve({data: loginData}));

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

    axios.post.mockImplementationOnce(() => Promise.resolve({data: loginData}));
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
  it('should clear state token', () =>{
    const expectedAction = { type: types.LOGOUT };

    expect(actions.logout()).toEqual(expectedAction);
  })
})

describe('signup',() => {
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
                { type: types.SIGNUP_SUCCESS ,payload: signupData.data}
        ]

        axios.post.mockImplementationOnce(() => Promise.resolve(signupData));

        const store = mockStore({})
        return store.dispatch(actions.signup("Udma","Wijaya","ajiinisti12@gmail.com","MyAwesome123","MyAwesome123")).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch SIGNUP_FAIL',() =>{

        const expectedActions = [
            {   type: types.SIGNUP_FAIL     }
        ]

        axios.post.mockImplementationOnce(() => Promise.reject());

        const store = mockStore({})
        return store.dispatch(actions.signup("Udma","Wijaya","ajiinisti12@gmail.com","MyAwesome123","MyAwesome123")).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
})
