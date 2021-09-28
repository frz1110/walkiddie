import { render as rtlRender, act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MembuatInvestasi, { utils } from './MembuatInvestasi';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');

function render(
    ui,
    {
      initialState = {
        auth: {
            isAuthenticated: true,
            user: {role: "Investor"}
        }
      },
      store = createStore(state => state, initialState),
      ...renderOptions
    } = {},
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}><MemoryRouter initialEntries={["/investasi/1"]}>{children}</MemoryRouter></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

const mockMatch = {
    params : {
        pk : 1
    }
}

describe('<Membuat Investasi />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        expect(getByText(/Tata Cara Pembayaran/)).toBeInTheDocument()
        expect(getByText(/Estimasi Keuangan/)).toBeInTheDocument()
    })
    
    it('should contains Option Cards components', () => {
        const { getAllByTestId } = render(<MembuatInvestasi match={mockMatch} />);
        expect(getAllByTestId("mi-opt-card")).not.toHaveLength(0)
        expect(getAllByTestId("mi-custom-opt-card")).not.toHaveLength(0)
    })

    it('should contains Buat Investasi button', () => {
        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        expect(getByText('Buat Investasi', {selector: "button"})).toBeInTheDocument()
    })
    
    it('should contains back button', () => {
        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        expect(getByText('Kembali', {selector: "button"})).toBeInTheDocument()
    })
    
    it('should redirect to login page if not authenticated', () => {
        let testLoc;
        render(
            <MemoryRouter initialEntries={["/investasi/1"]}>
                <MembuatInvestasi match={mockMatch} />
                <Route
                    path="*"
                    render={({ location }) => {
                    testLoc = location;
                    return null;
                    }}
                />
            </MemoryRouter>,
            {initialState: {auth: {isAuthenticated: false}}}
        );
        
        expect(testLoc.pathname).toBe("/masuk");
    })

    test('back button work correctly', () => {
        const historyBack = jest.spyOn(window.history, 'back');
        historyBack.mockImplementation(() => {});

        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        const backButton = getByText('Kembali', {selector: "button"});
        userEvent.click(backButton);
        
        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })

    test('submit investasi form success and gives alert', () => {
        const alert = jest.spyOn(window, 'alert');
        alert.mockImplementation(() => {});

        axios.post.mockImplementationOnce(() => Promise.resolve())
        localStorage.setItem('access', 'token')

        const { getByText, getAllByTestId } = render(<MembuatInvestasi match={mockMatch} />);
        const submitButton = getByText('Buat Investasi', {selector: "button"});
        const optionCards = getAllByTestId("mi-radio-btn");
      
        act(() => {
            fireEvent.click(optionCards[0]);
            fireEvent.click(submitButton);
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(alert).toHaveBeenCalledTimes(1);
        alert.mockRestore();
    })
    
    // test('submit investasi form failed and gives alert', () => {
    //     const alert = jest.spyOn(window, 'alert');
    //     alert.mockImplementation(() => {});

    //     axios.post.mockImplementationOnce(() => Promise.reject());
    //     localStorage.setItem('access', 'token')

    //     const { getByText, getAllByTestId } = render(<MembuatInvestasi match={mockMatch} />);
    //     const submitButton = getByText('Buat Investasi', {selector: "button"});
    //     const optionCards = getAllByTestId("mi-radio-btn");
      
    //     act(() => {
    //         fireEvent.click(optionCards[0]);
    //         fireEvent.click(submitButton);
    //     });
    //     expect(axios.post).toHaveBeenCalledTimes(1);
    //     expect(alert).toHaveBeenCalledTimes(1);
    //     alert.mockRestore();
    // })
    
    test('submit investasi form unauthenticated and gives alert', () => {
        const alert = jest.spyOn(window, 'alert');
        alert.mockImplementation(() => {});

        localStorage.removeItem('access','token');

        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        const submitButton = getByText('Buat Investasi', {selector: "button"});
      
        act(() => {fireEvent.click(submitButton)});
        expect(axios.post).not.toHaveBeenCalled();
        expect(alert).toHaveBeenCalledTimes(1);
        alert.mockRestore();
    })
    
    test('submit investasi form error and gives alert', () => {
        const alert = jest.spyOn(window, 'alert');
        alert.mockImplementation(() => {});

        axios.post.mockImplementationOnce(() => {throw new Error('Network Error')});
        localStorage.setItem('access', 'token')

        const { getByText } = render(<MembuatInvestasi match={mockMatch} />);
        const submitButton = getByText('Buat Investasi', {selector: "button"});
      
        act(() => {fireEvent.click(submitButton)});
        expect(alert).toHaveBeenCalledTimes(1);
        alert.mockRestore();
    })
    
    test('select investasi option card using the right function', () => {
        const getCardValueMock = jest.spyOn(utils, 'getCardValue');
        const { getAllByTestId, getByText } = render(<MembuatInvestasi match={mockMatch} />);
        
        axios.post.mockImplementationOnce(() => Promise.resolve())
        localStorage.setItem('access', 'token')

        const submitButton = getByText('Buat Investasi', {selector: "button"});
        const optionCards = getAllByTestId("mi-radio-btn");
      
        act(() => {
            fireEvent.click(optionCards[0]);
            fireEvent.click(submitButton);
        });
        expect(getCardValueMock).toHaveBeenCalled();
    })
    
    test('custom investasi function returns the right value', () => {
        const getCustomCardValueMock = jest.spyOn(utils, 'getCustomCardValue');
        const { getAllByTestId, getByText, getByTestId } = render(<MembuatInvestasi match={mockMatch} />);
        
        axios.post.mockImplementationOnce(() => Promise.resolve())
        localStorage.setItem('access', 'token')

        const submitButton = getByText('Buat Investasi', {selector: "button"});
        const optionCards = getAllByTestId("mi-radio-btn");
        const customOptionCards = optionCards[optionCards.length-1];
        const customValueInput = getByTestId("mi-custom-amount");
      
        act(() => {
            fireEvent.click(customOptionCards);
            fireEvent.change(customValueInput, { target : { value : 125000 } });
            fireEvent.click(submitButton);
        });
        utils.getCustomCardValue()
        expect(getCustomCardValueMock).toReturnWith("125000");
    })
})