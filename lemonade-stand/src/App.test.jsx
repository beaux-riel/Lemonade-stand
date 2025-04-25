import React from 'react';
import { render, screen } from './test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the app with home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  
  // Check that the header is rendered
  expect(screen.getByText('Lemonade Stand')).toBeInTheDocument();
  
  // Check that the home page content is rendered
  expect(screen.getByText('Find Lemonade Stands Near You')).toBeInTheDocument();
});
