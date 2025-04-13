import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../src/components/Card';
import { Text, View } from 'react-native';

describe('Card Component', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Card testID="test-card">
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByTestId('test-card')).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  test('renders with custom style', () => {
    const { getByTestId } = render(
      <Card style={{ backgroundColor: 'red' }} testID="test-card">
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByTestId('test-card')).toBeTruthy();
  });

  test('handles onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPressMock} testID="test-card">
        <Text>Card Content</Text>
      </Card>
    );
    
    fireEvent.press(getByTestId('test-card'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('renders with title and subtitle', () => {
    const { getByText } = render(
      <Card title="Card Title" subtitle="Card Subtitle">
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Title')).toBeTruthy();
    expect(getByText('Card Subtitle')).toBeTruthy();
    expect(getByText('Card Content')).toBeTruthy();
  });

  test('renders with footer', () => {
    const { getByText } = render(
      <Card 
        footer={<Text>Card Footer</Text>}
      >
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
    expect(getByText('Card Footer')).toBeTruthy();
  });

  test('renders with elevated style when elevated prop is true', () => {
    const { getByTestId } = render(
      <Card elevated testID="test-card">
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByTestId('test-card')).toBeTruthy();
  });
});
