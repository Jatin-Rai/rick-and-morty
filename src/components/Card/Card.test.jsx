import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

describe('Card component', () => {
  const character = {
    name: 'Rick Sanchez',
    image: 'rick.jpg',
    location: { name: 'Earth' },
    status: 'Alive',
  };

  test('renders with the correct character name and location', () => {
    render(<Card character={character} />);

    // Check if the character name is rendered
    const nameElement = screen.getByText(character.name);
    expect(nameElement).toBeInTheDocument();

    // Check if the last location is rendered
    const locationElement = screen.getByText(`${character.location?.name}`);
    expect(locationElement).toBeInTheDocument();
  });

  test('renders with the correct status badge for Alive character', () => {
    render(<Card character={character} />);

    // Check if the status badge is green for Alive character
    const badgeElement = screen.getByText('Alive');
    expect(badgeElement).toHaveStyle({ backgroundColor: 'green' });
  });

  test('renders with the correct status badge for Dead character', () => {
    const deadCharacter = { ...character, status: 'Dead' };
    render(<Card character={deadCharacter} />);

    // Check if the status badge is red for Dead character
    const badgeElement = screen.getByText('Dead');
    expect(badgeElement).toHaveStyle({ backgroundColor: 'red' });
  });

  test('renders with the correct status badge for characters with unknown status', () => {
    const unknownStatusCharacter = { ...character, status: 'Unknown' };
    render(<Card character={unknownStatusCharacter} />);

    // Check if the status badge is gray for characters with unknown status
    const badgeElement = screen.getByText('Unknown');
    expect(badgeElement).toHaveStyle({ backgroundColor: 'gray' });
  });

  test('renders with the correct image and alt text', () => {
    render(<Card character={character} />);

    // Check if the image is rendered with the correct source and alt text
    const imageElement = screen.getByAltText(character.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', character.image);
  });
});
