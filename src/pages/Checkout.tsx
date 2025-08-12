import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiCreditCard, FiTruck, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Customer } from '../types';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { state: authState } = useAuth();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const [customer, setCustomer] = useState<Customer>({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || '',
    address: {
      street: authState.user?.address?.street || '',
      city: authState.user?.address?.city || '',
      province: authState.user?.address?.province || '',
      postalCode: authState.user?.address?.postalCode || ''
    }
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  if (state.items.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCustomer(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Customer] as object || {}),
          [child]: value
        }
      }));
    } else {
      setCustomer(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment validation
      if (paymentMethod === 'card') {
        if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
          throw new Error('Please complete all card details');
        }
        
        // Basic card number validation (just for demo)
        if (cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
          throw new Error('Invalid card number');
        }
        
        // Simulate random payment failure for demo purposes
        if (Math.random() < 0.1) { // 10% chance of failure
          throw new Error('Payment declined. Please try again or use a different payment method.');
        }
      }
      
      // In a real app, this would send data to a backend
      setOrderPlaced(true);
      clearCart();
      
      // Add order to user's order history if authenticated
      if (authState.user) {
        // This would typically be done via API call
        console.log('Order added to user history');
      }
      
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCardDetailChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear any existing payment errors when user starts typing
    if (paymentError) {
      setPaymentError(null);
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(customer.firstName && customer.lastName && customer.email && 
                  customer.phone && customer.address.street && customer.address.city && 
                  customer.address.province && customer.address.postalCode);
      case 2:
        if (paymentMethod === 'card') {
          return !!(cardDetails.cardNumber && cardDetails.expiryDate && 
                   cardDetails.cvv && cardDetails.cardholderName);
        }
        return true; // Cash on delivery doesn't need validation
      default:
        return true;
    }
  };

  const proceedToNextStep = (nextStep: number) => {
    if (validateStep(step)) {
      setStep(nextStep);
      setPaymentError(null);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = state.total;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">
            Complete your order in just a few steps
          </p>
        </div>
        <Link 
          to="/cart" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="font-medium">Payment</span>
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customer.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customer.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={customer.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customer.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province *
                  </label>
                  <select
                    value={customer.address.province}
                    onChange={(e) => handleInputChange('address.province', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="North West">North West</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={customer.address.postalCode}
                    onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => proceedToNextStep(2)}
                  className="btn-primary"
                  disabled={!validateStep(1)}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Error Display */}
              {paymentError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">{paymentError}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                    <FiCreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer">
                    <FiTruck className="h-5 w-5" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <FiLock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Your payment information is secure and encrypted</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardholderName}
                      onChange={(e) => handleCardDetailChange('cardholderName', e.target.value)}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => {
                        // Format card number with spaces
                        const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                        if (value.length <= 19) { // 16 digits + 3 spaces
                          handleCardDetailChange('cardNumber', value);
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => {
                          // Format MM/YY
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
                            handleCardDetailChange('expiryDate', formatted);
                          }
                        }}
                        placeholder="MM/YY"
                        className="input-field"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            handleCardDetailChange('cvv', value);
                          }
                        }}
                        placeholder="123"
                        className="input-field"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <FiTruck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Cash on Delivery</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Pay with cash when your order is delivered. Please have the exact amount ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={() => proceedToNextStep(3)}
                  className="btn-primary"
                  disabled={!validateStep(2)}
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Review</h2>
              
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <p className="text-gray-600">
                  {customer.firstName} {customer.lastName}<br />
                  {customer.address.street}<br />
                  {customer.address.city}, {customer.address.province} {customer.address.postalCode}<br />
                  {customer.phone}
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  {paymentMethod === 'card' ? (
                    <>
                      <FiCreditCard className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-600">
                        Credit/Debit Card ending in {cardDetails.cardNumber.slice(-4) || '****'}
                      </span>
                    </>
                  ) : (
                    <>
                      <FiTruck className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-600">Cash on Delivery</span>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Error Display */}
              {paymentError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">{paymentError}</p>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline"
                  disabled={isProcessingPayment}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitOrder}
                  className="btn-primary"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              {/* Payment Status Indicator */}
              {step === 3 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <FiLock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">
                      {paymentMethod === 'card' ? 'Secure SSL Payment' : 'Cash Payment on Delivery'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 