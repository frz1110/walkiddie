import MembuatPendapatan from './MembuatPendapatan';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<MembuatPendapatan />', () => {
    it('renders correctly', () => {
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

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <MembuatPendapatan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        expect(getByText(/Buat Pendapatan Toko/)).toBeInTheDocument();
    });

    it('renders the right contents', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MembuatPendapatan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByLabelText(/Tanggal Pendapatan/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Jumlah Pendapatan/)).toBeInTheDocument();
    });

    it('should redirect if not authenticated', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = { auth: { isAuthenticated: false } }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MembuatPendapatan userData={mockUser} isAuthenticated={false} />
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

    it('should redirect if not mitra', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Operator"
                }
            }
        }
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MembuatPendapatan userData={mockUser} isAuthenticated={false} />
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

    test('useState Function testing', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: { isAuthenticated: true } }
        const store = mockStore(initialState)

        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <MembuatPendapatan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);

        const tanggal_pendapatan = getByLabelText('Tanggal Pendapatan');
        const jumlah_pendapatan = getByLabelText('Jumlah Pendapatan');

        userEvent.type(tanggal_pendapatan, '2021-03-21');
        userEvent.type(jumlah_pendapatan, '100000');

        expect(screen.getByLabelText('Tanggal Pendapatan')).toHaveValue('2021-03-21');
        expect(screen.getByLabelText('Jumlah Pendapatan')).toHaveValue('100000');
    });

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
                    <MembuatPendapatan userData={mockUser} isAuthenticated={mockAuthenticate} />
                </BrowserRouter>
            </Provider>);
        const backButton = getByText('Buat Pendapatan Toko', { selector: "h3" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })

});