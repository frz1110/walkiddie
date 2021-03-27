import NavProfile from './NavProfile'
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('<NavProfile />', () => {
    it('renders correctly', () => {
        const { getByTestId, queryByTestId } = render(<NavProfile />);
        expect(getByTestId('nav-profile')).toBeInTheDocument();
        expect(queryByTestId('nav-profile-dropdownmenu')).not.toBeInTheDocument();
    });
    
    it('should open dropdown menu on profile icon click', () => {
        const { getByTestId } = render(<NavProfile />);
        userEvent.click(getByTestId('nav-profile-icon'));

        expect(getByTestId('nav-profile-dropdownmenu')).toBeInTheDocument();
    });

    it('should not close dropdown menu on arrow up/down event', () => {
        const { getByTestId } = render(<NavProfile />);
        userEvent.click(getByTestId('nav-profile-icon'));

        userEvent.type(getByTestId('nav-profile-menulist'), '{arrowup}');
        expect(getByTestId('nav-profile-dropdownmenu')).toBeInTheDocument();
        
        userEvent.type(getByTestId('nav-profile-menulist'), '{arrowdown}');
        expect(getByTestId('nav-profile-dropdownmenu')).toBeInTheDocument();
    });
    
    it('should close dropdown menu on click away event', async () => {
        const { getByTestId, queryByTestId } = render(<BrowserRouter><Navbar isLoggedIn={true} /></BrowserRouter>);
        userEvent.click(getByTestId('nav-profile-icon'));
        // console.log(prettyDOM(document.body))

        userEvent.click(getByTestId('profile-menu'));
        await waitFor(() => {
            expect(queryByTestId('nav-profile-dropdownmenu')).not.toBeInTheDocument();
        });        
    });
    
    it('should close dropdown menu on tab event', async () => {
        const { getByTestId, queryByTestId } = render(<BrowserRouter><Navbar isLoggedIn={true} /></BrowserRouter>);
        userEvent.click(getByTestId('nav-profile-icon'));

        userEvent.tab();
        await waitFor(() => {
            expect(queryByTestId('nav-profile-dropdownmenu')).not.toBeInTheDocument();
        });        
    });
    
    it('should call handleLogout function on Keluar menu clicked', () => {
        const mockFn = jest.fn();
        const { getByText, getByTestId } = render(<NavProfile handleLogout={mockFn} />);
        userEvent.click(getByTestId('nav-profile-icon'));
        userEvent.click(getByText('Keluar'));

        expect(mockFn).toBeCalled();
    });
});