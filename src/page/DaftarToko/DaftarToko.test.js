import DaftarToko from './DaftarToko'
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios');

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Daftar Toko />', () => {
    it('renders form', () => {
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
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Nama Toko/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama Cabang/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tipe Usaha/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor Telepon/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Deskripsi Toko/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Lokasi Toko/)).toBeInTheDocument();
        expect(screen.getByText("Simpan")).toBeInTheDocument();
    });

    it('should redirect if not Mitra', () => {
        let loc;
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
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
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
                            isAuthenticated: true,
                            user: {
                                role: "Investor"
                                }
                            }
                        }
            }
        );
        expect(loc.pathname).toBe('/');
    })

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
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
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

    test('submit toko through form', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                },
                refresh: 'token',
                access: 'access'
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
        ]

        const tokoData = {
            data: {
                namaToko: 'Bebek slamet',
                namaCabang: 'Utama',
                tipeUsaha: 'Restoran',
                nomorTelepon: '089876548796',
                deskripsiToko: 'Jual bebek',
                lokasiToko: 'Margonda',
                latitude: -6.364520803098946,
                longitude: 106.82922538589406,
                daerah:'jakarta',
                mediaTokoList: files
            }
        }

        axios.post.mockImplementationOnce(() => Promise.resolve(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const daerah = getByLabelText(/Daerah/);
        const mediaToko = getByRole('mediatoko');
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(daerah, "Beji, Depok");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
    });

    test('submit toko through form do not have access', async() => {
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
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
        ]

        const tokoData = {
            data: {
                namaToko: 'Bebek slamet',
                namaCabang: 'Utama',
                tipeUsaha: 'Restoran',
                nomorTelepon: '089876548796',
                deskripsiToko: 'Jual bebek',
                lokasiToko: 'Margonda',
                latitude: -6.364520803098946,
                longitude: 106.82922538589406,
                daerah:'jakarta',
                mediaTokoList: files
            }
        }

        axios.post.mockImplementationOnce(() => Promise.resolve(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const daerah = getByLabelText(/Daerah/);
        const mediaToko = getByRole('mediatoko');
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(daerah, "Beji, Depok");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
    });

    test('submit toko through form get failed', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                },
                refresh: 'token',
                access: 'access'
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
        ]

        const tokoData = {
            data: {
                namaToko: 'Bebek slamet',
                namaCabang: 'Utama',
                tipeUsaha: 'Restoran',
                nomorTelepon: '089876548796',
                deskripsiToko: 'Jual bebek',
                lokasiToko: 'Margonda',
                latitude: -6.364520803098946,
                longitude: 106.82922538589406,
                daerah:'jakarta',
                mediaTokoList: files
            }
        }

        axios.post.mockImplementationOnce(() => Promise.reject(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const daerah = getByLabelText(/Daerah/);
        const mediaToko = getByRole('mediatoko');
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(daerah, "Beji, Depok");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
    });
});