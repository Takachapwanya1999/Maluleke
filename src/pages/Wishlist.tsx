import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import ProductCard from '../components/Product/ProductCard';

const Wishlist: React.FC = () => {
  const { state: authState } = useAuth();

  const wishlistProducts = useMemo(() => {
    if (!authState.user?.wishlist) return [];
    return products.filter(product => authState.user!.wishlist.includes(product.id));
  }, [authState.user?.wishlist]);

  if (!authState.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <FiHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your wishlist</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items and access them anytime by signing in to your account.
          </p>
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiShoppingBag className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {/* Wishlist Content */}
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRemoveFromWishlist={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FiHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-8">
            Start adding items to your wishlist by clicking the heart icon on products you love.
          </p>
          <Link
            to="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiShoppingBag className="h-5 w-5" />
            <span>Browse Products</span>
          </Link>
        </div>
      )}

      {/* Wishlist Tips */}
      {wishlistProducts.length > 0 && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Wishlist Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <span>Items in your wishlist are saved across all your devices</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <span>Share your wishlist with friends and family</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <span>Get notified when items go on sale</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <span>Move items directly to your cart when ready to buy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
