import Home from './Home'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Home />',() => {
    it('renders correctly', () => {
        const { getByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        expect(getByText(/Platform Crowdfunding/)).toBeInTheDocument();
    });
    
    test('all register mitra button should have the corrrect link', () => {
        const { queryAllByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        const buttonCount = queryAllByText('Gabung Mitra').length;
        for (let i = 0; i < buttonCount; i++) {
            expect(queryAllByText('Gabung Mitra')[i]).toHaveAttribute("href", '/daftar-mitra');
        }
    });
    
    test('all register investor button should have the corrrect link', () => {
        const { queryAllByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        const buttonCount = queryAllByText('Mulai Investasi').length;
        for (let i = 0; i < buttonCount; i++) {
            expect(queryAllByText('Mulai Investasi')[i]).toHaveAttribute("href", '/daftar-investor');
        }
    });

    test('hubungi button should have the correct link', () => {
        const { getByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        expect(getByText("Tentang Kami")).toHaveAttribute("href", expect.stringContaining('mailto'));
    });

    it('should redirect to Daftar Investor page when Mulai Investasi button is clicked', () => {
        let testLocation;
        const { queryAllByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Home />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        );
        
        userEvent.click(queryAllByText('Mulai Investasi')[0]);
        expect(testLocation.pathname).toBe("/daftar-investor");
    }); 
    
    it('should redirect to Daftar Mitra page when Gabung Mitra button is clicked', () => {
        let testLocation;
        const { queryAllByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Home />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        );
        
        userEvent.click(queryAllByText('Gabung Mitra')[0]);
        expect(testLocation.pathname).toBe("/daftar-mitra");
    }); 
});