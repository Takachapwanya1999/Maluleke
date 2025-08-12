import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiTrash2 } from 'react-icons/fi';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  showRemoveFromWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode = 'grid',
  showRemoveFromWishlist = false 
}) => {
  const { addItem } = useCart();
  const { state: authState, addToWishlist, removeFromWishlist } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!authState.isAuthenticated) {
      // Could trigger login modal here
      alert('Please sign in to add items to your wishlist');
      return;
    }

    const isInWishlist = authState.user?.wishlist.includes(product.id);
    if (isInWishlist || showRemoveFromWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const isInWishlist = authState.user?.wishlist.includes(product.id) || false;

  if (viewMode === 'list') {
    return (
      <Link to={`/products/${product.id}`} className="group">
        <div className="card hover:shadow-lg transition-shadow duration-300 flex">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-l-lg w-48 h-32">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                SALE
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <FiHeart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiShoppingCart className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="card hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <FiHeart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              SALE
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {product.description}
            </p>
            
            <div className="flex items-center space-x-1 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-sm font-medium text-green-600">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <FiShoppingCart className="h-4 w-4" />
              <span className="font-medium">
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
          </div>
        </div>

        {/* Remove from Wishlist (for wishlist page) */}
        {showRemoveFromWishlist && (
          <div className="px-4 pb-4">
            <button
              onClick={handleWishlistToggle}
              className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
            >
              <FiTrash2 className="h-4 w-4" />
              <span className="font-medium">Remove from Wishlist</span>
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
