import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiShield, FiStar } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/Product/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to <br />
                <span className="text-yellow-300">Maluleke Cash&Carry</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                Your premier destination for quality products at unbeatable prices. 
                From fresh groceries to household essentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
                >
                  Shop Now
                </Link>
                <a 
                  href="#features" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                alt="Fresh groceries and products" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Maluleke Cash&Carry?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional service and quality products to our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We source only the finest products from trusted suppliers to ensure quality.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery service to get your products to you fresh.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your personal information and transactions are always safe and secure.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive prices that provide excellent value for money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular items loved by our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="btn-primary inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop" 
                alt="Our store" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                About Maluleke Cash&Carry
              </h2>
              <p className="text-lg text-gray-600">
                For years, we've been serving our community with dedication and pride. 
                Our mission is to provide quality products at affordable prices while 
                maintaining the highest standards of customer service.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're shopping for daily groceries, household essentials, or 
                special items, we have everything you need under one roof. Our friendly 
                staff is always ready to help you find exactly what you're looking for.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-2xl font-bold text-primary-600 mb-2">500+</h4>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-primary-600 mb-2">1000+</h4>
                  <p className="text-gray-600">Products Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Shop?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit our store today or browse our products online. We're here to serve you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Shop Online
            </Link>
            <a 
              href="tel:+27111234567" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 