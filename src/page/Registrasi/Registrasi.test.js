import Registrasi from './Registrasi';
import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter,Route } from 'react-router-dom'
import { Provider } from 'react-redux' 
import axios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Registrasi />', () => {

    it('renders the right contents', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Nama Depan/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama Belakang/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Kata Sandi/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Konfirmasi kata sandi/)).toBeInTheDocument();
    });

    it('renders correctly', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi role="Investor" signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Buat Akun Baru/)).toBeInTheDocument();
        expect(getByText(/Investor/)).toBeInTheDocument();
    });

    it('renders correctly', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi role="Mitra" signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Buat Akun Baru/)).toBeInTheDocument();
        expect(getByText(/Mitra/)).toBeInTheDocument();
    });

    it('should redirect if authenticated', () => {
        let loc;
        const mockSignUp = jest.fn()
        const initialState = { auth: {isAuthenticated: true}}
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Registrasi signup={mockSignUp} isAuthenticated={true}/>
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(loc.pathname).toBe('/');
      })
    

    test('button should have the corrrect link', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
            </BrowserRouter>
        </Provider>);
        expect(getByText('Masuk disini')).toHaveAttribute("href", '/masuk');
    });

    test('useState Function testing', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
            
        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'MyAwesome123');
        userEvent.type(re_password, 'MyAwesome123');
        
        expect(screen.getByLabelText('Nama Depan')).toHaveValue('doe');
        expect(screen.getByLabelText('Nama Belakang')).toHaveValue('joe');
        expect(screen.getByLabelText('Email')).toHaveValue('doe@joe.com');
        expect(screen.getByLabelText('Kata Sandi')).toHaveValue('MyAwesome123');
        expect(screen.getByLabelText('Konfirmasi kata sandi')).toHaveValue('MyAwesome123');
    });

    test('submit through form', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
            
        const signupData = {
             data: {
                first_name: "Udma", 
                last_name: "Wijaya", 
                role: "Investor", 
                email: "ajiinisti12@gmail.com", 
                id: 1
            } 
        }

        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        
        axios.post.mockImplementationOnce(() => Promise.resolve(signupData));
        
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'MyAwesome123');
        userEvent.type(re_password, 'MyAwesome123');
        userEvent.click(screen.getByText('Buat Akun'));

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('Fail submit through form', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
            
        const signupData = {
             data: {
                first_name: "Udma", 
                last_name: "Wijaya", 
                role: "Investor", 
                email: "ajiinisti12@gmail.com", 
                id: 1
            } 
        }

        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        
        axios.post.mockImplementationOnce(() => Promise.reject(signupData));
        
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'MyAwesome123');
        userEvent.type(re_password, 'MyAwesome123');
        userEvent.click(screen.getByText('Buat Akun'));

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('back button work correctly', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}

        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => { });

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Buat Akun Baru', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })
    
    test('Fail SignUp Password Not Same', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()    
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
            
        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'MyAwesome123');
        userEvent.type(re_password, 'AwesomeMy123');
        userEvent.click(screen.getByText('Buat Akun'));
    });

    test('Fail SignUp Password to similar', () => {
        const mockSignUp = jest.fn()
        const mockAuthenticate = jest.fn()    
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Registrasi signup={mockSignUp} isAuthenticated={mockAuthenticate}/>
                </BrowserRouter>
            </Provider>);
            
        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'doejoe123');
        userEvent.type(re_password, 'doejoe123');
        userEvent.click(screen.getByText('Buat Akun'));
    });
});
