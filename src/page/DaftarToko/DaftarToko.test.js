import DaftarToko from './DaftarToko'
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
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
        expect(screen.getByText("Simpan")).toBeInTheDocument();
    });

    it('should redirect if not Mitra', () => {
        let loc;
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
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
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
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
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

    test('submit toko through form', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                },
                refresh: 'token',
                access: 'access'
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText, queryByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
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
                totalBiaya: '1000000',
                periodePengadaanMulai: '2021-04-30',
                periodePengadaanAkhir: '2021-05-26',
                estimasiKeuangan: 'ROI'
            }
        }

        axios.post.mockImplementationOnce(() => Promise.resolve(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const totalBiaya = getByLabelText(/Total Biaya/);
        const mediaToko = getByRole('mediatoko');
        const estimasiKeuangan = getByLabelText(/Estimasi Keuangan/);
        const mySelectComponent = queryByTestId('select-paket-mainan');
        const startDate = getByPlaceholderText("Tanggal Mulai Pengadaan");
        const endDate = getByPlaceholderText("Tanggal Akhir Pengadaan");
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.type(estimasiKeuangan, "ROI");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await(() => getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.click(getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.change(totalBiaya, { target: { value: "1000000" } });
        expect(totalBiaya.value).toBe("1000000");

        fireEvent.click(startDate);
        startDate.focus()
        expect(startDate).toHaveFocus() 
        fireEvent.change(startDate, { target: { value: "2021-04-30" } });
        
        fireEvent.click(endDate);
        endDate.focus()
        expect(endDate).toHaveFocus() 
        fireEvent.change(endDate, { target: { value: "2021-05-26" } });

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
    });

    test('submit toko through form do not have access', async() => {
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
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText, queryByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
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
                totalBiaya: '1000000',
                periodePengadaanMulai: '2021-04-30',
                periodePengadaanAkhir: '2021-05-26',
                estimasiKeuangan: 'ROI'
            }
        }

        axios.post.mockImplementationOnce(() => Promise.resolve(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const totalBiaya = getByLabelText(/Total Biaya/);
        const mediaToko = getByRole('mediatoko');
        const estimasiKeuangan = getByLabelText(/Estimasi Keuangan/);
        const mySelectComponent = queryByTestId('select-paket-mainan');
        const startDate = getByPlaceholderText("Tanggal Mulai Pengadaan");
        const endDate = getByPlaceholderText("Tanggal Akhir Pengadaan");
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.type(estimasiKeuangan, "ROI");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        fireEvent.click(getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.change(totalBiaya, { target: { value: "1000000" } });
        expect(totalBiaya.value).toBe("1000000");

        fireEvent.click(startDate);
        startDate.focus()
        expect(startDate).toHaveFocus() 
        fireEvent.change(startDate, { target: { value: "2021-04-30" } });
        
        fireEvent.click(endDate);
        endDate.focus()
        expect(endDate).toHaveFocus() 
        fireEvent.change(endDate, { target: { value: "2021-05-26" } });

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
    });

    test('submit toko through form get failed', async() => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Mitra"
                },
                refresh: 'token',
                access: 'access'
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState);
        const { getByLabelText, getByRole , getByText, queryByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        const files = [
            new File(['bebekslamet1'], 'bebekslamet1.png', { type: 'image/png' }),
            new File(['bebekslamet2'], 'bebekslamet2.png', { type: 'image/png' })
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
                totalBiaya: '1000000',
                periodePengadaanMulai: '2021-04-30',
                periodePengadaanAkhir: '2021-05-26',
                estimasiKeuangan: 'ROI'
            }
        }

        axios.post.mockImplementationOnce(() => Promise.reject(tokoData));

        const namaToko = getByLabelText(/Nama Toko/);
        const namaCabang = getByLabelText(/Nama Cabang/);
        const tipeUsaha = getByLabelText(/Tipe Usaha/);
        const nomorTelepon = getByLabelText(/Nomor Telepon/);
        const deskripsiToko = getByLabelText(/Deskripsi Toko/);
        const lokasiToko = getByLabelText(/Lokasi Toko/);
        const totalBiaya = getByLabelText(/Total Biaya/);
        const mediaToko = getByRole('mediatoko');
        const estimasiKeuangan = getByLabelText(/Estimasi Keuangan/);
        const mySelectComponent = queryByTestId('select-paket-mainan');
        const startDate = getByPlaceholderText("Tanggal Mulai Pengadaan");
        const endDate = getByPlaceholderText("Tanggal Akhir Pengadaan");
        const tombolSimpan = getByText("Simpan");

        userEvent.type(namaToko, "Bebek slamet");
        userEvent.type(namaCabang, "Utama");
        userEvent.type(tipeUsaha, "Restoran");
        userEvent.type(nomorTelepon, "089876548796");
        userEvent.type(lokasiToko, "Margonda");
        userEvent.type(deskripsiToko, "Jual bebek");
        userEvent.type(estimasiKeuangan, "ROI");
        userEvent.upload(mediaToko, mediaToko,files);

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await(() => getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.click(getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.change(totalBiaya, { target: { value: "1000000" } });
        expect(totalBiaya.value).toBe("1000000");

        fireEvent.click(startDate);
        startDate.focus()
        expect(startDate).toHaveFocus() 
        fireEvent.change(startDate, { target: { value: "2021-04-30" } });
        
        fireEvent.click(endDate);
        endDate.focus()
        expect(endDate).toHaveFocus() 
        fireEvent.change(endDate, { target: { value: "2021-05-26" } });

        fireEvent.click(tombolSimpan);

        await(()=> expect(axios.post).toHaveBeenCalledTimes(1));
        localStorage.removeItem('access', 'token')
    });

    it('should call onChange on all option', async () => {
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
        const { getByText, queryByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const mySelectComponent = queryByTestId('select-paket-mainan');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await(() => getByText('Paket A (2 kiddie ride + 1 claw machine)'));
        fireEvent.click(getByText('Paket A (2 kiddie ride + 1 claw machine)'));

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await(() => getByText('Paket B (2 kiddie ride )'));
        fireEvent.click(getByText('Paket B (2 kiddie ride )'));

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await(() => getByText('Paket C (1 kiddie ride + 1 claw machine)'));
        fireEvent.click(getByText('Paket C (1 kiddie ride + 1 claw machine)'));
    });

    it('test datepicker', async () => {
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
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const startDate = getByPlaceholderText("Tanggal Mulai Pengadaan");
        const endDate = getByPlaceholderText("Tanggal Akhir Pengadaan");

        fireEvent.click(startDate);
        startDate.focus()
        expect(startDate).toHaveFocus() 
        fireEvent.change(startDate, { target: { value: "29 Oct, 2020" } });
        expect(startDate.value).toBe("29 Oct, 2020");
        
        fireEvent.click(endDate);
        endDate.focus()
        expect(endDate).toHaveFocus() 
        fireEvent.change(endDate, { target: { value: "30 Oct, 2020" } });
        expect(endDate.value).toBe("30 Oct, 2020");

    });

    it('test datepicker null', async () => {
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
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DaftarToko user={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const startDate = getByPlaceholderText("Tanggal Mulai Pengadaan");
        const endDate = getByPlaceholderText("Tanggal Akhir Pengadaan");

        fireEvent.click(startDate);
        startDate.focus()
        expect(startDate).toHaveFocus() 
        fireEvent.change(startDate, { target: { value: null } });
        expect(startDate.value).toBe("");
        
        fireEvent.click(endDate);
        endDate.focus()
        expect(endDate).toHaveFocus() 
        fireEvent.change(endDate, { target: { value: null } });
        expect(endDate.value).toBe("");
    });
});