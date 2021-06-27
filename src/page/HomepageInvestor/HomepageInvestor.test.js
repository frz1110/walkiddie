import HomepageInvestor from './HomepageInvestor';
import { render, screen, fireEvent, userEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosMock from 'axios';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<HomepageInvestor />', () => {
    it('should redirect if not Investor', () => {
        let loc;
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
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <HomepageInvestor user={mockUser} isAuthenticated={mockAuthenticate} />
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
                    <HomepageInvestor user={mockUser} isAuthenticated={mockAuthenticate} />
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

        const tokoData = [
            {
                daerah: "Pekalongan",
                danaTerkumpul: 1500000,
                deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
                estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
                files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
                    "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
                ],
                fotoProfilToko: "http://localhost:8000/media/toko/profil/toko3.png",
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
                pkToko: 1,
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

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config).reply(200, tokoData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config).reply(200, pengadaanData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        expect(screen.getByText('Daftar Proyek Pengadaan')).toBeInTheDocument();
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

        const tokoData = [
            {
                error: "error",
            }
        ]

        const pengadaanData = [
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

        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config).reply(401, tokoData);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config).reply(401, pengadaanData);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        localStorage.removeItem('access', 'token')
    });

    // test('search toko by name in search field', async() => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Investor"
    //             }
    //         }
    //     }
    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState);

    //     const tokoData = [
    //         {
    //             daerah: "Pekalongan",
    //             danaTerkumpul: 1500000,
    //             deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             fotoProfilToko: "http://localhost:8000/media/toko/profil/toko3.png",
    //             latitude: -25.344,
    //             lokasiToko: "Uluru, Australia",
    //             longitude: 131.036,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Restoran Walkiddie",
    //             nomorTelepon: "08123456789",
    //             owner: "mitra@wkd.com",
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 1,
    //             pkToko: 1,
    //             tipeUsaha: "Restoran",
    //             toko: 1,
    //             totalBiaya: 1500000
    //         },
    //         {
    //             daerah: "Tebet",
    //             danaTerkumpul: 1500000,
    //             deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             fotoProfilToko: "http://localhost:8000/media/toko/profil/toko3.png",
    //             latitude: -25.344,
    //             lokasiToko: "Uluru, Australia",
    //             longitude: 131.036,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Restoran Walkiddie",
    //             nomorTelepon: "08123456789",
    //             owner: "mitra@wkd.com",
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 2,
    //             pkToko: 2,
    //             tipeUsaha: "Restoran",
    //             toko: 2,
    //             totalBiaya: 1500000
    //         }
    //     ]

    //     const pengadaanData = [
    //         {
    //             danaTerkumpul: 1500000,
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 1,
    //             pkToko: 1,
    //             toko: 1,
    //             totalBiaya: 1500000
    //         },
    //         {
    //             danaTerkumpul: 1500000,
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 2,
    //             pkToko: 2,
    //             toko: 2,
    //             totalBiaya: 1500000
    //         }
    //     ]

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //         }
    //     };

    //     var mock = new MockAdapter(axios);

    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config).reply(200, tokoData);
    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config).reply(200, pengadaanData);

    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
    //             </BrowserRouter>
    //         </Provider>);

    //     const searchField = screen.getByPlaceholderText(/Search/);
    //     await userEvent.type(searchField, "Restoran Walkiddie");
    //     localStorage.removeItem('access', 'token')
    // });

    // test('search toko by filter', async() => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Investor"
    //             }
    //         }
    //     }
    //     localStorage.setItem('access', 'token');
    //     const store = mockStore(initialState);

    //     const tokoData = [
    //         {
    //             daerah: "Pekalongan",
    //             danaTerkumpul: 1500000,
    //             deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             fotoProfilToko: "http://localhost:8000/media/toko/profil/toko3.png",
    //             latitude: -25.344,
    //             lokasiToko: "Uluru, Australia",
    //             longitude: 131.036,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Restoran Walkiddie",
    //             nomorTelepon: "08123456789",
    //             owner: "mitra@wkd.com",
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 1,
    //             pkToko: 1,
    //             tipeUsaha: "Restoran",
    //             toko: 1,
    //             totalBiaya: 1500000
    //         },
    //         {
    //             daerah: "Tebet",
    //             danaTerkumpul: 1500000,
    //             deskripsiToko: "Lorem deskripsi toko. Enak maknyus.",
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             fotoProfilToko: "http://localhost:8000/media/toko/profil/toko3.png",
    //             latitude: -25.344,
    //             lokasiToko: "Uluru, Australia",
    //             longitude: 131.036,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Restoran Walkiddie",
    //             nomorTelepon: "08123456789",
    //             owner: "mitra@wkd.com",
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 2,
    //             pkToko: 2,
    //             tipeUsaha: "Restoran",
    //             toko: 2,
    //             totalBiaya: 1500000
    //         }
    //     ]

    //     const pengadaanData = [
    //         {
    //             danaTerkumpul: 1500000,
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 1,
    //             pkToko: 1,
    //             toko: 1,
    //             totalBiaya: 1500000
    //         },
    //         {
    //             danaTerkumpul: 1500000,
    //             estimasiKeuangan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eros justo, placerat non sagittis quis, consequat et elit.",
    //             files: ["http://localhost:8000/media/toko/pengadaan/req1.png",
    //                 "http://localhost:8000/media/toko/pengadaan/req1_0ZBCu2D.png"
    //             ],
    //             paketMainan: "Paket A (2 claw machine, 1 kiddie ride)",
    //             periodePengadaanAkhir: "2021-07-11",
    //             periodePengadaanMulai: "2021-06-01",
    //             pk: 2,
    //             pkToko: 2,
    //             toko: 2,
    //             totalBiaya: 1500000
    //         }
    //     ]

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //         }
    //     };

    //     var mock = new MockAdapter(axios);

    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config).reply(200, tokoData);
    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config).reply(200, pengadaanData);

    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
    //             </BrowserRouter>
    //         </Provider>);

    //     const mySelectComponent = screen.getByTestId('select-daerah');

    //     await fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
    //     await(() => screen.getByText('Tebet'));
    //     await fireEvent.click(screen.getByText('Tebet'));

    //     localStorage.removeItem('access', 'token')
    // });
})