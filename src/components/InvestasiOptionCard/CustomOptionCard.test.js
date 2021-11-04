import { render, screen } from '@testing-library/react';
import CustomOptionCard from './CustomOptionCard';
import userEvent from '@testing-library/user-event';


describe('<CustomOptionCard />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<CustomOptionCard />);
        expect(getByText(/Jumlah Lot/i)).toBeInTheDocument();
    })

    it('should show the right amount', () => {
        const { getByTestId } = render(<CustomOptionCard />)
        const textBox = getByTestId("mi-custom-amount");
        const radioButton = getByTestId("mi-radio-btn");
        userEvent.click(radioButton);

        textBox.value='';
        userEvent.type(textBox, 100);
        expect(radioButton).toBeChecked();
        expect(textBox.value).toHaveValue(100);

        textBox.value='';
        userEvent.type(textBox, -9);
        expect(textBox.value).toHaveValue(1);

        textBox.value='';
        userEvent.type(textBox, 1000);
        expect(textBox.value).toHaveValue(100);

        textBox.value='';
        userEvent.type(textBox, 'a');
        expect(textBox.value).toHaveValue('');
    })
})