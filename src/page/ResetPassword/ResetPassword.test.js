import ResetPassword from './ResetPassword';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../store';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

jest.mock('axios')

describe('<ResetPassword />', () => {
    it('renders the right contents', () => {
        const mockResetPassword = jest.fn()
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPassword reset_password={mockResetPassword} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Lupa Kata Sandi/)).toBeInTheDocument();
    });

    it('should redirect after reset', () => {
        let loc;
        const mockResetPassword = jest.fn()
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPassword reset_password={mockResetPassword} />
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
        const email = screen.getByLabelText(/Email/);
        userEvent.type(email, "adhytiawanaputra@gmail.com");

        userEvent.click(screen.getByText('Kirim'));
        expect(loc.pathname).toBe('/');
    })

});
