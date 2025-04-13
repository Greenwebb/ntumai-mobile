import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Modal } from '../src/components/Modal';
import { Text, Button as RNButton } from 'react-native';

describe('Modal Component', () => {
  test('renders correctly when visible', () => {
    const { getByText } = render(
      <Modal visible title="Test Modal">
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(getByText('Test Modal')).toBeTruthy();
    expect(getByText('Modal Content')).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByText } = render(
      <Modal visible={false} title="Test Modal">
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(queryByText('Test Modal')).toBeNull();
    expect(queryByText('Modal Content')).toBeNull();
  });

  test('calls onClose when close button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Modal visible title="Test Modal" onClose={onCloseMock}>
        <Text>Modal Content</Text>
      </Modal>
    );
    
    fireEvent.press(getByTestId('modal-close-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('renders with custom footer', () => {
    const { getByText } = render(
      <Modal 
        visible 
        title="Test Modal"
        footer={
          <RNButton title="Custom Button" onPress={() => {}} />
        }
      >
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(getByText('Test Modal')).toBeTruthy();
    expect(getByText('Modal Content')).toBeTruthy();
    expect(getByText('Custom Button')).toBeTruthy();
  });

  test('renders with custom width', () => {
    const { getByTestId } = render(
      <Modal visible title="Test Modal" width="90%" testID="test-modal">
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(getByTestId('test-modal')).toBeTruthy();
  });

  test('renders with custom height', () => {
    const { getByTestId } = render(
      <Modal visible title="Test Modal" height="50%" testID="test-modal">
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(getByTestId('test-modal')).toBeTruthy();
  });
});
