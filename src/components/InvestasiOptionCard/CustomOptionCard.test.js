import { render } from '@testing-library/react';
import CustomOptionCard from './CustomOptionCard';
import userEvent from '@testing-library/user-event';

describe('<CustomOptionCard />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<CustomOptionCard />)
        expect(getByText(/jumlah lain/i)).toBeInTheDocument()
    })

    it('should be checked when clicked', () => {
        const { getByTestId } = render(<CustomOptionCard />)
        const radioButton = getByTestId("mi-radio-btn");

        userEvent.click(radioButton)
        expect(radioButton).toBeChecked();
    })
})