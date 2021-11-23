import BeliSaham from './BeliSaham';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux' ;
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<BeliSaham />', () => {

    it('renders the right contents if Investor', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
          params: {
              pk: 1
          }
      }
        const initialState = { auth: {
            isAuthenticated: true,
            user: {
                role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BeliSaham isAuthenticated={mockAuthenticate} user={mockUser} match={mockMatch} />
                </BrowserRouter>
            </Provider>);

        expect(screen.getByText('Terima kasih. Mohon menunggu verifikasi pembelian.')).toBeInTheDocument();
        expect(getByText('Kembali')).toBeInTheDocument();
        localStorage.removeItem('access', 'token');
    });

    it('should redirect if not Investor', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
          params: {
              pk: 1
          }
      }
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
                    <BeliSaham user={mockUser} isAuthenticated={mockAuthenticate} match={mockMatch} />
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
            expect(loc.pathname).toBe('/');
    });

    it('should redirect if guest', () => {
        let loc;
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
          params: {
              pk: 1
          }
      }
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
                    <BeliSaham user={mockUser} isAuthenticated={mockAuthenticate} match={mockMatch} />
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
    });

      test('back button work correctly', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
          params: {
              pk: 1
          }
      }
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => { });

        const { getByText } = render(
          <Provider store={store}>
              <BrowserRouter>
                  <BeliSaham isAuthenticated={mockAuthenticate} user={mockUser} match={mockMatch}/>
              </BrowserRouter>
          </Provider>);
        const backButton = getByText('Kembali', { selector: "button" });
        userEvent.click(backButton);

        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    });

      test('API call work correctly', () => {
        const mockUser = jest.fn()
        const mockAuthenticate = jest.fn()
        const mockMatch = {
          params: {
              pk: 1
          }
      }
        const initialState = {
            auth: {
                isAuthenticated: true,
                user: {
                    role: "Investor"
                }
            }
        }
        localStorage.setItem('access', 'token')
        const store = mockStore(initialState)
        
        const config = {
          headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
      };

      var mock = new MockAdapter(axios);

      mock.onPatch(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/penjualan/${mockMatch.params.pk}/beli/`, {}, config);

        render(
          <Provider store={store}>
              <BrowserRouter>
                  <BeliSaham isAuthenticated={mockAuthenticate} user={mockUser} match={mockMatch}/>
              </BrowserRouter>
          </Provider>);
        localStorage.removeItem('access', 'token');
    });

})
