import HomepageInvestor from './HomepageInvestor';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux' 
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<HomepageInvestor />', () => {

    it('renders the right contents', () => {
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
                    <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        // expect(screen.getByText('Proyek Pengadaan Barang')).toBeInTheDocument();
        localStorage.removeItem('access', 'token')
    });

    // test('search toko by name in search field', async() => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Mitra"
    //             },
    //             refresh: 'token',
    //             access: 'access'
    //         }
    //     }
    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState);
    //     const { getByLabelText, getByRole , getByText, queryByTestId, getByPlaceholderText } = await render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
    //             </BrowserRouter>
    //         </Provider>);

    //     const searchField = getByPlaceholderText("Search");
    //     await userEvent.type(searchField, "que");
    //     localStorage.removeItem('access', 'token')
    // });

    // test('search toko by filter', async() => {
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Mitra"
    //             },
    //             refresh: 'token',
    //             access: 'access'
    //         }
    //     }
    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState);
    //     const { getByLabelText, getByRole , getByText, queryByTestId, getByPlaceholderText } = await render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor isAuthenticated={mockAuthenticate} user={mockUser}/>
    //             </BrowserRouter>
    //         </Provider>);

    //     const mySelectComponent = queryByTestId('select-daerah');

    //     await fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
    //     await(() => getByText('aut'));
    //     await fireEvent.click(getByText('aut'));

    //     localStorage.removeItem('access', 'token')
    // });

    // it('should redirect if not Investor', () => {
    //     let loc;
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: true,
    //             user: {
    //                 role: "Mitra"
    //             }
    //         }
    //     }
    //     const store = mockStore(initialState)
    //     render(
    //       <>
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor user={mockUser} isAuthenticated={mockAuthenticate} />
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
    //                         isAuthenticated: true,
    //                         user: {
    //                             role: "Investor"
    //                             }
    //                         }
    //                     }
    //         }
    //     );
    //     expect(loc.pathname).toBe('/');
    // })

    // it('should redirect if guest', () => {
    //     let loc;
    //     const mockUser = jest.fn()
    //     const mockAuthenticate = jest.fn()
    //     const initialState = {
    //         auth: {
    //             isAuthenticated: false
    //         }
    //     }
    //     const store = mockStore(initialState)
    //     render(
    //       <>
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <HomepageInvestor user={mockUser} isAuthenticated={mockAuthenticate} />
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
    //     expect(loc.pathname).toBe('/masuk');
    // })

})