import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  inStock: boolean;
  images: string[];
  variants?: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
  }[];
}

interface AddProductScreenProps {
  categories: {
    id: string;
    name: string;
  }[];
  onSave: (productData: ProductFormData) => void;
  onCancel: () => void;
  onBack: () => void;
  onUploadImage: () => Promise<string>;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({
  categories,
  onSave,
  onCancel,
  onBack,
  onUploadImage,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'images' | 'variants'>('general');
  const [productData, setProductData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    inStock: true,
    images: [],
    variants: [],
  });
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    category?: string;
    images?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      price?: string;
      category?: string;
      images?: string;
    } = {};

    if (!productData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (productData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!productData.category) {
      newErrors.category = 'Please select a category';
    }

    if (productData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(productData);
    }
  };

  const handleAddImage = async () => {
    try {
      const imageUrl = await onUploadImage();
      setProductData({
        ...productData,
        images: [...productData.images, imageUrl],
      });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...productData.images];
    updatedImages.splice(index, 1);
    setProductData({
      ...productData,
      images: updatedImages,
    });
  };

  const handleAddVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      name: '',
      price: productData.price,
      inStock: true,
    };
    
    setProductData({
      ...productData,
      variants: [...(productData.variants || []), newVariant],
    });
  };

  const handleRemoveVariant = (variantId: string) => {
    const updatedVariants = productData.variants?.filter(
      variant => variant.id !== variantId
    );
    
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'general' && styles.activeTab
          ]}
          onPress={() => setActiveTab('general')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'general' && styles.activeTabText
            ]}
          >
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'images' && styles.activeTab
          ]}
          onPress={() => setActiveTab('images')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'images' && styles.activeTabText
            ]}
          >
            Images
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'variants' && styles.activeTab
          ]}
          onPress={() => setActiveTab('variants')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'variants' && styles.activeTabText
            ]}
          >
            Variants
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'general' && (
          <View style={styles.formSection}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Product Name *</Text>
              <View 
                style={[
                  styles.input,
                  errors.name ? styles.inputError : null
                ]}
              >
                <Text style={styles.inputText}>
                  {productData.name || 'Enter product name'}
                </Text>
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <View style={styles.textareaInput}>
                <Text style={styles.inputText}>
                  {productData.description || 'Enter product description'}
                </Text>
              </View>
            </View>

            {/* Price Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price *</Text>
              <View 
                style={[
                  styles.input,
                  errors.price ? styles.inputError : null
                ]}
              >
                <Text style={styles.inputText}>
                  {productData.price > 0 ? `$${productData.price.toFixed(2)}` : 'Enter price'}
                </Text>
              </View>
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            {/* Discount Price Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Discount Price (Optional)</Text>
              <View style={styles.input}>
                <Text style={styles.inputText}>
                  {productData.discountPrice ? `$${productData.discountPrice.toFixed(2)}` : 'Enter discount price'}
                </Text>
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category *</Text>
              <View 
                style={[
                  styles.input,
                  errors.category ? styles.inputError : null
                ]}
              >
                <Text style={styles.inputText}>
                  {categories.find(c => c.id === productData.category)?.name || 'Select category'}
                </Text>
              </View>
              {errors.category && (
                <Text style={styles.errorText}>{errors.category}</Text>
              )}
            </View>

            {/* In Stock Toggle */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>In Stock</Text>
              <TouchableOpacity 
                style={[
                  styles.toggle,
                  productData.inStock ? styles.toggleOn : styles.toggleOff
                ]}
                onPress={() => setProductData({
                  ...productData,
                  inStock: !productData.inStock
                })}
              >
                <View 
                  style={[
                    styles.toggleHandle,
                    productData.inStock ? styles.toggleHandleOn : styles.toggleHandleOff
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'images' && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Product Images</Text>
            {errors.images && (
              <Text style={styles.errorText}>{errors.images}</Text>
            )}
            
            <View style={styles.imagesContainer}>
              {/* Add Image Button */}
              <TouchableOpacity 
                style={styles.addImageButton}
                onPress={handleAddImage}
              >
                <Text style={styles.addImageIcon}>+</Text>
                <Text style={styles.addImageText}>Add Image</Text>
              </TouchableOpacity>
              
              {/* Image Previews */}
              {productData.images.map((image, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <View style={styles.imagePreview}>
                    <Text style={styles.imagePreviewPlaceholder}>🖼️</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Text style={styles.removeImageButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'variants' && (
          <View style={styles.formSection}>
            <View style={styles.variantsHeader}>
              <Text style={styles.sectionTitle}>Product Variants</Text>
              <TouchableOpacity 
                style={styles.addVariantButton}
                onPress={handleAddVariant}
              >
                <Text style={styles.addVariantButtonText}>+ Add Variant</Text>
              </TouchableOpacity>
            </View>
            
            {productData.variants && productData.variants.length > 0 ? (
              <View style={styles.variantsContainer}>
                {productData.variants.map((variant, index) => (
                  <View key={variant.id} style={styles.variantCard}>
                    <View style={styles.variantHeader}>
                      <Text style={styles.variantTitle}>Variant {index + 1}</Text>
                      <TouchableOpacity 
                        style={styles.removeVariantButton}
                        onPress={() => handleRemoveVariant(variant.id)}
                      >
                        <Text style={styles.removeVariantButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Variant Name Input */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Variant Name</Text>
                      <View style={styles.input}>
                        <Text style={styles.inputText}>
                          {variant.name || 'Enter variant name (e.g., "Small", "Red")'}
                        </Text>
                      </View>
                    </View>
                    
                    {/* Variant Price Input */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Price</Text>
                      <View style={styles.input}>
                        <Text style={styles.inputText}>
                          {variant.price > 0 ? `$${variant.price.toFixed(2)}` : 'Enter price'}
                        </Text>
                      </View>
                    </View>
                    
                    {/* Variant In Stock Toggle */}
                    <View style={styles.toggleContainer}>
                      <Text style={styles.toggleLabel}>In Stock</Text>
                      <TouchableOpacity 
                        style={[
                          styles.toggle,
                          variant.inStock ? styles.toggleOn : styles.toggleOff
                        ]}
                        onPress={() => {
                          const updatedVariants = productData.variants?.map(v => 
                            v.id === variant.id ? { ...v, inStock: !v.inStock } : v
                          );
                          setProductData({
                            ...productData,
                            variants: updatedVariants,
                          });
                        }}
                      >
                        <View 
                          style={[
                            styles.toggleHandle,
                            variant.inStock ? styles.toggleHandleOn : styles.toggleHandleOff
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyVariantsContainer}>
                <Text style={styles.emptyVariantsText}>
                  No variants added yet. Add variants if your product comes in different options like sizes or colors.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.DEFAULT,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textareaInput: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
  },
  inputText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  toggleOn: {
    backgroundColor: colors.primary.DEFAULT,
  },
  toggleOff: {
    backgroundColor: colors.neutral.gray300,
  },
  toggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutral.white,
  },
  toggleHandleOn: {
    marginLeft: 'auto',
  },
  toggleHandleOff: {
    marginLeft: 0,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  addImageIcon: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
    marginBottom: 4,
  },
  addImageText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary.DEFAULT,
  },
  imagePreviewContainer: {
    position: 'relative',
    margin: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreviewPlaceholder: {
    fontSize: 32,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.status.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  variantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addVariantButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary.light,
    borderRadius: 8,
  },
  addVariantButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
  },
  variantsContainer: {
    gap: 16,
  },
  variantCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  variantTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  removeVariantButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeVariantButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
  },
  emptyVariantsContainer: {
    padding: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyVariantsText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  saveButton: {
    flex: 2,
    height: 48,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default AddProductScreen;
