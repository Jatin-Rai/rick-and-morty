import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockCharacter = {
  name: 'Rick Sanchez',
  image: 'rick-image-url.jpg',
  location: { name: 'Earth' },
  status: 'Alive',
};

test('renders Card component with character information', () => {
  render(<Card character={mockCharacter} />);

  // Check if the name is rendered
  const nameElement = screen.getByText('Rick Sanchez');
  expect(nameElement).toBeInTheDocument();

  // Check if the last location is rendered
  const locationElement = screen.getByText('Last location:');
  expect(locationElement).toBeInTheDocument();
  const locationNameElement = screen.getByText('Earth');
  expect(locationNameElement).toBeInTheDocument();

  // Check if the status badge is rendered with the correct color
  const statusBadge = screen.getByText('Alive');
  expect(statusBadge).toBeInTheDocument();
  expect(statusBadge).toHaveStyle({ backgroundColor: 'green' });

  // Check if the image is rendered
  const imageElement = screen.getByAltText('Rick Sanchez');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', 'rick-image-url.jpg');
});
