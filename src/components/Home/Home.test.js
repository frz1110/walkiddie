import Home from './Home'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux' 
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Home />',() => {
    it('renders correctly', () => {
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><BrowserRouter><Home user={mockUser}/></BrowserRouter></Provider>);
        expect(getByText(/Platform Crowdfunding/)).toBeInTheDocument();
    });
    
    test('all register mitra button should have the corrrect link', () => {
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { queryAllByText } = render(<Provider store={store}><BrowserRouter><Home user={mockUser}/></BrowserRouter></Provider>);
        const buttonCount = queryAllByText('Gabung Mitra').length;
        for (let i = 0; i < buttonCount; i++) {
            expect(queryAllByText('Gabung Mitra')[i]).toHaveAttribute("href", '/daftar-mitra');
        }
    });
    
    test('all register investor button should have the corrrect link', () => {
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { queryAllByText } = render(<Provider store={store}><BrowserRouter><Home user={mockUser}/></BrowserRouter></Provider>);
        const buttonCount = queryAllByText('Mulai Investasi').length;
        for (let i = 0; i < buttonCount; i++) {
            expect(queryAllByText('Mulai Investasi')[i]).toHaveAttribute("href", '/daftar-investor');
        }
    });

    test('hubungi button should have the correct link', () => {
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><BrowserRouter><Home user={mockUser}/></BrowserRouter></Provider>);
        expect(getByText("Hubungi Kami")).toHaveAttribute("href", expect.stringContaining('mailto'));
    });

    it('should redirect to Daftar Investor page when Mulai Investasi button is clicked', () => {
        let testLocation;
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { queryAllByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Home user={mockUser}/>
                    <Route
                        path="*"
                        render={({ history, location }) => {
                        testLocation = location;
                        return null;
                        }}
                    />
            </MemoryRouter>
            </Provider>
        );
        
        userEvent.click(queryAllByText('Mulai Investasi')[0]);
        expect(testLocation.pathname).toBe("/daftar-investor");
    }); 
    
    it('should redirect to Daftar Mitra page when Gabung Mitra button is clicked', () => {
        let testLocation;
        const mockUser = jest.fn()
        const initialState = { auth: {
            user: null
            }
        }
        const store = mockStore(initialState)
        const { queryAllByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Home user={mockUser}/>
                    <Route
                        path="*"
                        render={({ history, location }) => {
                        testLocation = location;
                        return null;
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        
        userEvent.click(queryAllByText('Gabung Mitra')[0]);
        expect(testLocation.pathname).toBe("/daftar-mitra");
    }); 

    it('should redirect if mitra', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = {
            auth: {
                user: {
                    role: "Mitra"
                }
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <Home user={mockUser} />
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>);
          </>,
            {initialState: {auth: {
                            user: {
                                role: "Mitra"
                                }
                            }
                        }
            }
        );
        expect(loc.pathname).toBe('/pemilik-toko');
    })

    it('should redirect if investor', () => {
        let loc;
        const mockUser = jest.fn()
        const initialState = {
            auth: {
                user: {
                    role: "Investor"
                }
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <Home user={mockUser} />
                    <Route
                    path="*"
                    render={({location}) => {
                        loc = location;
                        return null;
                    }}
                    />
                </BrowserRouter>
            </Provider>);
          </>,
            {initialState: {auth: {
                            user: {
                                role: "Investor"
                                }
                            }
                        }
            }
        );
        expect(loc.pathname).toBe('/investor');
    })
});