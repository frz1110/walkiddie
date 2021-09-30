import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HomepageOperator from './HomepageOperator';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<HomepageOperator />', () => {

    it('success render page operator', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomepageOperator isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByText(/Belum diperbaiki/)).toBeInTheDocument();
        expect(screen.getByText(/Sedang diperbaiki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('dummy data should be displayed', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
                
            }
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <HomepageOperator isAuthenticated={mockAuthenticate} user={mockUser} />
                    </BrowserRouter>
                </Provider>);
            </>,
            initialState
        );
        expect(screen.getAllByText(/London eye ngadet karena terlalu penuh yang meniki wahana ini./).length).toBe(2);
    })

    it('should redirect if not authenticated', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        let loc;
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Operator"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <HomepageOperator isAuthenticated={mockAuthenticate} user={mockUser}/>
                        <Route
                            path="*"
                            render={({ location }) => {
                                loc = location;
                                return null;
                            }}
                        />
                    </BrowserRouter>
                </Provider>);
            </>,
            initialState
        );
        expect(loc.pathname).toBe('/masuk');
    })
    it('should redirect if not operator', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        let loc;
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <HomepageOperator isAuthenticated={mockAuthenticate} user={mockUser}/>
                        <Route
                            path="*"
                            render={({ location }) => {
                                loc = location;
                                return null;
                            }}
                        />
                    </BrowserRouter>
                </Provider>);
            </>,
            initialState
        );
        expect(loc.pathname).toBe('/');
    })
})