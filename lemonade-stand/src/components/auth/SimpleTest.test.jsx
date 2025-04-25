import React from 'react';
import { render, screen } from '@testing-library/react';

// A simple test to verify Jest is working
test('renders a simple component', () => {
  render(<div>Hello, world!</div>);
  expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});