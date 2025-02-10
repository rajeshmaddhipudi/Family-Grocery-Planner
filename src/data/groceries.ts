import { GroceryItem } from '../types';

export const groceryItems: GroceryItem[] = [
  // Vegetables
  { id: 'v1', name: 'Tomatoes', category: 'Vegetables', unit: 'kg' },
  { id: 'v2', name: 'Potatoes', category: 'Vegetables', unit: 'kg' },
  { id: 'v3', name: 'Carrots', category: 'Vegetables', unit: 'kg' },
  { id: 'v4', name: 'Spinach', category: 'Vegetables', unit: 'g' },
  { id: 'v5', name: 'Onions', category: 'Vegetables', unit: 'kg' },

  // Dairy
  { id: 'd1', name: 'Milk', category: 'Dairy', unit: 'pack' },
  { id: 'd2', name: 'Cheese', category: 'Dairy', unit: 'g' },
  { id: 'd3', name: 'Yogurt', category: 'Dairy', unit: 'pack' },
  { id: 'd4', name: 'Butter', category: 'Dairy', unit: 'pack' },
  { id: 'd5', name: 'Cream', category: 'Dairy', unit: 'pack' },

  // Cosmetics
  { id: 'c1', name: 'Shampoo', category: 'Cosmetics', unit: 'pcs' },
  { id: 'c2', name: 'Soap', category: 'Cosmetics', unit: 'pcs' },
  { id: 'c3', name: 'Toothpaste', category: 'Cosmetics', unit: 'pcs' },
  { id: 'c4', name: 'Deodorant', category: 'Cosmetics', unit: 'pcs' },
  { id: 'c5', name: 'Face Cream', category: 'Cosmetics', unit: 'pcs' },

  // Kids
  { id: 'k1', name: 'Diapers', category: 'Kids', unit: 'pcs' },
  { id: 'k2', name: 'Baby Wipes', category: 'Kids', unit: 'pack' },
  { id: 'k3', name: 'Baby Food', category: 'Kids', unit: 'pcs' },
  { id: 'k4', name: 'Baby Powder', category: 'Kids', unit: 'pcs' },
  { id: 'k5', name: 'Baby Lotion', category: 'Kids', unit: 'pcs' },

  //Indian Store

  { id: 'I1', name: 'Rice', category: 'Indian Store', unit: 'kg' },
  { id: 'I2', name: 'Dal', category: 'Indian Store', unit: 'kg' },
];