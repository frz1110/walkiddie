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
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const listRusak = [
            {
                id:1,
                header: <h5>Arcade Game TimeZone Mall Pejaten Village </h5>,
                loc:<h6>TimeZone Mall Pejaten Village </h6>,
                level: '4',
                desc: 'Baterai mati dan mainan sudah tidak dapat dinyalakan selama 10 bulan. Kabel konslet dan perlu diganti baru. ',    
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/mainan-rusak/`, config).reply(200, listRusak);

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
        let loc;
        const initialState = {
            auth: {
                isAuthenticated: true,
                empty: true
            }
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <HomepageOperator isAuthenticated={true} />
                    </BrowserRouter>
                </Provider>);
            </>,
            initialState
        );
        expect(screen.getAllByText(/London eye ngadet karena terlalu penuh yang meniki wahana ini./).length).toBe(2);
    })

    it('should redirect if not authenticated', () => {
        let loc;
        const initialState = {
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <HomepageOperator isAuthenticated={false}/>
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
})