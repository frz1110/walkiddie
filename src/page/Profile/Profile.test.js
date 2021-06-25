import Profile from './Profile';
import { update_profile } from '../../actions/auth';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Profile />', () => {
    it('renders correctly', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }
        const store = mockStore(initialState)

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Ubah Profil/)).toBeInTheDocument();
    });

    it('renders the right contents', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Nama Lengkap/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor Handphone/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Posisi/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor KTP/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tanggal Lahir/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Alamat Lengkap/)).toBeInTheDocument();
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = { auth: { isAuthenticated: false } }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={false} />
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

    test('useState Function testing', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }
        const store = mockStore(initialState)

        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const nomor_handphone = getByLabelText('Nomor Handphone');
        const nomor_KTP = getByLabelText('Nomor KTP');
        const tanggal_lahir = getByLabelText('Tanggal Lahir');
        const alamat_lengkap = getByLabelText('Alamat Lengkap');

        userEvent.type(nomor_handphone, '081316086814');
        userEvent.type(nomor_KTP, '1234567899876543');
        userEvent.type(tanggal_lahir, '2021-03-21');
        userEvent.type(alamat_lengkap, 'Jakarta Timur');

        expect(screen.getByLabelText('Nomor Handphone')).toHaveValue('081316086814');
        expect(screen.getByLabelText('Nomor KTP')).toHaveValue('1234567899876543');
        expect(screen.getByLabelText('Tanggal Lahir')).toHaveValue('2021-03-21');
        expect(screen.getByLabelText('Alamat Lengkap')).toHaveValue('Jakarta Timur');
    });

    test('submit through form', () => {
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
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)

        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const file = new File(['user'], 'user.png', { type: 'image/png' })

        const profileData = {
            data: {
                email: "user12345@gmail.com",
                full_name: "User Anon",
                address: "Jakarta Timur",
                phone_number: "081316086814",
                ktp_number: "1234567899876543",
                birth_date: "2021-03-21",
                profile_picture: file
            }
        }

        const nama_lengkap = getByLabelText('Nama Lengkap');
        const email = getByLabelText('Email');
        const nomor_handphone = getByLabelText('Nomor Handphone');
        const nomor_KTP = getByLabelText('Nomor KTP');
        const tanggal_lahir = getByLabelText('Tanggal Lahir');
        const alamat_lengkap = getByLabelText('Alamat Lengkap');
        const profile_picture = getByLabelText('Foto Profil');

        axios.post.mockImplementationOnce(() => Promise.resolve(profileData));

        userEvent.type(nama_lengkap, 'User Anon');
        userEvent.type(email, 'user12345@gmail.com');
        userEvent.type(nomor_handphone, '081316086814');
        userEvent.type(nomor_KTP, '1234567899876543');
        userEvent.type(tanggal_lahir, '2021-03-21');
        userEvent.type(alamat_lengkap, 'Jakarta Timur');
        userEvent.click(screen.getByAltText("change icon"));
        userEvent.upload(profile_picture, profile_picture, file);
        userEvent.click(screen.getByText('Simpan'));

        expect(axios.post).toHaveBeenCalledTimes(1);
        localStorage.removeItem('access', 'token')
    });

    test('Fail submit through form', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const profileData = {
            data: {
                email: "user12345@gmail.com",
                full_name: "User Anon",
                address: "Jakarta Timur",
                phone_number: "081316086814",
                ktp_number: "1234567899876543",
                birth_date: "2021-03-21"
            }
        }

        const nama_lengkap = getByLabelText('Nama Lengkap');
        const email = getByLabelText('Email');
        const nomor_handphone = getByLabelText('Nomor Handphone');
        const nomor_KTP = getByLabelText('Nomor KTP');
        const tanggal_lahir = getByLabelText('Tanggal Lahir');
        const alamat_lengkap = getByLabelText('Alamat Lengkap');

        axios.post.mockImplementationOnce(() => Promise.reject(profileData));

        userEvent.type(nama_lengkap, 'User Anon');
        userEvent.type(email, 'user12345@gmail.com');
        userEvent.type(nomor_handphone, '081316086814');
        userEvent.type(nomor_KTP, '1234567899876543');
        userEvent.type(tanggal_lahir, '2021-03-21');
        userEvent.type(alamat_lengkap, 'Jakarta Timur');
        userEvent.click(screen.getByText('Simpan'));

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('update through form', () => {
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
                    role: "Investor"
                }
            }
        }
        const store = mockStore(initialState)

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const file = new File(['user'], 'user.png', { type: 'image/png' })

        const profileData = {
            data: {
                email: "user12345@gmail.com",
                full_name: "User Anon",
                address: "Jakarta Timur",
                phone_number: "081316086814",
                ktp_number: "1234567899876543",
                birth_date: "2021-03-21",
                profile_picture: file
            }
        }

        axios.put.mockImplementationOnce(() => Promise.resolve(profileData));

        update_profile("user12345@gmail.com", "User Anon", "Jakarta Timur", "081316086814", "1234567899876543", "2021-03-21", file, true)

        expect(axios.put).toHaveBeenCalledTimes(1);
    });

    test('fail update through form', () => {
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
                    role: "Investor"
                }
            }
        }
        const store = mockStore(initialState)

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const file = new File(['user'], 'user.png', { type: 'image/png' })

        const profileData = {
            data: {
                email: "user12345@gmail.com",
                full_name: "User Anon",
                address: "Jakarta Timur",
                phone_number: "none",
                ktp_number: "1234567899876543",
                birth_date: "2021-03-21",
                profile_picture: file
            }
        }

        axios.put.mockImplementationOnce(() => Promise.reject(profileData));

        update_profile("user12345@gmail.com", "User Anon", "Jakarta Timur", "none", "1234567899876543", "2021-03-21", file, true)

        expect(axios.put).toHaveBeenCalledTimes(1);
    });

    // it('fetches successfully data from an API', async () => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     localStorage.setItem('access', 'token')
    //     const initialState = { 
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 email: "jflows1012@gmail.com",
    //                 first_name: "ihsan",
    //                 last_name: "azizi",
    //                 role: "Investor"
    //             }
    //         }
    //     }
    //     const store = mockStore(initialState)
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
    //             </BrowserRouter>
    //         </Provider>);

    //     const profileData = {
    //         data: {
    //             email: "jflows1012@gmail.com",
    //             full_name: "ihsan azizi",
    //             address: "Jakarta Timur",
    //             phone_number: "081316086814",
    //             ktp_number: "1234567899876543",
    //             birth_date: "2021-03-21"
    //         }
    //     }

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //         }
    //     };

    //     var mock = new MockAdapter(axios);

    //     mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/${email}`, config).reply(200, profileData.data);
    //     localStorage.removeItem('access', 'token')
    // });

    test('back button work correctly', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }

        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => { });

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Ubah Profil', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })

});