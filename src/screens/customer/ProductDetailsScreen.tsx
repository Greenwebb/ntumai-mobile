<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useProductsStore } from '../../store/productsStore';
import { useCartStore } from '../../store/cartStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { QuantitySelector } from '../../components/QuantitySelector';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const ProductDetailsScreen = ({ navigation, route }: any) => {
  const { productId } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  
  const { products, fetchProducts, isLoading } = useProductsStore();
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);
  
  const product = products.find(p => p.id === productId);
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigation.navigate('CartTab');
    }
  };
  
  if (isLoading || !product) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Product Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Product Details" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Product Image */}
        <StyledView className="w-full aspect-square bg-gray-100">
          <StyledText className="text-9xl text-center mt-16">🥗</StyledText>
        </StyledView>
        
        {/* Product Info */}
        <StyledView className="p-4">
          <StyledView className="flex-row justify-between items-start mb-2">
            <StyledText className="text-2xl font-bold flex-1">{product.name}</StyledText>
            <StyledView className="bg-primary/10 px-2 py-1 rounded">
              <StyledText className="text-primary font-medium">${product.price.toFixed(2)}</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row items-center mb-4">
            <StyledView className="flex-row items-center mr-4">
              <StyledText className="text-yellow-500 mr-1">★</StyledText>
              <StyledText className="text-gray-700">{product.rating}</StyledText>
            </StyledView>
            <StyledText className="text-gray-500">{product.reviews} reviews</StyledText>
          </StyledView>
          
          <StyledView className="mb-4">
            <StyledText className="text-lg font-medium mb-2">Description</StyledText>
            <StyledText className="text-gray-600 leading-5">{product.description}</StyledText>
          </StyledView>
          
          <StyledView className="mb-4">
            <StyledText className="text-lg font-medium mb-2">Vendor</StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
                <StyledText>🏪</StyledText>
              </StyledView>
              <StyledText className="text-gray-700">{product.vendor}</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="mb-6">
            <StyledText className="text-lg font-medium mb-2">Quantity</StyledText>
            <QuantitySelector
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={10}
            />
          </StyledView>
          
          <StyledView className="flex-row items-center mb-4">
            <StyledText className="text-lg font-medium mr-2">Total:</StyledText>
            <StyledText className="text-xl font-bold text-primary">
              ${(product.price * quantity).toFixed(2)}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
      
      {/* Bottom Action Bar */}
      <StyledView className="p-4 border-t border-gray-200">
        <Button
          title="Add to Cart"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleAddToCart}
        />
      </StyledView>
    </StyledSafeAreaView>
  );
};
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface ProductOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  options?: ProductOption[];
  variants?: ProductVariant[];
}

