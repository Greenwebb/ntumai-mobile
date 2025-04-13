import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/Button';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(<Button label="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label="Test Button" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('renders correctly with variant="secondary"', () => {
    const { getByText } = render(
      <Button label="Secondary Button" onPress={() => {}} variant="secondary" />
    );
    expect(getByText('Secondary Button')).toBeTruthy();
  });

  test('renders correctly with variant="outline"', () => {
    const { getByText } = render(
      <Button label="Outline Button" onPress={() => {}} variant="outline" />
    );
    expect(getByText('Outline Button')).toBeTruthy();
  });

  test('renders correctly when disabled', () => {
    const { getByText } = render(
      <Button label="Disabled Button" onPress={() => {}} disabled />
    );
    expect(getByText('Disabled Button')).toBeTruthy();
  });

  test('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Disabled Button" onPress={onPressMock} disabled />
    );
    
    fireEvent.press(getByText('Disabled Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  test('renders with icon', () => {
    const { getByText } = render(
      <Button 
        label="Icon Button" 
        onPress={() => {}} 
        icon={<Text>🔍</Text>} 
      />
    );
    expect(getByText('Icon Button')).toBeTruthy();
  });

  test('renders with custom style', () => {
    const { getByText } = render(
      <Button 
        label="Custom Style Button" 
        onPress={() => {}} 
        style={{ backgroundColor: 'red' }} 
      />
    );
    expect(getByText('Custom Style Button')).toBeTruthy();
  });
});
