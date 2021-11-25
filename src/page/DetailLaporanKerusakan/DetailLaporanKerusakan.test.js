import DetailLaporanKerusakan from './DetailLaporanKerusakan';
import { render } from '@testing-library/react';
import axios from 'axios'
import { Route } from 'react-router-dom'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../components/Map/Map', () => {
    return {
        Map: () => <div />,
        InputMap: () => <div />
    }
})

jest.mock('react-chartjs-2', ()=>{
    return {
        Doughnut: () => <div/>,
    }
})

describe('<DetailLaporanKerusakan />', () => {

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Mitra"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DetailLaporanKerusakan isAuthenticated={false} userData={mockUser} match={mockMatch} />
                    <Route
                        path="*"
                        render={({ location }) => {
                            loc = location;
                            return null;
                        }}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(loc.pathname).toBe('/masuk');
    });

    it('should redirect if not mitra', () => {
        let loc;
        const mockUser = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
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
            <Provider store={store}>
                <BrowserRouter>
                    <DetailLaporanKerusakan isAuthenticated={true} userData={mockUser} match={mockMatch} />
                    <Route
                        path="*"
                        render={({ location }) => {
                            loc = location;
                            return null;
                        }}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(loc.pathname).toBe('/');
    });

    test('back button work correctly', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => { });

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DetailLaporanKerusakan isAuthenticated={mockAuthenticate} userData={mockUser} match={mockMatch} />
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Kembali', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })
})
