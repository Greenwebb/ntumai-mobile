import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

// Define the product interface
interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image?: string;
  store?: string;
  rating?: number;
  isFavorite?: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: (product: Product) => void;
  onFavoritePress?: (id: string) => void;
  style?: ViewStyle;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onFavoritePress,
  style,
}) => {
  const {
    id,
    name,
    price,
    discountedPrice,
    image,
    store,
    isFavorite,
    description,
  } = product;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-xl overflow-hidden shadow-md m-2"
    >
      <View style={styles.imageContainer} className="relative">
        {image ? (
          <Image source={{ uri: image }} style={styles.image} className="w-full h-32" />
        ) : (
          <View style={styles.placeholderImage} className="w-full h-32 bg-gray-100 justify-center items-center">
            <Text>🖼️</Text>
          </View>
        )}
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress && onFavoritePress(id)}
          className="absolute top-2 right-2 bg-white rounded-full p-1"
        >
          <Text>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer} className="p-3">
        <Text style={styles.name} numberOfLines={1} className="text-gray-800 font-bold">
          {name}
        </Text>
        
        {store && (
          <Text style={styles.store} numberOfLines={1} className="text-gray-500 text-xs mb-1">
            {store}
          </Text>
        )}
        
        {description && (
          <Text style={styles.description} numberOfLines={2} className="text-gray-500 text-xs mb-2">
            {description}
          </Text>
        )}
        
        <View style={styles.bottomRow} className="flex-row justify-between items-center mt-1">
          <View style={styles.priceContainer}>
            {discountedPrice ? (
              <>
                <Text style={styles.discountedPrice} className="text-primary font-bold">
                  ${discountedPrice}
                </Text>
                <Text style={styles.originalPrice} className="text-gray-400 line-through text-xs ml-1">
                  ${price}
                </Text>
              </>
            ) : (
              <Text style={styles.price} className="text-primary font-bold">
                ${price}
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart && onAddToCart(product)}
            className="bg-secondary rounded-full w-8 h-8 justify-center items-center"
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
  },
  placeholderImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.neutral.white,
    borderRadius: 100,
    padding: 4,
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  store: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  discountedPrice: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: colors.secondary.DEFAULT,
    borderRadius: 100,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.neutral.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ProductCard;
