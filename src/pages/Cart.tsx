import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiPlus, FiMinus, FiX, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <FiShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {state.items.length} {state.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/products/${item.product.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">{item.product.category}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(item.product.price)}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Remove item"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(state.total * 0.15)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(state.total * 1.15)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full btn-primary mt-6 text-center block"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 