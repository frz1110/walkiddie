import { render, act, fireEvent } from '@testing-library/react';
import CustomOptionCard from './CustomOptionCard';


describe('<CustomOptionCard />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<CustomOptionCard />);
        expect(getByText(/Jumlah Lot/)).toBeInTheDocument();
    })

    it('should show the right amount', () => {
        const { getByTestId } = render(<CustomOptionCard />);
        const radioButton = getByTestId("mi-radio-btn");

        const textBox = getByTestId("mi-custom-amount");
        act(() => {
            fireEvent.click(radioButton);
            fireEvent.change(textBox, { target : { value : 100 } });
        });
        expect(textBox).toHaveValue(100);

        act(() => {
            fireEvent.change(textBox, { target : { value : -9 } });
        });
        expect(textBox).toHaveValue(1);

        act(() => {
            fireEvent.change(textBox, { target : { value : 1000 } });
        });
        expect(textBox).toHaveValue(100);

        act(() => {
            fireEvent.change(textBox, { target : { value : 'a' } });
        });
        expect(textBox).toBeNull;
    })
})