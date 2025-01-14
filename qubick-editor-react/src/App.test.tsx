import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders app container', () => {
  render(<App />);
  const appElement = document.querySelector('.app');
  expect(appElement).toBeInTheDocument();
});
