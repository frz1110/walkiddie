import HomepagePemilikToko from './HomepagePemilikToko';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<HomepagePemilikToko />', () => {

    it('renders the right contents', () => {
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
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomepagePemilikToko isAuthenticated={mockAuthenticate} user={mockUser} />
                </BrowserRouter>
            </Provider>);

        // expect(screen.getByText(/Daftar Toko/)).toBeInTheDocument();
        expect(screen.getByText(/Daftar Pengadaan/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });
})