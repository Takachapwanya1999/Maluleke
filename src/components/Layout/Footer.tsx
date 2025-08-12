import React from 'react';
import logoMark from '../../assets/logo-mark.svg';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoMark} alt="Maluleke Cash&Carry logo" className="h-8 w-8" />
              <span className="text-xl font-bold">Maluleke Cash&Carry</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted neighborhood store for quality products at affordable prices. 
              Serving the community with excellence since our establishment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Fresh Produce
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Grains & Cereals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Meat & Poultry
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Household Items
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FiMapPin className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Main Street, Johannesburg, South Africa
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">+27 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">info@chapstore.co.za</span>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              <p className="font-semibold">Store Hours:</p>
              <p>Mon-Fri: 8:00 AM - 7:00 PM</p>
              <p>Sat: 8:00 AM - 6:00 PM</p>
              <p>Sun: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Maluleke Cash&Carry. All rights reserved. Built with ❤️ for our community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 