interface ProductDetailsScreenProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, selectedOptions?: any) => void;
  onBack: () => void;
  onViewReviews: () => void;
  onViewStore: (vendorId: string) => void;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  onAddToCart,
  onBack,
  onViewReviews,
  onViewStore,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOptionSelect = (optionId: string, choiceId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: choiceId,
    });
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, {
      options: selectedOptions,
      variantId: selectedVariant,
    });
  };

  // Calculate total price including options
  const calculateTotalPrice = (): number => {
    let basePrice = product.discountPrice || product.price;
    
    // Add selected variant price if any
    if (selectedVariant && product.variants) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      if (variant) {
        basePrice = variant.price;
      }
    }
    
    // Add selected options prices
    let optionsPrice = 0;
    if (product.options) {
      product.options.forEach(option => {
        const selectedChoiceId = selectedOptions[option.id];
        if (selectedChoiceId) {
          const choice = option.choices.find(c => c.id === selectedChoiceId);
          if (choice) {
            optionsPrice += choice.price;
          }
        }
      });
    }
    
    return (basePrice + optionsPrice) * quantity;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <View style={styles.mainImageContainer}>
            <Text style={styles.imagePlaceholder}>🖼️</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsContainer}
          >
            {[1, 2, 3, 4].map((_, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.thumbnailContainer,
                  activeImageIndex === index && styles.activeThumbnail
                ]}
                onPress={() => setActiveImageIndex(index)}
              >
                <Text style={styles.thumbnailPlaceholder}>🖼️</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <TouchableOpacity 
            style={styles.storeContainer}
            onPress={() => onViewStore(product.vendorId)}
          >
            <Text style={styles.storeText}>{product.vendorName}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.ratingContainer}
            onPress={onViewReviews}
          >
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </TouchableOpacity>
          
          <View style={styles.priceContainer}>
            {product.discountPrice ? (
              <>
                <Text style={styles.discountPrice}>${product.discountPrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
              </>
            ) : (
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            )}
          </View>
        </View>

        {/* Product Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description || 'No description available.'}</Text>
        </View>

        {/* Product Options */}
        {product.options && product.options.length > 0 && (
          <View style={styles.optionsContainer}>
            {product.options.map(option => (
              <View key={option.id} style={styles.optionSection}>
                <Text style={styles.optionTitle}>{option.name}</Text>
                <View style={styles.choicesContainer}>
                  {option.choices.map(choice => (
                    <TouchableOpacity
                      key={choice.id}
                      style={[
                        styles.choiceButton,
                        selectedOptions[option.id] === choice.id && styles.selectedChoiceButton
                      ]}
                      onPress={() => handleOptionSelect(option.id, choice.id)}
                    >
                      <Text 
                        style={[
                          styles.choiceText,
                          selectedOptions[option.id] === choice.id && styles.selectedChoiceText
                        ]}
                      >
                        {choice.name}
                      </Text>
                      {choice.price > 0 && (
                        <Text 
                          style={[
                            styles.choicePriceText,
                            selectedOptions[option.id] === choice.id && styles.selectedChoiceText
                          ]}
                        >
                          +${choice.price.toFixed(2)}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Product Variants */}
        {product.variants && product.variants.length > 0 && (
          <View style={styles.variantsContainer}>
            <Text style={styles.sectionTitle}>Variants</Text>
            <View style={styles.variantsGrid}>
              {product.variants.map(variant => (
                <TouchableOpacity
                  key={variant.id}
                  style={[
                    styles.variantButton,
                    selectedVariant === variant.id && styles.selectedVariantButton,
                    !variant.inStock && styles.outOfStockVariantButton
                  ]}
                  onPress={() => handleVariantSelect(variant.id)}
                  disabled={!variant.inStock}
                >
                  <Text 
                    style={[
                      styles.variantText,
                      selectedVariant === variant.id && styles.selectedVariantText,
                      !variant.inStock && styles.outOfStockVariantText
                    ]}
                  >
                    {variant.name}
                  </Text>
                  <Text 
                    style={[
                      styles.variantPriceText,
                      selectedVariant === variant.id && styles.selectedVariantText,
                      !variant.inStock && styles.outOfStockVariantText
                    ]}
                  >
                    ${variant.price.toFixed(2)}
                  </Text>
                  {!variant.inStock && (
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleDecreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleIncreaseQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>
            Add to Cart - ${calculateTotalPrice().toFixed(2)}
          </Text>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    padding: 16,
  },
  mainImageContainer: {
    height: 300,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    fontSize: 48,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  thumbnailContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: colors.primary.DEFAULT,
  },
  thumbnailPlaceholder: {
    fontSize: 24,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  productName: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  storeContainer: {
    marginBottom: 8,
  },
  storeText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
    color: colors.status.warning,
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  discountPrice: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  optionsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  optionSection: {
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choiceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border.medium,
    backgroundColor: colors.background.primary,
  },
  selectedChoiceButton: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
  },
  choiceText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  selectedChoiceText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  choicePriceText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: 2,
  },
  variantsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  variantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variantButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.medium,
    backgroundColor: colors.background.primary,
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedVariantButton: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
  },
  outOfStockVariantButton: {
    borderColor: colors.border.light,
    backgroundColor: colors.neutral.gray100,
  },
  variantText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: 4,
  },
  selectedVariantText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  outOfStockVariantText: {
    color: colors.text.tertiary,
  },
  variantPriceText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
  },
  outOfStockText: {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
    marginTop: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  quantityText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default ProductDetailsScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
