import React, { useState, useMemo, useCallback } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/Product/ProductCard';
import SearchComponent from '../components/Search/SearchComponent';

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, []);

  const handleFilteredProducts = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover our wide range of quality products at great prices
        </p>
      </div>

      {/* Advanced Search Component */}
      <SearchComponent
        products={products}
        onFilteredProducts={handleFilteredProducts}
        categories={categories}
      />

      {/* View Toggle and Results */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} products
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'grid' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <FiGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'list' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <FiList className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;
