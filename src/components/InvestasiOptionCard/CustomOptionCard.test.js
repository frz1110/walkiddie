import { render, act, fireEvent } from '@testing-library/react';
import CustomOptionCard from './CustomOptionCard';


describe('<CustomOptionCard />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<CustomOptionCard />);
        expect(getByText(/Jumlah Lot/)).toBeInTheDocument();
    });

    it('should show the right amount', () => {
        const { getByTestId } = render(<CustomOptionCard />);
        const radioButton = getByTestId("mi-radio-btn");
        const textBox = getByTestId("mi-custom-amount");
        act(() => {
            fireEvent.click(radioButton);
            fireEvent.change(textBox, { target : { value : 100 } });
        });
        expect(textBox).toHaveValue(100);
    });

    it('should show the right amount negative', () => {
        const { getByTestId } = render(<CustomOptionCard />);
        const radioButton = getByTestId("mi-radio-btn");
        const textBox = getByTestId("mi-custom-amount");
        act(() => {
            fireEvent.click(radioButton);
            fireEvent.change(textBox, { target : { value : -9 } });
        });
        expect(textBox).toHaveValue(1);
    });
    it('should show the right amount more than 100', () => {
        const { getByTestId } = render(<CustomOptionCard />);
        const textBox = getByTestId("mi-custom-amount");
        act(() => {
            fireEvent.change(textBox, { target : { value : 1000 } });
        });
    });
    it('should show the right amount null value', () => {
        const { getByTestId } = render(<CustomOptionCard />);
        const textBox = getByTestId("mi-custom-amount");
        act(() => {
            fireEvent.change(textBox, { target : { value : 'a' } });
        });
    });
});
