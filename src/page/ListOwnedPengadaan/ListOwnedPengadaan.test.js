import ListOwnedPengadaan from './ListOwnedPengadaan';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('ListOwnedPengadaan />', () => {
    it('renders the right contents', () => {
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
        const store = mockStore(initialState)
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Investasi yang dimiliki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Investor"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={false} user={mockUser} />
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

    it('should redirect if not Investor', () => {
        let loc;
        const mockUser = jest.fn()
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
                    <ListOwnedPengadaan isAuthenticated={true} user={mockUser} />
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

    it('fetches successfully data investasi and pengadaan from an API', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    email: "jflows1012@gmail.com",
                    first_name: "ihsan",
                    last_name: "azizi",
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const investasiData = [
            {
                danaTerkumpul: 0,
                estimasiKeuangan: "Ini BEBEK LOH",
                files: ["http://localhost:8000/media/toko/pengadaan/resto-bebek-3.jpg"],
                investor: "jflows1012@gmail.com",
                nominal: 105000,
                paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
                pengadaan: 1,
                periodePengadaanAkhir: "2021-05-24",
                periodePengadaanMulai: "2021-05-04",
                pk: 1,
                status: "MPA",
                timestamp: "2021-06-02T09:41:01.001705+07:00",
                toko: 1,
                totalBiaya: 150000,
            }
        ]

        const pengadaanData = [
            {
                danaTerkumpul: 1500000,
                estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
                files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
                    "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
                ],
                paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
                periodePengadaanAkhir: "2021-07-11",
                periodePengadaanMulai: "2021-06-01",
                pk: 1,
                toko: 1,
                totalBiaya: 1500000
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config).reply(200, investasiData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/1`, config).reply(200, pengadaanData);

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Investasi yang dimiliki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('fetches successfully data toko from an API', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    email: "jflows1012@gmail.com",
                    first_name: "ihsan",
                    last_name: "azizi",
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const tokoData = [
            {
                daerah: "Pekalongan",
                danaTerkumpul: 1500000,
                deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
                estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
                files: ["http://localhost:8000/media/toko/pengadaan/kfc1.jpg",
                    "http://localhost:8000/media/toko/pengadaan/resto-bebek-3.jpg"
                ],
                fotoProfilToko: "http://localhost:8000/media/toko/profil/profil-bebek.jpg",
                latitude: -25.344,
                lokasiToko: "Uluru, Australia",
                longitude: 131.036,
                namaCabang: "Cabang Maros 05",
                namaToko: "Restoran Walkiddie",
                nomorTelepon: "08123456789",
                owner: "mitra@wkd.com",
                paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
                periodePengadaanAkhir: "2021-07-11",
                periodePengadaanMulai: "2021-06-01",
                pk: 1,
                pkToko: 1,
                tipeUsaha: "Restoran",
                toko: 1,
                totalBiaya: 1500000
            }
        ]

        const pengadaanData = [
            {
                danaTerkumpul: 1500000,
                estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
                files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
                    "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
                ],
                paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
                periodePengadaanAkhir: "2021-07-11",
                periodePengadaanMulai: "2021-06-01",
                pk: 1,
                toko: 1,
                totalBiaya: 1500000
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/1`, config).reply(200, pengadaanData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pengadaanData[0].toko}`, config).reply(200, tokoData);

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Investasi yang dimiliki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('fetches unsuccessfully data toko from an API', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    email: "jflows1012@gmail.com",
                    first_name: "ihsan",
                    last_name: "azizi",
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const tokoData = [
            {
                error: "error",
            }
        ]

        const pengadaanData = [
            {
                danaTerkumpul: 1500000,
                estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
                files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
                    "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
                ],
                paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
                periodePengadaanAkhir: "2021-07-11",
                periodePengadaanMulai: "2021-06-01",
                pk: 1,
                toko: 1,
                totalBiaya: 1500000
            }
        ]

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pengadaanData.toko}`, config).reply(200, tokoData);

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Investasi yang dimiliki/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('fetches unsuccessfully data investasi from an API', () => {
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
        const store = mockStore(initialState)

        const investasiData = [
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

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config).reply(401, investasiData);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        localStorage.removeItem('access', 'token')
    });

    it('fetches empty data investasi from an API', () => {
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
        const store = mockStore(initialState)

        const investasiData = []

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        var mock = new MockAdapter(axios);

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config).reply(200, investasiData);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListOwnedPengadaan isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        localStorage.removeItem('access', 'token')
    });
})
