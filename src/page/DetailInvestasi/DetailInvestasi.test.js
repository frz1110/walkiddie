import DetailInvestasi from './DetailInvestasi';
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

describe('DetailInvestasi />', () => {
    // it('renders the right contents', () => {
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

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //         }
    //     };


    //     const location = {
    //         state:{
    //             daerah: "Pandeglang",
    //             kuantitas: 4,
    //             mainan: {id: 1, namaMainan: 'Kiddie Ride Submarine', deskripsiMainan: 'Mainan tunggangan dengan bentuk kapal selam dan tema Spongebob', harga: 12000000, gambarMainan: 'http://walkiddie.cs.ui.ac.id/media/mainan/media/pngfind-2.png'},
    //             danaTerkumpul: 100,
    //             deskripsiToko: "-" ,
    //             estimasiKeuangan: "-",
    //             files: {0: "http://walkiddie.cs.ui.ac.id/media/toko/pengadaan/43abc7d2001a73e59225f27324c4a40a_600x400_XcBC0hY.png"},
    //             fotoProfilToko: "http://walkiddie.cs.ui.ac.id/media/toko/profil/media/2616963971.jpg",
    //             investor: "investor@gmail.com",
    //             latitude: 13.02323,
    //             lokasiToko: "Pandeglang",
    //             longitude: 12,
    //             namaCabang: "Cabang Pusat",
    //             namaToko: "Butik Batik",
    //             nominal: 100,
    //             nomorTelepon: "7453312423",
    //             owner: "mitra@gmail.com",
    //             pengadaan: 8,
    //             periodePengadaanAkhir: "2021-11-24",
    //             periodePengadaanMulai: "2021-10-08",
    //             pk: 2,
    //             status: "TRM",
    //             statusProyek: "MPA",
    //             timestamp: "2021-10-05T21:41:03.259360+07:00",
    //             tipeUsaha: "Butik",
    //             toko: 2,
    //             totalBiaya: 100,
    //         }
    //     }

    //     const pengadaanData={}


    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState)
    //     var mock = new MockAdapter(axios);

    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/2/sales`, config).reply(200, pengadaanData);
        
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <DetailInvestasi isAuthenticated={mockAuthenticate} user={mockUser} location={location} />
    //             </BrowserRouter>
    //         </Provider>);

    //     expect(getByText(/Total Saham Dimiliki/)).toBeInTheDocument();
    //     localStorage.removeItem('access', 'token')
    // });



    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn();
        const mockAuthenticate = jest.fn();
        const initialState = {
            auth: {
                isAuthenticated: false,
                user: {
                    role: "Investor"
                }
            }
        }

        const location = {
            state:{
                daerah: "Pandeglang",
                kuantitas: 4,
                mainan: {id: 1, namaMainan: 'Kiddie Ride Submarine', deskripsiMainan: 'Mainan tunggangan dengan bentuk kapal selam dan tema Spongebob', harga: 12000000, gambarMainan: 'http://walkiddie.cs.ui.ac.id/media/mainan/media/pngfind-2.png'},
                danaTerkumpul: 0,
                deskripsiToko: "-" ,
                estimasiKeuangan: "-",
                files: {0: "http://walkiddie.cs.ui.ac.id/media/toko/pengadaan/43abc7d2001a73e59225f27324c4a40a_600x400_XcBC0hY.png"},
                fotoProfilToko: "http://walkiddie.cs.ui.ac.id/media/toko/profil/media/2616963971.jpg",
                investor: "investor@gmail.com",
                latitude: 13.02323,
                lokasiToko: "Pandeglang",
                longitude: 12,
                namaCabang: "Cabang Pusat",
                namaToko: "Butik Batik",
                nominal: 48000000,
                nomorTelepon: "7453312423",
                owner: "mitra@gmail.com",
                pengadaan: 8,
                periodePengadaanAkhir: "2021-11-24",
                periodePengadaanMulai: "2021-10-08",
                pk: 2,
                status: "TRM",
                statusProyek: "MPA",
                timestamp: "2021-10-05T21:41:03.259360+07:00",
                tipeUsaha: "Butik",
                toko: 2,
                totalBiaya: 48000000,
            }
        }

        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DetailInvestasi isAuthenticated={mockAuthenticate} user={mockUser} location={location} />
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
        const mockUser = jest.fn();
        const mockAuthenticate = jest.fn();
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                }
            }
        }
        const location = {
            state:{
                daerah: "Pandeglang",
                kuantitas: 4,
                mainan: {id: 1, namaMainan: 'Kiddie Ride Submarine', deskripsiMainan: 'Mainan tunggangan dengan bentuk kapal selam dan tema Spongebob', harga: 12000000, gambarMainan: 'http://walkiddie.cs.ui.ac.id/media/mainan/media/pngfind-2.png'},
                danaTerkumpul: 0,
                deskripsiToko: "-" ,
                estimasiKeuangan: "-",
                files: {0: "http://walkiddie.cs.ui.ac.id/media/toko/pengadaan/43abc7d2001a73e59225f27324c4a40a_600x400_XcBC0hY.png"},
                fotoProfilToko: "http://walkiddie.cs.ui.ac.id/media/toko/profil/media/2616963971.jpg",
                investor: "investor@gmail.com",
                latitude: 13.02323,
                lokasiToko: "Pandeglang",
                longitude: 12,
                namaCabang: "Cabang Pusat",
                namaToko: "Butik Batik",
                nominal: 48000000,
                nomorTelepon: "7453312423",
                owner: "mitra@gmail.com",
                pengadaan: 8,
                periodePengadaanAkhir: "2021-11-24",
                periodePengadaanMulai: "2021-10-08",
                pk: 2,
                status: "TRM",
                statusProyek: "MPA",
                timestamp: "2021-10-05T21:41:03.259360+07:00",
                tipeUsaha: "Butik",
                toko: 2,
                totalBiaya: 48000000,
            }
        }

        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DetailInvestasi isAuthenticated={mockAuthenticate} user={mockUser} location={location} />
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

})
