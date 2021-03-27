import Navbar from './Navbar';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('<Navbar />', () => {

    it('renders correctly', () => {
        const { getByTestId } = render(<BrowserRouter><Navbar /></BrowserRouter>);
        expect(getByTestId('navbar')).toBeInTheDocument();
    });

    it('should not render profile button when not logged in', () => {
        const { queryByTestId } = render(<BrowserRouter><Navbar /></BrowserRouter>);
        expect(queryByTestId('nav-profile')).not.toBeInTheDocument();
    });
    
    it('should render profile button and hide login, register buttons when logged in', () => {
        const { queryByTestId, queryByText } = render(<BrowserRouter><Navbar isLoggedIn={true} /></BrowserRouter>);
        expect(queryByTestId('nav-profile')).toBeInTheDocument();
        expect(queryByText('Masuk')).not.toBeInTheDocument();
        expect(queryByText('Buat Akun')).not.toBeInTheDocument();
    });

    test('login & register buttons have correct links', () => {
        const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
        expect(getByText('Masuk')).toHaveAttribute('href', '/masuk');
        expect(getByText('Buat Akun')).toHaveAttribute('href', '/daftar-investor');
    });

    test('nav-menus have correct links', () => {
        const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
        expect(getByText('Bantuan')).toHaveAttribute('href', '/bantuan');
    });

    test('logo should have link to homepage', () => {
        const { getByTestId } = render(<BrowserRouter><Navbar /></BrowserRouter>);
        expect(getByTestId('nav-logo')).toHaveAttribute('href', '/');
    });

    it('should redirect to Log in page when Masuk button is clicked', () => {
        let testHistory, testLocation;
        const { getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testHistory = history;
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        );
        
        userEvent.click(getByText('Masuk'));
        expect(testLocation.pathname).toBe("/masuk");
    }); 
    
    it('should redirect to Daftar Investor page when Buat Akun button is clicked', () => {
        let testHistory, testLocation;
        const { getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testHistory = history;
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        );
        
        userEvent.click(getByText('Buat Akun'));
        expect(testLocation.pathname).toBe("/daftar-investor");
    }); 
});