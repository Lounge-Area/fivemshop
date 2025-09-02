import React from 'react';
import { Wrench, Apple, Smartphone, Grid3x3, Zap, Target, Settings, Bomb, Car, Shirt, Heart, PenTool as Tool, FlaskRound as Flask, Home, FileText } from 'lucide-react';
import { CategoryWithSubcategories } from '../types/product';

interface CategoryFilterProps {
  categories: CategoryWithSubcategories[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onSubcategorySelect: (subcategoryId: string | null) => void;
}

const getCategoryIcon = (iconName: string) => {
  const icons = {
    zap: Zap,
    target: Target,
    settings: Settings,
    bomb: Bomb,
    car: Car,
    shirt: Shirt,
    heart: Heart,
    tool: Tool,
    flask: Flask,
    home: Home,
    'file-text': FileText,
    wrench: Wrench,
    apple: Apple,
    smartphone: Smartphone,
    grid3x3: Grid3x3
  };
  const IconComponent = icons[iconName as keyof typeof icons] || Grid3x3;
  return <IconComponent className="w-5 h-5" />;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      
      {/* All Products Button */}
      <button
        onClick={() => {
          onCategorySelect(null);
          onSubcategorySelect(null);
        }}
        className={`w-full text-left p-3 rounded-lg mb-2 flex items-center space-x-3 transition-all ${
          !selectedCategory
            ? 'bg-red-50 text-red-700 border-2 border-red-200'
            : 'hover:bg-gray-50 border-2 border-transparent'
        }`}
      >
        <Grid3x3 className="w-5 h-5" />
        <span className="font-medium">All Products</span>
      </button>

      {/* Category List */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => {
                onCategorySelect(category.id);
                onSubcategorySelect(null);
              }}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                selectedCategory === category.id
                  ? 'bg-red-50 text-red-700 border-2 border-red-200'
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getCategoryIcon(category.icon)}
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {category.subcategories?.reduce((acc, sub) => acc + (sub.count || 0), 0) || 0}
              </span>
            </button>

            {/* Subcategories */}
            {selectedCategory === category.id && category.subcategories && (
              <div className="ml-6 mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => onSubcategorySelect(subcategory.id)}
                    className={`w-full text-left p-2 rounded-md text-sm flex items-center justify-between transition-all ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-red-100 text-red-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{subcategory.name}</span>
                    <span className="text-xs text-gray-400">({subcategory.count || 0})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};