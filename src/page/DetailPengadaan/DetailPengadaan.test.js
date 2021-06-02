import DetailPengadaan from './DetailPengadaan';
import { render } from '@testing-library/react';
import axios from 'axios'
import { Route } from 'react-router-dom'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'


jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<DetailPengadaan />', () => {

    it('renders the right contents', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
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
                    <DetailPengadaan isAuthenticated={mockAuthenticate} userData={mockUser} match={mockMatch} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Kembali/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
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
                    <DetailPengadaan isAuthenticated={false} userData={mockUser} match={mockMatch} />
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

    it('should redirect if not investor', () => {
        let loc;
        const mockUser = jest.fn()
        const mockMatch = {
            params: {
                pk: 1
            }
        }
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
                    <DetailPengadaan isAuthenticated={true} userData={mockUser} match={mockMatch} />
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

    // it('fetches successfully data from an API', async () => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const mockMatch = {
    //         params : {
    //             pk : 1
    //         }
    //     }
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Mitra"
    //             }
    //         }
    //     }

    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState)
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <DetailPengadaan isAuthenticated={mockAuthenticate} userData={mockUser} match={mockMatch} />
    //             </BrowserRouter>
    //         </Provider>);

    //     const tokoData = {
    //         data: {
    //             daerah: "Jakarta",
    //             deskripsiToko: "Kalau ngomongin Bebek H. Slamet, yang terlintas di memori saya adalah daging bebeknya yang tebal dan ngga ala kadarnya kaya warung-warung bebek goreng pinggir jalan. Sambal korek andalannya juga mantap banget, sayang kadang ngasihnya cuma dikit banget, ngga imbang sama bebek gorengnya, bebek gorengnya masih banyak sambelnya udah raib duluan haha...",
    //             fotoProfilToko: "http://localhost:8000/media/none.jpg",
    //             latitude: -6.193125,
    //             lokasiToko: "Condet, Jakarta Timur",
    //             longitude: 106.82181,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Resto Bebek H.Slamet",
    //             nomorTelepon: "081382222504",
    //             owner: "jflows1012@gmail.com",
    //             pk: 1,
    //             tipeUsaha: "Restoran"
    //         }
    //     }

    //     axios.get.mockImplementationOnce(() => Promise.resolve(tokoData));
    //     localStorage.removeItem('access', 'token')
    // });

    // it('fetches unsuccessfully data from an API', async () => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const mockMatch = {
    //         params : {
    //             pk : 1
    //         }
    //     }
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Mitra"
    //             }
    //         }
    //     }

    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState)
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <DetailPengadaan isAuthenticated={mockAuthenticate} userData={mockUser} match={mockMatch} />
    //             </BrowserRouter>
    //         </Provider>);

    //     const tokoData = {
    //         data: {
    //             daerah: "Jakarta",
    //             deskripsiToko: "Kalau ngomongin Bebek H. Slamet, yang terlintas di memori saya adalah daging bebeknya yang tebal dan ngga ala kadarnya kaya warung-warung bebek goreng pinggir jalan. Sambal korek andalannya juga mantap banget, sayang kadang ngasihnya cuma dikit banget, ngga imbang sama bebek gorengnya, bebek gorengnya masih banyak sambelnya udah raib duluan haha...",
    //             fotoProfilToko: "http://localhost:8000/media/none.jpg",
    //             latitude: -6.193125,
    //             lokasiToko: "Condet, Jakarta Timur",
    //             longitude: 106.82181,
    //             namaCabang: "Cabang Maros 05",
    //             namaToko: "Resto Bebek H.Slamet",
    //             nomorTelepon: "081382222504",
    //             owner: "jflows1012@gmail.com",
    //             pk: 1,
    //             tipeUsaha: "Restoran"
    //         }
    //     }

    //     axios.get.mockImplementationOnce(() => Promise.reject(tokoData));
    //     localStorage.removeItem('access', 'token')
    // });


})
