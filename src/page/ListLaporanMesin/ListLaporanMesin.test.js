import ListLaporanMesin from './ListLaporanMesin';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<ListLaporanMesin />', () => {

    it('success render list laporan', () => {
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

        const laporanData = [
            {
                pk: 1,
                mainanPengadaan: {
                    id: 23,
                    mainan: {
                        id: 1,
                        namaMainan: "Kiddie Ride Submarine",
                        deskripsiMainan: "A SpongeBob theme kid's ride in the shape of a submarine. Available colors: Red, Green, Yellow.",
                        harga: 11000000.0,
                        gambarMainan: "http://walkiddie.cs.ui.ac.id/media/mainan/media/pngfind-2.png"
                    },
                    stringMainan: "Kiddie Ride Submarine_23",
                    status: "RSK",
                    pengadaan: {
                        pk: 37,
                        toko: {
                            pk: 34,
                            owner: "mitra@gmail.com",
                            namaToko: "Fun World",
                            namaCabang: "-",
                            status: "TRM",
                            tipeUsaha: "Mainan",
                            nomorTelepon: "02154382172",
                            deskripsiToko: "Fun World Matahari Daan Mogot Baru",
                            lokasiToko: "Jalan Daan Mogot Kalideres Mal Matahari Daan Mogot Lt 2 Unit 16A, RT.8/RW.12, Kalideres, Kec. Kalideres, DKI Jakarta, Daerah Khusus Ibukota Jakarta 11840",
                            longitude: 106.82922538589406,
                            latitude: -6.364520803098946,
                            daerah: "Kalideres",
                            fotoProfilToko: "http://walkiddie.cs.ui.ac.id/media/toko/profil/IMG-20200623-WA0016.jpg"
                        }
                    }
                },
                mitra: "operator2@gmail.com",
                fotoKerusakan: "http://walkiddie.cs.ui.ac.id/media/kerusakan/pngfind-2.png",
                deskripsi: "mainan rusak",
                timestamp: "2021-11-25T15:38:42.650381+07:00",
                status: "NAS"
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/`, config).reply(200, laporanData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListLaporanMesin isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByText(/Laporan Mesin Anda/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('failed render daftar toko and daftar pengadaan', () => {
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

        const laporanData = [
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

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/`, config).reply(401, laporanData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListLaporanMesin isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        // expect(screen.getByText(/Daftar Toko/)).toBeInTheDocument();
        expect(screen.getByText(/Laporan Mesin Anda/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
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
                        <ListLaporanMesin user={mockUser} isAuthenticated={mockAuthenticate} />
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
            {
                initialState: {
                    auth: {
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

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: null
            }
        }
        const store = mockStore(initialState)
        render(
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <ListLaporanMesin user={mockUser} isAuthenticated={mockAuthenticate} />
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
            {
                initialState: {
                    auth: {
                        isAuthenticated: true,
                        user: null
                    }
                }
            }
        );
        expect(loc.pathname).toBe('/masuk');
    })
})