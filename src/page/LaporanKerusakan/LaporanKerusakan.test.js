import LaporanKerusakan from './LaporanKerusakan';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import { Provider } from 'react-redux'

jest.mock('axios');

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<LaporanKerusakan />', () => {
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
                    <LaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Laporan Kerusakan Mesin/)).toBeInTheDocument();
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
                    <LaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Kode Mainan/)).toBeInTheDocument();        
        expect(screen.getByLabelText(/Deskripsi Kerusakan/)).toBeInTheDocument();
        expect(screen.getByText(/Bukti Kerusakan/)).toBeInTheDocument();
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = { auth: { isAuthenticated: false } }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LaporanKerusakan userData={mockUser} isAuthenticated={false} />
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
                    <LaporanKerusakan userData={mockUser} isAuthenticated={false} />
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
                    <LaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const deskripsi = getByLabelText('Deskripsi Kerusakan');
        userEvent.type(deskripsi, 'Mesin Tidak Menyala');
        expect(screen.getByLabelText('Deskripsi Kerusakan')).toHaveValue('Mesin Tidak Menyala');
    });

    test('submit through form', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        global.URL.createObjectURL = jest.fn();
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    email: "user12345@gmail.com",
                    first_name: "ihsan",
                    last_name: "azizi",
                    role: "Mitra"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const { getByLabelText, getByRole, getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LaporanKerusakan isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const file = new File(['user'], 'user.png', { type: 'image/png' })

        const kerusakanData = {
            data: {
                mainan_pengadaan: "1",
                deskripsi: "Mesin Tidak Menyala",
                foto_kerusakan: file
            }
        }

        const deskripsi_kerusakan = getByLabelText('Deskripsi Kerusakan');
        const bukti_kerusakan = getByRole('mediatoko');
        const tombolSimpan = getByText("Submit");

        axios.post.mockImplementationOnce(() => Promise.resolve(kerusakanData));

        userEvent.type(deskripsi_kerusakan, 'Mesin Tidak Menyala');
        userEvent.upload(bukti_kerusakan, file);

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
    });

    test('fail submit through form', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        global.URL.createObjectURL = jest.fn();
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    email: "user12345@gmail.com",
                    first_name: "ihsan",
                    last_name: "azizi",
                    role: "Mitra"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const { getByLabelText, getByRole, getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LaporanKerusakan isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const kerusakanData = {
            data: {
                mainan_pengadaan: "1",
                deskripsi: "Mesin Tidak Menyala",
            }
        }

        const deskripsi_kerusakan = getByLabelText('Deskripsi Kerusakan');
        const tombolSimpan = getByText("Submit");

        axios.post.mockImplementationOnce(() => Promise.reject(kerusakanData));

        userEvent.type(deskripsi_kerusakan, 'Mesin Tidak Menyala');

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
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
                    <LaporanKerusakan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Laporan Kerusakan Mesin', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })

});