import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MembuatInvestasi from './MembuatInvestasi';
import userEvent from '@testing-library/user-event';

function render(
    ui,
    {
      initialState = {auth: {isAuthenticated: true}},
      store = createStore(state => state, initialState),
      ...renderOptions
    } = {},
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}><MemoryRouter initialEntries={["/investasi"]}>{children}</MemoryRouter></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('<Membuat Investasi />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<MembuatInvestasi />);
        expect(getByText(/Tata Cara Pembayaran/)).toBeInTheDocument()
        expect(getByText(/Estimasi Keuangan/)).toBeInTheDocument()
    })
    
    it('should contains Option Cards components', () => {
        const { getAllByTestId } = render(<MembuatInvestasi />);
        expect(getAllByTestId("mi-opt-card")).not.toHaveLength(0)
        expect(getAllByTestId("mi-custom-opt-card")).not.toHaveLength(0)
    })

    it('should contains Buat Investasi button', () => {
        const { getByText } = render(<MembuatInvestasi />);
        expect(getByText('Buat Investasi', {selector: "button"})).toBeInTheDocument()
    })
    
    it('should contains back button', () => {
        const { getByText } = render(<MembuatInvestasi />);
        expect(getByText('Kembali', {selector: "button"})).toBeInTheDocument()
    })
    
    it('should redirect to login page if not authenticated', () => {
        let testLoc;
        render(
            <MemoryRouter initialEntries={["/investasi"]}>
                <MembuatInvestasi />
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

        const { getByText } = render(<MembuatInvestasi />);
        const backButton = getByText('Kembali', {selector: "button"});
        userEvent.click(backButton);
        
        expect(historyBack).toHaveBeenCalledTimes(1);
        historyBack.mockRestore()
    })
})