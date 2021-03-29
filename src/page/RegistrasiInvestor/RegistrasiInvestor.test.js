import RegistrasiInvestor from './RegistrasiInvestor';
import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'


describe('<RegistrasiInvestor />', () => {
    it('renders the right contents', () => {
        render(
            <BrowserRouter>
            <RegistrasiInvestor/>
            </BrowserRouter>
            );

        expect(screen.getByLabelText(/Nama Depan/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama Belakang/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Kata Sandi/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Konfirmasi kata sandi/)).toBeInTheDocument();
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
            <RegistrasiInvestor/>
            </BrowserRouter>
            );
        expect(getByText(/Buat Akun Baru Investor/)).toBeInTheDocument();
    });


    test('button should have the corrrect link', () => {
        const { getByText } = render(
        <BrowserRouter>
        <RegistrasiInvestor />
        </BrowserRouter>);
        expect(getByText('Masuk disini')).toHaveAttribute("href", '/login');
    });

    test('useState Function testing', () => {
        //Rendering the component and its tree
        const { getByLabelText } = render(
            <BrowserRouter>
            <RegistrasiInvestor />
            </BrowserRouter>);
        //Extracting the child, username_input component with his accessibilityLabel
        const nama_depan = getByLabelText('Nama Depan');
        const nama_belakang = getByLabelText('Nama Belakang');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const re_password = getByLabelText('Konfirmasi kata sandi');
        //Fire a native changeText event with a specific value
        userEvent.type(nama_depan, "doe");
        userEvent.type(nama_belakang, 'joe');
        userEvent.type(email, 'doe@joe.com');
        userEvent.type(password, 'MyAwesome123');
        userEvent.type(re_password, 'MyAwesome123');
        //Checking the rendered value 
        expect(screen.getByLabelText('Nama Depan')).toHaveValue('doe');
        expect(screen.getByLabelText('Nama Belakang')).toHaveValue('joe');
        expect(screen.getByLabelText('Email')).toHaveValue('doe@joe.com');
        expect(screen.getByLabelText('Kata Sandi')).toHaveValue('MyAwesome123');
        expect(screen.getByLabelText('Konfirmasi kata sandi')).toHaveValue('MyAwesome123');
      });
});
