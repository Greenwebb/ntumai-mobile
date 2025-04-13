import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextInput as CustomTextInput } from '../../components/TextInput';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const AddProductScreen = ({ navigation, route }: any) => {
  const { productId } = route.params || {};
  const isEditing = !!productId;
  
  const { 
    products, 
    categories,
    fetchCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoading 
  } = useVendorStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    isActive: true
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    stock?: string;
  }>({});
  
  useEffect(() => {
    fetchCategories();
    
    if (isEditing) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          category: product.category || '',
          stock: product.stock?.toString() || '',
          isActive: product.isActive !== false
        });
      }
    }
  }, [productId]);
  
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      description?: string;
      price?: string;
      category?: string;
      stock?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      try {
        if (isEditing) {
          await updateProduct(productId, productData);
        } else {
          await addProduct(productData);
        }
        navigation.goBack();
      } catch (error) {
        console.error('Product save error:', error);
      }
    }
  };
  
  const handleDelete = async () => {
    if (isEditing) {
      try {
        await deleteProduct(productId);
        navigation.goBack();
      } catch (error) {
        console.error('Product delete error:', error);
      }
    }
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title={isEditing ? "Edit Product" : "Add Product"} 
        onBack={() => navigation.goBack()} 
      />
      
      <StyledScrollView className="flex-1 p-4">
        {/* Product Image */}
        <StyledView className="items-center mb-6">
          <StyledView className="w-32 h-32 bg-gray-100 rounded-lg items-center justify-center">
            <StyledText className="text-5xl">🥗</StyledText>
          </StyledView>
          <StyledTouchableOpacity className="mt-2">
            <StyledText className="text-primary">Upload Image</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        
        {/* Form Fields */}
        <CustomTextInput
          label="Product Name"
          placeholder="Enter product name"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          error={errors.name}
        />
        
        <CustomTextInput
          label="Description"
          placeholder="Enter product description"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
          numberOfLines={4}
          error={errors.description}
        />
        
        <CustomTextInput
          label="Price ($)"
          placeholder="Enter price"
          value={formData.price}
          onChangeText={(text) => handleInputChange('price', text)}
          keyboardType="decimal-pad"
          error={errors.price}
        />
        
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-1">Category</StyledText>
          <StyledView className="border border-gray-300 rounded-lg p-2">
            <StyledText>Select Category (Dropdown)</StyledText>
          </StyledView>
          {errors.category && (
            <StyledText className="text-red-500 text-sm mt-1">{errors.category}</StyledText>
          )}
        </StyledView>
        
        <CustomTextInput
          label="Stock Quantity"
          placeholder="Enter available stock"
          value={formData.stock}
          onChangeText={(text) => handleInputChange('stock', text)}
          keyboardType="number-pad"
          error={errors.stock}
        />
        
        <StyledView className="flex-row items-center mb-6">
          <StyledTouchableOpacity
            className="w-6 h-6 border border-gray-300 rounded mr-2 items-center justify-center"
            onPress={() => handleInputChange('isActive', !formData.isActive)}
          >
            {formData.isActive && (
              <StyledText className="text-primary">✓</StyledText>
            )}
          </StyledTouchableOpacity>
          <StyledText>Product is active and available for sale</StyledText>
        </StyledView>
        
        <Button
          title={isEditing ? "Update Product" : "Add Product"}
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onPress={handleSubmit}
          style={{ marginBottom: 16 }}
        />
        
        {isEditing && (
          <Button
            title="Delete Product"
            variant="danger"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleDelete}
          />
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
