import RingkasanSales from './RingkasanSales';
import '@testing-library/jest-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux' 
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<RingkasanSales />', () => {

    it('renders the right contents if Mitra', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {
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
                    <RingkasanSales isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        // expect(screen.getByText('Ringkasan Sales Investasi')).toBeInTheDocument();
        // expect(screen.getByText('Daftar Investasi')).toBeInTheDocument();
        // localStorage.removeItem('access', 'token')
    });

    it('renders the right contents if Investor', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = { auth: {
            isAuthenticated: true,
            user: {
                role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <RingkasanSales isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        // expect(screen.getByText('Ringkasan Sales Investasi')).toBeInTheDocument();
        // expect(screen.getByText('Daftar Investasi')).toBeInTheDocument();
        // localStorage.removeItem('access', 'token')
    });

    // it('should redirect if admin', () => {
    //     let loc;
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Admin"
    //             }
    //         }
    //     }

    //     const store = mockStore(initialState)
    //     render(
    //       <>
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <RingkasanSales user={mockUser} isAuthenticated={mockAuthenticate} />
    //                 <Route
    //                 path="*"
    //                 render={({location}) => {
    //                     loc = location;
    //                     return null;
    //                 }}
    //                 />
    //             </BrowserRouter>
    //         </Provider>);
    //       </>,
    //         {initialState: {auth: {
    //                         isAuthenticated: false
    //                         }
    //                     }
    //         }
    //     );
    //     expect(loc.pathname).toBe('/');
    // })

    it('should redirect if guest', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const initialState = {
            auth: {
                isAuthenticated: false
            }
        }
        const store = mockStore(initialState)
        render(
          <>
            <Provider store={store}>
                <BrowserRouter>
                    <RingkasanSales user={mockUser} isAuthenticated={mockAuthenticate} />
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
                            isAuthenticated: false
                            }
                        }
            }
        );
        expect(loc.pathname).toBe('/masuk');
    })

})