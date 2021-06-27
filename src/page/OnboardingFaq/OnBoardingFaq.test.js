import OnboardingFaq from './OnboardingFaq';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<OnboardingFaq />', () => {

    it('renders the right contents for Investor', () => {
        const mockUser = jest.fn()
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
                    <OnboardingFaq user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Halo! Ada yang bisa kami bantu?/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    it('renders the right contents for Mitra', () => {
        const mockUser = jest.fn()
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
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <OnboardingFaq user={mockUser} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Halo! Ada yang bisa kami bantu?/)).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });
})