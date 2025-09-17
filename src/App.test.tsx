import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app navigation', () => {
  render(<App />);
  const siteTitle = screen.getByText(/Brittany Ellich/i);
  expect(siteTitle).toBeInTheDocument();
});

test('renders project buttons', () => {
  render(<App />);
  const colorGameButton = screen.getByText('Color Game', { exact: true });
  const habitTrackerButton = screen.getByText(/Habit Tracker/i);
  expect(colorGameButton).toBeInTheDocument();
  expect(habitTrackerButton).toBeInTheDocument();
});
