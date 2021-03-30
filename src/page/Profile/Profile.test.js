import Profile from './Profile';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Profile />', () => {
    it('renders correctly', () => {
        const { getByText } = render(<BrowserRouter><Profile /></BrowserRouter>);
        expect(getByText(/Ubah Profile/)).toBeInTheDocument();
    });

    it('renders the right contents', () => {
        render(<BrowserRouter><Profile /></BrowserRouter>);
        expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama Lengkap/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor Handphone/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Kata Sandi/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor KTP/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tanggal Lahir/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Alamat Lengkap/)).toBeInTheDocument();
    });

    test('useState Function testing', () => {
        const { getByLabelText } = render(<BrowserRouter><Profile /></BrowserRouter>);

        const username = getByLabelText('Username');
        const nama_lengkap = getByLabelText('Nama Lengkap');
        const email = getByLabelText('Email');
        const password = getByLabelText('Kata Sandi');
        const nomor_handphone = getByLabelText('Nomor Handphone');
        const nomor_KTP = getByLabelText('Nomor KTP');
        const tanggal_lahir = getByLabelText('Tanggal Lahir');
        const alamat_lengkap = getByLabelText('Alamat Lengkap');

        userEvent.type(username, "username12345");
        userEvent.type(nama_lengkap, 'User Anon');
        userEvent.type(email, 'user12345@gmail.com');
        userEvent.type(password, 'useruser123');
        userEvent.type(nomor_handphone, '081316086814');
        userEvent.type(nomor_KTP, '1234567899876543');
        userEvent.type(tanggal_lahir, '2021-03-21');
        userEvent.type(alamat_lengkap, 'Jakarta Timur');

        expect(screen.getByLabelText('Username')).toHaveValue('username12345');
        expect(screen.getByLabelText('Nama Lengkap')).toHaveValue('User Anon');
        expect(screen.getByLabelText('Email')).toHaveValue('user12345@gmail.com');
        expect(screen.getByLabelText('Kata Sandi')).toHaveValue('useruser123');
        expect(screen.getByLabelText('Nomor Handphone')).toHaveValue('081316086814');
        expect(screen.getByLabelText('Nomor KTP')).toHaveValue('1234567899876543');
        expect(screen.getByLabelText('Tanggal Lahir')).toHaveValue('2021-03-21');
        expect(screen.getByLabelText('Alamat Lengkap')).toHaveValue('Jakarta Timur');

    });
    
});