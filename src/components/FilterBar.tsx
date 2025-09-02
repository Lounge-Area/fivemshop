import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  searchTerm: string;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onClearFilters: () => void;
  productCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  selectedSubcategory,
  searchTerm,
  sortBy,
  onSortChange,
  onClearFilters,
  productCount
}) => {
  const hasActiveFilters = selectedCategory || searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">
              {productCount} {productCount === 1 ? 'product' : 'products'} found
            </span>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <X className="w-4 h-4" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                Category: {selectedCategory}
              </span>
            )}
            {selectedSubcategory && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                Subcategory: {selectedSubcategory}
              </span>
            )}
            {searchTerm && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                Search: "{searchTerm}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};