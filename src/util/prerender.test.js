import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetch_user } from './prerender';
import { USER_LOADED_SUCCESS, USER_LOADED_FAIL } from '../actions/types';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('fetch_user', () => {
  let getItem, store;
  beforeEach(() => {
    getItem = jest.spyOn(window.localStorage.__proto__, 'getItem');
    store = mockStore({});
  });

  afterEach(() => {
    getItem.mockRestore();
  })
  it('should load user if access token exist', async () => {
    const user = {
      id: 1,
      email: 'email',
      first_name: 'first_name',
      last_name: 'last_name',
      role: 'role'
    }

    getItem.mockImplementation(_item => 'exist');
    axios.get.mockImplementationOnce(() => Promise.resolve({data: user}))
    await fetch_user(store, jest.fn());
    expect(getItem).toHaveBeenCalledTimes(3);
    expect(store.getActions()).toEqual([{
      type: USER_LOADED_SUCCESS,
      payload: user
    }])
  });

  it('shouldn\'t get user if user doesn\'t exist', async () => {
    getItem.mockImplementation(_item => null);
    await fetch_user(store, jest.fn());
    expect(store.getActions()).toHaveLength(0);
    expect(axios.get).not.toHaveBeenCalled();
  })
})
