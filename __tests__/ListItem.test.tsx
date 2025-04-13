import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from '../src/components/ListItem';
import { Text } from 'react-native';

describe('ListItem Component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(
      <ListItem title="List Item Title" />
    );
    expect(getByText('List Item Title')).toBeTruthy();
  });

  test('renders with title and subtitle', () => {
    const { getByText } = render(
      <ListItem title="List Item Title" subtitle="List Item Subtitle" />
    );
    expect(getByText('List Item Title')).toBeTruthy();
    expect(getByText('List Item Subtitle')).toBeTruthy();
  });

  test('handles onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ListItem title="List Item Title" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('List Item Title'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('renders with left icon', () => {
    const { getByText, getByTestId } = render(
      <ListItem 
        title="List Item Title" 
        leftIcon={<Text testID="left-icon">🔍</Text>} 
      />
    );
    expect(getByText('List Item Title')).toBeTruthy();
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  test('renders with right icon', () => {
    const { getByText, getByTestId } = render(
      <ListItem 
        title="List Item Title" 
        rightIcon={<Text testID="right-icon">→</Text>} 
      />
    );
    expect(getByText('List Item Title')).toBeTruthy();
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  test('renders with custom style', () => {
    const { getByTestId } = render(
      <ListItem 
        title="List Item Title" 
        style={{ backgroundColor: 'red' }} 
        testID="test-list-item" 
      />
    );
    expect(getByTestId('test-list-item')).toBeTruthy();
  });

  test('renders with divider when showDivider is true', () => {
    const { getByTestId } = render(
      <ListItem title="List Item Title" showDivider testID="test-list-item" />
    );
    expect(getByTestId('test-list-item')).toBeTruthy();
  });
});
