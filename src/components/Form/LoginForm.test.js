import { render as rtlRender, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';
import reducers from '../../reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

jest.mock('axios');

function render(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('<LoginForm />', () => {
  let container;
  beforeEach(() => container = render(<LoginForm />, {initialState: {}}))

  it('should render correctly', () => {
    expect(container.getByRole('form')).toBeInTheDocument();
    expect(container.getByLabelText(/Email/)).toBeInTheDocument();
    expect(container.getByLabelText(/Kata Sandi/)).toBeInTheDocument();
  });

  it('should have one or many masuk button', () => {
    expect(container.getAllByRole('button', {name: /masuk/i})).not.toHaveLength(0);
  })

  it('should have a link for reset password', () => {
    expect(container.getByRole('link', {name: /lupa kata sandi/i})).toBeInTheDocument();
    expect(container.getByRole('link', {name: /lupa kata sandi/i})).toHaveAttribute('href', '/reset-password');
  })

  test('login through form', () => {
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

    axios.post.mockImplementationOnce(() => Promise.resolve(loginData));
    axios.get.mockImplementationOnce(() => Promise.resolve({data: user}));

    fireEvent.change(container.getByLabelText(/Email/), {target: {value: 'ayam'}});

    fireEvent.change(container.getByLabelText(/Kata Sandi/), {target: {value: 'password'}});

    act(() => {fireEvent.click(container.getByRole('button', {name: 'Masuk'}))});

    expect(axios.post).toHaveBeenCalledTimes(1);
  })

  test('login through form failed and give alert', async () => {
    const alert = jest.spyOn(window, 'alert');
    alert.mockImplementation(() => {});
    axios.post.mockImplementationOnce(() => Promise.reject());

    fireEvent.change(container.getByLabelText(/Email/), {target: {value: 'ayam'}});

    fireEvent.change(container.getByLabelText(/Kata Sandi/), {target: {value: 'password'}});

    await act(async () => {
      fireEvent.click(container.getByRole('button', {name: 'Masuk'}));
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledTimes(1);
    alert.mockRestore();
  })
})
