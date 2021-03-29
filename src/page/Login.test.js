import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Login from './Login';

function render(
  ui,
  {
    initialState = {auth: {isAuthenticated: false}},
    store = createStore(state => state, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router initialEntries={["/masuk"]}>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Login Page', () => {
  it('render successfully', () => {
    const { getByText } = render(<Login />);
    expect(getByText(/Walkiddie/)).toBeInTheDocument();
  })

  it('should redirect if authenticated', () => {
    let loc;
    render(
      <>
        <Login />
        <Route
          path="*"
          render={({location}) => {
            loc = location;
            return null;
          }}
        />
      </>,
      {initialState: {auth: {isAuthenticated: true}}}
    );
    expect(loc.pathname).toBe('/');
  })
})
