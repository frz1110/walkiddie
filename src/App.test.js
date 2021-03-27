import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn React/i);
  const regis = screen.getByText(/Registrasi disini/i);
  expect(linkElement).toBeInTheDocument();
});
