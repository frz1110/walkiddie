import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HomepageOperator from './HomepageOperator';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const notAssignedData = [{
    pk:1,
    mainanPengadaan: { pengadaan: { toko: { namaToko: 'Not Assigned' }}},
    loc: 'TimeZone Mall Pejaten Village',
    level: '4',
    deskripsi: 'Rusak',
    status: 'BD'
}]

const assignedData = [{
    pk:2,
    mainanPengadaan: { pengadaan: { toko: { namaToko: 'Assigned' }}},
    loc: 'TimeZone Mall PIK',
    level: '3',
    deskripsi: 'Rusak',
    status: 'BD'
}]

const resolved = [{
    pk:3,
    mainanPengadaan: { pengadaan: { toko: { namaToko: 'Resolved' }}},
    loc: 'timezone mall pim',
    level: '3',
    deskripsi: 'Rusak',
    status: 'SD'
}]

const mock = new MockAdapter(axios);
mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/wilayah/`).reply(200, notAssignedData);
mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/list-operator/assigned/`).reply(200, assignedData);
mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/list-operator/resolved/`).reply(200, resolved);

function setUp(initialState, {route = "/"} = {}) {
    const mockUser = jest.fn()
    const mockAuthenticate = jest.fn()
    let loc;
    const store = mockStore(initialState)
    window.history.pushState({}, 'Test Page', route);
    const renderResult = render(
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/">
                      <HomepageOperator />
                    </Route>
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
    return {loc, renderResult};
}

describe('<HomepageOperator />', () => {
    it('success render page operator', async () => {
        const { renderResult: { getByText } } = setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        })
        expect(getByText(/Belum diperbaiki/)).toBeInTheDocument();
        expect(getByText(/Sedang diperbaiki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('dummy data should be displayed', async () => {
        setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        })
        await waitFor(() => expect(screen.getByText(/Not Assigned/)).toBeInTheDocument());
    })

    it('should redirect if not authenticated', async () => {
        const { loc } = setUp({
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Operator"
                }
            }
        })
        expect(loc.pathname).toBe('/masuk');
    })
    it('should redirect if not operator', () => {
        const { loc } = setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        })
        expect(loc.pathname).toBe('/');
    });
    it('should able to display laporan in perbaikan', async () => {
        setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }, { route: "/#sedang-diperbaiki"})
        await waitFor(() => expect(screen.getByText(/Assigned/)).toBeInTheDocument());
    });
    it('should able to display laporan selesai', async () => {
        setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }, { route: "/#selesai"})
        await waitFor(() => screen.getByText(/Resolved/));
    });
    it('should able to display laporan if no hash exist', async () => {
        setUp({
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }, { route: "/#none"})
        await waitFor(() => screen.getByText(/Not Assigned/));
    });
})
