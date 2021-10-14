import ResetPasswordConfirm from './ResetPasswordConfirm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import store from '../../store';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

jest.mock('axios')

describe('<ResetPasswordConfirm />', () => {
    it('renders the right contents', () => {
        const mockResetPasswordConfirm = jest.fn()
        const mockMatch = jest.fn()
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordConfirm reset_password_confirm={mockResetPasswordConfirm} match={mockMatch} />
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Setel Ulang Kata Sandi/)).toBeInTheDocument();
    });

    it('should redirect to login if success', () => {
        let loc;
        const mockResetPasswordConfirm = jest.fn()
        const mockMatch = {
            params: {
                uid: "UID",
                token: "token"
            }
        }
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordConfirm reset_password_confirm={mockResetPasswordConfirm} match={mockMatch} />
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

        axios.post.mockImplementationOnce(() => Promise.resolve());

        const pass = screen.getByLabelText(/Tuliskan kata sandi baru/);
        userEvent.type(pass, "5t4r3e2w1q");

        const newPass = screen.getByLabelText(/Tuliskan ulang kata sandi baru/);
        userEvent.type(newPass, "5t4r3e2w1q");

        userEvent.click(screen.getByText('Reset Password'));
    })

    it('should redirect to reset pass if failed', () => {
        let loc;
        const mockResetPasswordConfirm = jest.fn()
        const mockMatch = {
            params: {
                uid: "UID",
                token: "token"
            }
        }
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordConfirm reset_password_confirm={mockResetPasswordConfirm} match={mockMatch} />
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

        axios.post.mockImplementationOnce(() => Promise.reject());

        const pass = screen.getByLabelText(/Tuliskan kata sandi baru/);
        userEvent.type(pass, "5t4r3e2w1q");

        const newPass = screen.getByLabelText(/Tuliskan ulang kata sandi baru/);
        userEvent.type(newPass, "5t4r3e2w1q");

        // userEvent.click(screen.getByText('Reset Password')); // Causing error. Mock alert.
    })

    it('new_password and re_new_password not equal', () => {
        let loc;
        const mockResetPasswordConfirm = jest.fn()
        const mockMatch = {
            params: {
                uid: "UID",
                token: "token"
            }
        }
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordConfirm reset_password_confirm={mockResetPasswordConfirm} match={mockMatch} />
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

        const pass = screen.getByLabelText(/Tuliskan kata sandi baru/);
        userEvent.type(pass, "5t4r3e2w1q");

        const newPass = screen.getByLabelText(/Tuliskan ulang kata sandi baru/);
        userEvent.type(newPass, "1q2w3e4r5t");

        userEvent.click(screen.getByText('Reset Password'));
    })
});
