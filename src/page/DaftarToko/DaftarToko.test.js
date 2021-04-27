import DaftarToko from './DaftarToko'
import { render,screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { shallow, EnzymeAdapter } from 'enzyme';
import { DateRangePicker } from 'react-dates';

describe('<Daftar Toko />',() => {
    it('renders form', () => {
        render(
            <BrowserRouter>
                <DaftarToko />
            </BrowserRouter>);

        expect(screen.getByLabelText(/Nama Toko/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama Cabang/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tipe Usaha/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nomor Telepon/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Deskripsi Toko/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Lokasi Toko/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Total Biaya pengadaan/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Estimasi Keuangan/)).toBeInTheDocument();
    });

    // test('datepicker ', () => {
    //     const onDatesChange = jest.fn()
    //     const component = shallow(
    //         <BrowserRouter>
    //             <DaftarToko />
    //                 <DateRangePicker onDatesChange={onDatesChange}/>
    //         </BrowserRouter>);

    //     const dayPickers = component.find('DateRangePicker')
    //     dayPickers.at(0).prop('onDatesChange')('date1')

    //     component.find('Form').simulate('submit')
    //     expect(onDateChange).toHaveBeenCalledWith('date1')
    // })

    test('testDate' , () => {

    })

    test('useState Function testing', () => {
        const { getByLabelText } = render(
                <BrowserRouter>
                    <DaftarToko />
                </BrowserRouter>);
            
        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const estimasiKeuangan = getByLabelText(/Estimasi Keuangan/);
        
        userEvent.type(namaToko, 'Toko Serba Ada');
        userEvent.type(namaCabang, 'Cabang Tanah Baru');
        userEvent.type(tipeUsaha, 'Toko Baju');
        userEvent.type(nomorTelepon, '081234567890');
        userEvent.type(deskripsiToko, 'Menjual Jaket dan Pakaian Pria');
        userEvent.type(lokasiToko, 'Jl. Tanah Baru');
        userEvent.type(estimasiKeuangan, '+- 100 pengunjung/hari');
        
        expect(screen.getByLabelText(/Nama Toko/)).toHaveValue('Toko Serba Ada');
        expect(screen.getByLabelText(/Nama Cabang/)).toHaveValue('Cabang Tanah Baru');
        expect(screen.getByLabelText(/Tipe Usaha/)).toHaveValue('Toko Baju');
        expect(screen.getByLabelText(/Nomor Telepon/)).toHaveValue(parseInt('81234567890',10));
        expect(screen.getByLabelText(/Deskripsi Toko/)).toHaveValue('Menjual Jaket dan Pakaian Pria');
        expect(screen.getByLabelText(/Lokasi Toko/)).toHaveValue('Jl. Tanah Baru');
        expect(screen.getByLabelText(/Estimasi Keuangan/)).toHaveValue('+- 100 pengunjung/hari');
    });
});