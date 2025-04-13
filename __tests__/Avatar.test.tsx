import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Avatar } from '../src/components/Avatar';

describe('Avatar Component', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Avatar testID="test-avatar" />
    );
    expect(getByTestId('test-avatar')).toBeTruthy();
  });

  test('renders with name initials when no image is provided', () => {
    const { getByText } = render(
      <Avatar name="John Doe" />
    );
    expect(getByText('JD')).toBeTruthy();
  });

  test('renders with single initial for single name', () => {
    const { getByText } = render(
      <Avatar name="John" />
    );
    expect(getByText('J')).toBeTruthy();
  });

  test('renders with custom size', () => {
    const { getByTestId } = render(
      <Avatar size={60} testID="test-avatar" />
    );
    expect(getByTestId('test-avatar')).toBeTruthy();
  });

  test('renders with custom background color', () => {
    const { getByTestId } = render(
      <Avatar backgroundColor="#FF0000" testID="test-avatar" />
    );
    expect(getByTestId('test-avatar')).toBeTruthy();
  });

  test('handles onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Avatar onPress={onPressMock} testID="test-avatar" />
    );
    
    fireEvent.press(getByTestId('test-avatar'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('renders with border when showBorder is true', () => {
    const { getByTestId } = render(
      <Avatar showBorder testID="test-avatar" />
    );
    expect(getByTestId('test-avatar')).toBeTruthy();
  });
});
