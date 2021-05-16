import OptionCard from "./OptionCard"
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<OptionCard />', () => {
    it('should render correctly', () => {
        const { getByText } = render(<OptionCard ratio={77} amount={77000}/>)
        expect(getByText(/77%/)).toBeInTheDocument()
        expect(getByText(/77,000/)).toBeInTheDocument()
    })
    
    it('should be checked when clicked', () => {
        const { getByTestId } = render(<OptionCard ratio={77} amount={77000}/>)
        const radioButton = getByTestId("mi-radio-btn");

        userEvent.click(radioButton)
        expect(radioButton).toBeChecked();
    })
})