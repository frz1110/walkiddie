import DetailInvestasi from './DetailInvestasi';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios');

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<DetailInvestasi />', () => {
    it('should redirect if not Investor', () => {
        let loc;
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra",
                    email:'mitra@gmail.com'
                },
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <DetailInvestasi location={{state:''}} />
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>);
          </>,
            {initialState: initialState}
    );
        expect(loc.pathname).toBe('/');
    })

    it('should redirect if guest', () => {
        let loc;
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Investor",
                    email:'mitra@gmail.com'
                },
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <DetailInvestasi location={{state:''}}/>
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>);
          </>,
            {initialState: initialState});
        expect(loc.pathname).toBe('/masuk');
    })
});