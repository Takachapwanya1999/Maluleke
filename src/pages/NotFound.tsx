import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-primary-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-900 mb-2">Page not found</p>
      <p className="text-gray-600 mb-8 max-w-lg">
        Sorry, we couldn’t find the page you’re looking for. It may have been moved or deleted.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700">
          Go home
        </Link>
        <Link to="/products" className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
          Browse products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
