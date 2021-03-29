import Navbar from './Navbar';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducer';

const StoreProvider = (initialState = {auth: {isAuthenticated: false}}, Router = BrowserRouter) => ({ children }) => {
  const store = createStore(reducers, initialState);
  return <Provider store={store}><Router>{children}</Router></Provider>
}

describe('<Navbar />', () => {

    it('renders correctly', () => {
        const { getByTestId } = render(<Navbar />, {wrapper: StoreProvider()});
        expect(getByTestId('navbar')).toBeInTheDocument();
    });

    it('should not render profile button when not logged in', () => {
        const { queryByTestId } = render(<Navbar />, {wrapper: StoreProvider()});
        expect(queryByTestId('nav-profile')).not.toBeInTheDocument();
    });
    
    it('should render profile button and hide login, register buttons when logged in', () => {
        const { queryByTestId, queryByText } = render(<Navbar />, { wrapper: StoreProvider({auth: {isAuthenticated: true}}) });
        expect(queryByTestId('nav-profile')).toBeInTheDocument();
        expect(queryByText('Masuk')).not.toBeInTheDocument();
        expect(queryByText('Buat Akun')).not.toBeInTheDocument();
    });

    test('login & register buttons have correct links', () => {
        const { getByText } = render(<Navbar />, { wrapper: StoreProvider() });
        expect(getByText('Masuk')).toHaveAttribute('href', '/masuk');
        expect(getByText('Buat Akun')).toHaveAttribute('href', '/daftar-investor');
    });

    test('nav-menus have correct links', () => {
        const { getByText } = render(<Navbar />, { wrapper: StoreProvider() });
        expect(getByText('Bantuan')).toHaveAttribute('href', '/bantuan');
    });

    test('logo should have link to homepage', () => {
        const { getByTestId } = render(<Navbar />, { wrapper: StoreProvider() });
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
            </MemoryRouter>,
            {wrapper: StoreProvider(undefined, ({children}) => <>{children}</>)}
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
            </MemoryRouter>,
            {wrapper: StoreProvider(undefined, ({children}) => <>{children}</>)}
        );
        
        userEvent.click(getByText('Buat Akun'));
        expect(testLocation.pathname).toBe("/daftar-investor");
    }); 
});
