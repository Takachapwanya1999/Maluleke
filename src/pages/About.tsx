import React from 'react';
import { FiAward, FiUsers, FiTruck, FiShield } from 'react-icons/fi';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About Maluleke Cash&Carry
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner for quality products at unbeatable prices. 
              Serving South African communities since 1995.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1995 by the Chap family, our cash and carry store began as a small 
                  community shop in Limpopo. With a vision to provide quality products at affordable 
                  prices, we've grown to become one of South Africa's most trusted retail destinations.
                </p>
                <p>
                  Today, we serve thousands of customers across all nine provinces, offering everything 
                  from fresh groceries to household essentials. Our commitment to excellence and 
                  community service remains at the heart of everything we do.
                </p>
                <p>
                  We understand the diverse needs of South African families and businesses, which is 
                  why we stock products that cater to all communities, with competitive pricing for 
                  both retail and wholesale customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=533&fit=crop" 
                alt="Bulk grocery items like rice and staple foods" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to our customers and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We source only the finest products from trusted suppliers to ensure quality in every purchase.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We're committed to supporting local communities and contributing to South Africa's growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600">
                Exceptional customer service and reliable delivery across all provinces.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through transparency, honesty, and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-gray-300">Three decades of serving South African communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">30+</div>
              <div className="text-gray-300">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">50,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">5,000+</div>
              <div className="text-gray-300">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">9</div>
              <div className="text-gray-300">Provinces Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600">
              The passionate team behind Maluleke Cash&Carry's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">JM</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Chap</h3>
              <p className="text-primary-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Visionary leader with 30+ years of retail experience, committed to serving South African communities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">SM</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Chap</h3>
              <p className="text-primary-600 mb-2">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Ensures smooth operations and maintains our high standards across all business areas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">TM</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thabo Chap</h3>
              <p className="text-primary-600 mb-2">Technology Director</p>
              <p className="text-gray-600 text-sm">
                Leading our digital transformation and e-commerce initiatives for the modern customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop With Us?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the Maluleke difference today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
