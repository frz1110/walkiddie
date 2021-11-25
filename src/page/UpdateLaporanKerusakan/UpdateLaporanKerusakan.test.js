import UpdateLaporanKerusakan from './UpdateLaporanKerusakan';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<UpdateLaporanKerusakan />', () => {
    it('renders correctly', () => {
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
        const store = mockStore(initialState)

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Ubah Laporan Kerusakan Mesin/)).toBeInTheDocument();
    });

    it('renders the right contents', () => {
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
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Kode Mainan/)).toBeInTheDocument();        
        expect(screen.getByLabelText(/Deskripsi Kerusakan/)).toBeInTheDocument();
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = { auth: { isAuthenticated: false } }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={false} />
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
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={false} />
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

    test('useState Function testing', () => {
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
        const store = mockStore(initialState)

        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const deskripsi = getByLabelText('Deskripsi Kerusakan');
        userEvent.type(deskripsi, 'Mesin Tidak Menyala');
        expect(screen.getByLabelText('Deskripsi Kerusakan')).toHaveValue('Mesin Tidak Menyala');
    });

    test('back button work correctly', () => {
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
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => { });

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <UpdateLaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Laporan Kerusakan Mesin', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })

});