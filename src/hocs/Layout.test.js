import Layout from './Layout';
import { render, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter,Route } from 'react-router-dom'
import { Provider } from 'react-redux' 
import axios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Layout />', () => {

    it('renders the right contents', () => {
        const isLoggedIn = jest.fn()
        const googleAuthenticate = jest.fn()
        const initialState = { auth: {isAuthenticated: false}}
        const store = mockStore(initialState)
        const dom = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout isLoggedIn={isLoggedIn} googleAuthenticate={googleAuthenticate}/>
                </BrowserRouter>
            </Provider>);
        const getById = queryByAttribute.bind(null, 'id');
        expect(getById(dom.container, "layout")).toBeInTheDocument();
    });
})