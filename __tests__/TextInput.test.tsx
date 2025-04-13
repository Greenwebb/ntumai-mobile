import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from '../src/components/TextInput';

describe('TextInput Component', () => {
  test('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter text" onChangeText={() => {}} />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter text" onChangeText={onChangeTextMock} />
    );
    
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  test('renders with label', () => {
    const { getByText, getByPlaceholderText } = render(
      <TextInput label="Username" placeholder="Enter username" onChangeText={() => {}} />
    );
    expect(getByText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter username')).toBeTruthy();
  });

  test('renders error message when provided', () => {
    const { getByText } = render(
      <TextInput 
        placeholder="Enter text" 
        onChangeText={() => {}} 
        error="This field is required" 
      />
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  test('renders correctly when disabled', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter text" onChangeText={() => {}} disabled />
    );
    const input = getByPlaceholderText('Enter text');
    expect(input.props.editable).toBe(false);
  });

  test('renders with initial value', () => {
    const { getByDisplayValue } = render(
      <TextInput placeholder="Enter text" onChangeText={() => {}} value="Initial value" />
    );
    expect(getByDisplayValue('Initial value')).toBeTruthy();
  });

  test('renders with left icon', () => {
    const { getByPlaceholderText } = render(
      <TextInput 
        placeholder="Enter text" 
        onChangeText={() => {}} 
        leftIcon={<Text>🔍</Text>} 
      />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('renders with right icon', () => {
    const { getByPlaceholderText } = render(
      <TextInput 
        placeholder="Enter text" 
        onChangeText={() => {}} 
        rightIcon={<Text>❌</Text>} 
      />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('handles secure text entry', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter password" onChangeText={() => {}} secureTextEntry />
    );
    const input = getByPlaceholderText('Enter password');
    expect(input.props.secureTextEntry).toBe(true);
  });
});
