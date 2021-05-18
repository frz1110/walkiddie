import Pagination from './Pagination';
import { render, screen, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux' 
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Pagination />', () => {

    let currentPage = 1;
    it('test pagination', () => {
        const mockPaginate = jest.fn(n => currentPage = n);
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
                    <Pagination currentPage={currentPage} postsPerPage={6} totalPosts={12} paginate={mockPaginate}/>
                </BrowserRouter>
            </Provider>);
        localStorage.removeItem('access', 'token')
    });

    it('next button until render new pagintion', () => {
        const mockPaginate = jest.fn(n => currentPage = n);
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
                    <Pagination currentPage={1} postsPerPage={6} totalPosts={100} paginate={mockPaginate}/>
                </BrowserRouter>
            </Provider>);
        const nextButton = screen.getByText(/>/)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        localStorage.removeItem('access', 'token')
    });

    it('prev button until render new pagintion', () => {
        const mockPaginate = jest.fn(n => currentPage = n);
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
                    <Pagination currentPage={1} postsPerPage={6} totalPosts={36} paginate={mockPaginate}/>
                </BrowserRouter>
            </Provider>);
        const nextButton = screen.getByText(/>/)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        const prevButton = screen.getByText(/</)
        userEvent.click(prevButton)
        userEvent.click(prevButton)
        userEvent.click(prevButton)
        userEvent.click(prevButton)
        localStorage.removeItem('access', 'token')
    });
    
    // it('next help button until render new pagintion', () => {
    //     const mockPaginate = jest.fn();
    //     const initialState = { auth: {
    //         isAuthenticated: true,
    //         user: {
    //             role: "Investor"
    //             }
    //         }
    //     }
    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState)
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Pagination currentPage={1} postsPerPage={6} totalPosts={100} paginate={mockPaginate}/>
    //             </BrowserRouter>
    //         </Provider>);
    //     const nextButton = screen.getByText(/…/)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     localStorage.removeItem('access', 'token')
    // });

    // it('prev  help button until render new pagintion', () => {
    //     const mockPaginate = jest.fn();
    //     const initialState = { auth: {
    //         isAuthenticated: true,
    //         user: {
    //             role: "Investor"
    //             }
    //         }
    //     }
    //     localStorage.setItem('access', 'token')
    //     const store = mockStore(initialState)
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Pagination currentPage={1} postsPerPage={6} totalPosts={36} paginate={mockPaginate}/>
    //             </BrowserRouter>
    //         </Provider>);
    //     const nextButton = screen.getByText(/…/)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     userEvent.click(nextButton)
    //     const prevButton = screen.getByText(/…/)
    //     userEvent.click(prevButton)
    //     userEvent.click(prevButton)
    //     userEvent.click(prevButton)
    //     userEvent.click(prevButton)
    //     localStorage.removeItem('access', 'token')
    // });
})