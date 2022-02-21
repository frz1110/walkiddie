import Aktivasi from './Aktivasi';
import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../store';
import '@testing-library/jest-dom';
import { BrowserRouter,Route } from 'react-router-dom'
import { Provider } from 'react-redux' 

jest.mock('axios')

describe('<Aktivasi />', () => {
    it('renders the right contents', () => {
        const mockVerify = jest.fn()
        const mockMatch = jest.fn()
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Aktivasi verify={mockVerify} match={mockMatch}/>
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Verifikasi akun anda/)).toBeInTheDocument();
    });

    it('should redirect if verified', () => {
        let loc;
        const mockVerify = jest.fn()
        const mockMatch = {
            params : {
                uid : "UID",
                token : "token"
            }
        }
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Aktivasi verify={mockVerify} match={mockMatch}/>
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>
        );
        userEvent.click(screen.getByText('Verifikasi'));
        expect(loc.pathname).toBe('/');
    })

});
