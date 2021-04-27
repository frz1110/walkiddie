import DaftarToko from './DaftarToko'
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, EnzymeAdapter } from 'enzyme';
import { DateRangePicker } from 'react-dates';
import { render, screen } from '@testing-library/react';
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
        expect(screen.getByLabelText(/Total Biaya pengadaan/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Estimasi Keuangan/)).toBeInTheDocument();
    });

    test('submit toko through form', () => {
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
        const { getByLabelText, getByRole, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' }),
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
                mediaTokoList: files,
                paketMainan: 'PaketA',
                totalBiaya: '900000',
                periodePengadaanMulai: '2021-04-30',
                periodePengadaanAkhir: '2021-05-26',
                estimasiKeuangan: 'ROI'
            }
        }

        const nama_toko = getByLabelText(/Nama Toko/);
        const nama_cabang = getByLabelText(/Nama Cabang/);
        const tipe_usaha = getByLabelText(/Tipe Usaha/);
        const nomor_telepon = getByLabelText(/Nomor Telepon/);
        const deskripsi_toko = getByLabelText(/Deskripsi Toko/);
        const lokasi_toko = getByLabelText(/Lokasi Toko/);
        const media_toko = getByRole('mediatoko');
        const paket_mainan = getByTestId('select-paket-mainan');
        const estimasi_keuangan = getByLabelText(/Estimasi Keuangan/);

        axios.post.mockImplementationOnce(() => Promise.resolve(tokoData));

        userEvent.type(nama_toko, "Bebek slamet");
        userEvent.type(nama_cabang, "Utama");
        userEvent.type(tipe_usaha, "Restoran");
        userEvent.type(nomor_telepon, "089876548796");
        userEvent.type(lokasi_toko, "Jual bebek");
        userEvent.type(deskripsi_toko, "Margonda");
        userEvent.upload(media_toko, media_toko, files);
        userEvent.selectOptions(paket_mainan, ['PaketA'])
        userEvent.type(estimasi_keuangan, "ROI");


        userEvent.click(screen.getByText('Simpan'));

        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});


// describe('<Daftar Toko />', () => {
//     it('renders form', () => {
//         render(
//             <BrowserRouter>
//                 <DaftarToko />
//             </BrowserRouter>);

//         expect(screen.getByLabelText(/Nama Toko/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Nama Cabang/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Tipe Usaha/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Nomor Telepon/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Deskripsi Toko/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Lokasi Toko/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Total Biaya pengadaan/)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Estimasi Keuangan/)).toBeInTheDocument();
//     });

//     // test('datepicker ', () => {
//     //     const onDatesChange = jest.fn()
//     //     const component = shallow(
//     //         <BrowserRouter>
//     //             <DaftarToko />
//     //                 <DateRangePicker onDatesChange={onDatesChange}/>
//     //         </BrowserRouter>);

//     //     const dayPickers = component.find('DateRangePicker')
//     //     dayPickers.at(0).prop('onDatesChange')('date1')

//     //     component.find('Form').simulate('submit')
//     //     expect(onDateChange).toHaveBeenCalledWith('date1')
//     // })

//     test('testDate', () => {

//     })

//     test('useState Function testing', () => {
//         const { getByLabelText } = render(
//             <BrowserRouter>
//                 <DaftarToko />
//             </BrowserRouter>);

//         const namaToko = getByLabelText(/Nama Toko/);
//         const namaCabang = getByLabelText(/Nama Cabang/);
//         const tipeUsaha = getByLabelText(/Tipe Usaha/);
//         const nomorTelepon = getByLabelText(/Nomor Telepon/);
//         const deskripsiToko = getByLabelText(/Deskripsi Toko/);
//         const lokasiToko = getByLabelText(/Lokasi Toko/);
//         const estimasiKeuangan = getByLabelText(/Estimasi Keuangan/);

//         userEvent.type(namaToko, 'Toko Serba Ada');
//         userEvent.type(namaCabang, 'Cabang Tanah Baru');
//         userEvent.type(tipeUsaha, 'Toko Baju');
//         userEvent.type(nomorTelepon, '081234567890');
//         userEvent.type(deskripsiToko, 'Menjual Jaket dan Pakaian Pria');
//         userEvent.type(lokasiToko, 'Jl. Tanah Baru');
//         userEvent.type(estimasiKeuangan, '+- 100 pengunjung/hari');

//         expect(screen.getByLabelText(/Nama Toko/)).toHaveValue('Toko Serba Ada');
//         expect(screen.getByLabelText(/Nama Cabang/)).toHaveValue('Cabang Tanah Baru');
//         expect(screen.getByLabelText(/Tipe Usaha/)).toHaveValue('Toko Baju');
//         expect(screen.getByLabelText(/Nomor Telepon/)).toHaveValue(parseInt('81234567890', 10));
//         expect(screen.getByLabelText(/Deskripsi Toko/)).toHaveValue('Menjual Jaket dan Pakaian Pria');
//         expect(screen.getByLabelText(/Lokasi Toko/)).toHaveValue('Jl. Tanah Baru');
//         expect(screen.getByLabelText(/Estimasi Keuangan/)).toHaveValue('+- 100 pengunjung/hari');
//     });
// });
