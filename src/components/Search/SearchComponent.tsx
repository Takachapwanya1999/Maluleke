import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { Product } from '../../types';

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface SearchComponentProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
  categories: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  products,
  onFilteredProducts,
  categories
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    priceRange: [0, 1000],
    minRating: 0,
    inStockOnly: false,
    sortBy: 'name'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Calculate max price for slider
  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price));
  }, [products]);

  // Generate search suggestions
  useEffect(() => {
    if (filters.query.length > 1) {
      const productNames = products.map(p => p.name.toLowerCase());
      const matchingSuggestions = productNames
        .filter(name => name.includes(filters.query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matchingSuggestions);
      setShowSuggestions(matchingSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.query, products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Text search
      const matchesQuery = filters.query === '' || 
        product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.query.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === '' || product.category === filters.category;

      // Price range filter
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = product.rating >= filters.minRating;

      // Stock filter
      const matchesStock = !filters.inStockOnly || product.inStock;

      return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          // For now, sort by ID (assuming higher ID = newer)
          return b.id.localeCompare(a.id);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filters]);

  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const handleFilterChange = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      priceRange: [0, maxPrice],
      minRating: 0,
      inStockOnly: false,
      sortBy: 'name'
    });
  };

  const hasActiveFilters = filters.category !== '' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice || 
    filters.minRating > 0 || 
    filters.inStockOnly ||
    filters.sortBy !== 'name';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  handleFilterChange('query', suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Toggle and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiFilter size={16} />
            Filters
            {hasActiveFilters && (
              <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-0.5">
                Active
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FiX size={14} />
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as SearchFilters['sortBy'])}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: R{filters.priceRange[0]} - R{filters.priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  In Stock Only
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
};

export default SearchComponent;
