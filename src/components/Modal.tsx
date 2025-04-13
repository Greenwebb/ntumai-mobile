import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdropPress?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  testID?: string;
}

/**
 * Modal component for displaying content in a modal overlay
 * 
 * @example
 * <Modal 
 *   isVisible={isModalVisible}
 *   onClose={() => setModalVisible(false)}
 *   title="Modal Title"
 *   footer={
 *     <Button 
 *       title="Close" 
 *       onPress={() => setModalVisible(false)} 
 *     />
 *   }
 * >
 *   <Text>Modal content goes here</Text>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  footer,
  closeOnBackdropPress = true,
  animationType = 'fade',
  className = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  testID,
}) => {
  // Base classes
  let backdropClasses = 'absolute inset-0 bg-black bg-opacity-50 justify-center items-center';
  let contentClasses = 'bg-white rounded-xl w-5/6 max-w-md overflow-hidden';
  let headerClasses = 'p-4 border-b border-gray-200';
  let bodyClasses = 'p-4';
  let footerClasses = 'p-4 border-t border-gray-200';
  
  // Add custom classes
  backdropClasses += ` ${className}`;
  contentClasses += ` ${contentClassName}`;
  headerClasses += ` ${headerClassName}`;
  bodyClasses += ` ${bodyClassName}`;
  footerClasses += ` ${footerClassName}`;
  
  return (
    <RNModal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}
      testID={testID}
    >
      <StyledTouchableOpacity
        className={backdropClasses}
        activeOpacity={1}
        onPress={closeOnBackdropPress ? onClose : undefined}
      >
        <StyledView 
          className={contentClasses}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {title && (
            <StyledView className={headerClasses}>
              <StyledText className="text-lg font-semibold text-text">{title}</StyledText>
            </StyledView>
          )}
          
          <StyledView className={bodyClasses}>
            {children}
          </StyledView>
          
          {footer && (
            <StyledView className={footerClasses}>
              {footer}
            </StyledView>
          )}
        </StyledView>
      </StyledTouchableOpacity>
    </RNModal>
  );
};

export default Modal;
