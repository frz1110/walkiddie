import ListSahamDijual from './ListSahamDijual';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<ListSahamDijual />', () => {

    it('should redirect if not Investor', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {
            isAuthenticated: true,
            user: {
                role: "Mitra"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListSahamDijual user={mockUser} isAuthenticated={mockAuthenticate} />
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>
            );
            expect(loc.pathname).toBe('/');
            
        localStorage.removeItem('access', 'token')
    });

    it('should redirect if guest', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: false
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <ListSahamDijual user={mockUser} isAuthenticated={mockAuthenticate} />
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
            {initialState: {auth: {
                            isAuthenticated: false
                            }
                        }
            }
        );
        expect(loc.pathname).toBe('/masuk');
    })

    it('renders the right contents', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {
            isAuthenticated: true,
            user: {
                role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const sahamData = [
            {
                investor: "investor@gmail.com",
                nominal: 100,
                pembeli: 2,
                pengadaan: { toko: { namaToko: "Restoran Walkiddie"}},
                pk: 1,
                status: "TRM",
                statusInvestasi: "DJL",
                statusPembelian: "MPA",
                timestamp: "2021-11-18T18:54:54.292187+07:00",
                uangInvestasi: 27000000
            }
        ];

        const investorData = [
            {
                address: "jakarta",
                birth_date: "2004-11-09",
                email: "investor@gmail.com",
                full_name: "Juna Unari",
                ktp_number: "3674122903478923",
                phone_number: "081212843451"
            }
        ];

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/penjualan/`, config).reply(200, sahamData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/investor@gmail.com`, config).reply(200, investorData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListSahamDijual isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        expect(screen.getByText('Daftar Saham yang Dijual')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('failed render daftar saham', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const sahamData = [
            {
                error: "error",
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/penjualan/`, config).reply(401, sahamData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListSahamDijual isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        localStorage.removeItem('access', 'token')
    });

    test('search toko by name in search field', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState);

        const sahamData = [
            {
                investor: "investor@gmail.com",
                nominal: 100,
                pembeli: 2,
                pengadaan: { toko: { namaToko: "Restoran Walkiddie"}},
                pk: 1,
                status: "TRM",
                statusInvestasi: "DJL",
                statusPembelian: "MPA",
                timestamp: "2021-11-18T18:54:54.292187+07:00",
                uangInvestasi: 27000000
            }
        ];

        const investorData = [
            {
                address: "jakarta",
                birth_date: "2004-11-09",
                email: "investor@gmail.com",
                full_name: "Juna Unari",
                ktp_number: "3674122903478923",
                phone_number: "081212843451"
            }
        ];

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/penjualan/`, config).reply(200, sahamData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/investor@gmail.com`, config).reply(200, investorData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListSahamDijual isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const searchField = screen.getByRole('textbox');
        await userEvent.type(searchField, "Restoran Walkiddie");
        localStorage.removeItem('access', 'token')
    });

})