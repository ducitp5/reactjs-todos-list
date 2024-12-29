import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './components/TodoList';

test('renders learn react link', () => {
  const { getByText } = render(<TodoList />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
