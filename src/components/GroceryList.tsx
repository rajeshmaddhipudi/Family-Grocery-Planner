import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { GroceryItem } from '../types';

interface Props {
  items: GroceryItem[];
  onAddToCart: (item: GroceryItem) => void;
}

export function GroceryList({ items, onAddToCart }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<GroceryItem['category']>('Vegetables');
  const categories: GroceryItem['category'][] = ['Vegetables', 'Dairy', 'Cosmetics', 'Kids'];

  const filteredItems = items.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm p-2 gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Per {item.unit}</p>
              </div>
              <button
                onClick={() => onAddToCart(item)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                aria-label={`Add ${item.name} to cart`}
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}