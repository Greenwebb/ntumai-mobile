import React from 'react';
import { render } from '@testing-library/react-native';
import { Rating } from '../src/components/Rating';

describe('Rating Component', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Rating value={3.5} testID="test-rating" />
    );
    expect(getByTestId('test-rating')).toBeTruthy();
  });

  test('renders with correct number of stars', () => {
    const { getAllByTestId } = render(
      <Rating value={3.5} maxStars={5} />
    );
    // Should render 5 stars (filled, half-filled, or empty)
    expect(getAllByTestId(/star-/).length).toBe(5);
  });

  test('renders with custom size', () => {
    const { getByTestId } = render(
      <Rating value={4} size={30} testID="test-rating" />
    );
    expect(getByTestId('test-rating')).toBeTruthy();
  });

  test('renders with custom colors', () => {
    const { getByTestId } = render(
      <Rating 
        value={4} 
        activeColor="#FF0000" 
        inactiveColor="#CCCCCC" 
        testID="test-rating" 
      />
    );
    expect(getByTestId('test-rating')).toBeTruthy();
  });

  test('renders with review count', () => {
    const { getByText } = render(
      <Rating value={4.5} reviewCount={120} />
    );
    expect(getByText('(120)')).toBeTruthy();
  });

  test('renders in read-only mode by default', () => {
    const { getByTestId } = render(
      <Rating value={3.5} testID="test-rating" />
    );
    expect(getByTestId('test-rating')).toBeTruthy();
  });

  test('renders with label', () => {
    const { getByText } = render(
      <Rating value={4.5} label="Customer Rating" />
    );
    expect(getByText('Customer Rating')).toBeTruthy();
  });
});
