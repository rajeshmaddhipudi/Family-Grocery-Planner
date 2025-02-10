export type Unit = 'kg' | 'g' | 'pcs' | 'pack';

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Vegetables' | 'Dairy' | 'Cosmetics' | 'Kids' | 'Indian Store' ;
  unit: Unit;
}

export interface CartItem extends GroceryItem {
  quantity: number;
}