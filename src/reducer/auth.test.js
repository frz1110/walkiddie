import reducer from './auth';
import * as types from '../actions/types';

describe('auth reducer', () => {
  beforeEach(() => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  });
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      access: null,
      refresh: null,
      isAuthenticated: null,
      user: null
    })
  })

  it('should put authenticate to true and put token', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    const user = { name: 'name' }
    const accessToken = 'access';
    const refreshToken = 'refresh';

    expect(
      reducer(
        { user },
        {
          type: types.LOGIN_SUCCESS,
          payload: {
            access: accessToken,
            refresh: refreshToken,
          }
        }
      )
    ).toEqual({
      user,
      access: accessToken,
      refresh: refreshToken,
      isAuthenticated: true
    });

    expect(spy.mock.calls[0]).toEqual(['access', accessToken]);
    expect(spy.mock.calls[1]).toEqual(['refresh', refreshToken]);
    spy.mockRestore();
  })

  it('should remove token and authentication on login fail', () => {
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    expect(reducer({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: { name: 'user' }
    }, { type: types.LOGIN_FAIL })).toEqual({
      access: null,
      refresh: null,
      isAuthenticated: false,
      user: null
    })
    expect(spy.mock.calls[0]).toEqual(['access']);
    expect(spy.mock.calls[1]).toEqual(['refresh']);
    spy.mockRestore();
  })


  it('should remove user on user loaded fail', () => {
    expect(reducer({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: { name: 'user' }
    }, { type: types.USER_LOADED_FAIL })).toEqual({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: null
    })
  })

  it('should load user on user loaded success', () => {
    const user = { name: 'user' }
    expect(reducer({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: null
    }, { type: types.USER_LOADED_SUCCESS, payload: user })).toEqual({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: user
    })
  })

  it('should remove token on logout', () => {
    const user = { name: 'user' }
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    expect(reducer({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: user
    }, { type: types.LOGOUT })).toEqual({
      access: null,
      refresh: null,
      isAuthenticated: false,
      user: null
    })
    expect(spy.mock.calls[0]).toEqual(['access']);
    expect(spy.mock.calls[1]).toEqual(['refresh']);
    spy.mockRestore();
  })

  it('signup success', () => {
    expect(reducer({
      isAuthenticated: false
    }, { type: types.SIGNUP_SUCCESS })).toEqual({
      isAuthenticated: false
    })
  })

  it('signup fail', () => {
    expect(reducer({}, { type: types.SIGNUP_FAIL })).toEqual({
      "access": null,
      "isAuthenticated": false,
      "refresh": null,
      "user": null,
    })
  })

  it('activation success', () => {
    expect(reducer({}, { type: types.ACTIVATION_SUCCESS })).toEqual({})
  })

  it('activation fail', () => {
    expect(reducer({}, { type: types.ACTIVATION_FAIL })).toEqual({})
  })

  it('should put google authenticate to true and put token', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    const user = { name: 'name' }
    const accessToken = 'access';
    const refreshToken = 'refresh';

    expect(
      reducer(
        { user },
        {
          type: types.GOOGLE_AUTH_SUCCESS,
          payload: {
            access: accessToken,
            refresh: refreshToken,
          }
        }
      )
    ).toEqual({
      user,
      access: accessToken,
      refresh: refreshToken,
      isAuthenticated: true
    });

    expect(spy.mock.calls[0]).toEqual(['access', accessToken]);
    expect(spy.mock.calls[1]).toEqual(['refresh', refreshToken]);
    spy.mockRestore();
  })

  it('should remove token and authentication on google auth fail', () => {
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    expect(reducer({
      access: 'access',
      refresh: 'refresh',
      isAuthenticated: true,
      user: { name: 'user' }
    }, { type: types.GOOGLE_AUTH_FAIL })).toEqual({
      access: null,
      refresh: null,
      isAuthenticated: false,
      user: null
    })
    expect(spy.mock.calls[0]).toEqual(['access']);
    expect(spy.mock.calls[1]).toEqual(['refresh']);
    spy.mockRestore();
  })

  it('password reset success', () => {
    expect(reducer({}, { type: types.PASSWORD_RESET_SUCCESS })).toEqual({})
  })

  it('password reset fail', () => {
    expect(reducer({}, { type: types.PASSWORD_RESET_FAIL })).toEqual({})
  })

  it('password reset confirm success', () => {
    expect(reducer({}, { type: types.PASSWORD_RESET_CONFIRM_SUCCESS })).toEqual({})
  })

  it('password reset confirm fail', () => {
    expect(reducer({}, { type: types.PASSWORD_RESET_CONFIRM_FAIL })).toEqual({})
  })
})
