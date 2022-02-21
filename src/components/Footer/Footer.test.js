import Footer from './Footer'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('<Footer />', () => {
    it('renders the right contents', () => {
        const { getByTestId, getByText } = render(<Footer />);

        // checks copyright text: 4 digit year and the rest of the text.
        expect(getByText(/\d{4}/)).toBeInTheDocument();
        expect(getByText(/Walkiddie. All rights reserved./)).toBeInTheDocument();

        expect(getByTestId('ic-instagram')).toBeInTheDocument();
        expect(getByTestId('ic-facebook')).toBeInTheDocument();
        expect(getByTestId('ic-twitter')).toBeInTheDocument();
        expect(getByTestId('ic-youtube')).toBeInTheDocument();
    });

    it('social media icons redirect to the correct link', () => {
        const { getByTestId } = render(<Footer />);

        expect(getByTestId('ic-instagram')).toHaveAttribute("href", expect.stringContaining('instagram'));
        expect(getByTestId('ic-facebook')).toHaveAttribute("href", expect.stringContaining('facebook'));
        expect(getByTestId('ic-youtube')).toHaveAttribute("href", expect.stringContaining('youtube'));
        expect(getByTestId('ic-twitter')).toHaveAttribute("href", expect.stringContaining('twitter'));
    });
});