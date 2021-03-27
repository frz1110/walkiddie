import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders navbar, home, and footer', () => {
    const {getByTestId, getByText} = render(<App />);
    expect(getByTestId('navbar')).toBeInTheDocument();
    expect(getByText(/Platform Crowdfunding/)).toBeInTheDocument();
    expect(getByText(/Walkiddie. All rights reserved./)).toBeInTheDocument();
  });
});
