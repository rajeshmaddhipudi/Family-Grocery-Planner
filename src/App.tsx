import React, { useState } from 'react';
import { ShoppingBasket, X } from 'lucide-react';
import { GroceryList } from './components/GroceryList';
import { Cart } from './components/Cart';
import { groceryItems } from './data/groceries';
import { CartItem, GroceryItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: GroceryItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleShare = () => {
    // Format the message with categories
    const itemsByCategory = cartItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);

    const messageLines = [
      '🛒 *Grocery List*',
      '',
      ...Object.entries(itemsByCategory).flatMap(([category, items]) => [
        `*${category}*`,
        ...items.map((item) => `• ${item.quantity} ${item.unit} ${item.name}`),
        '' // Empty line after each category
      ]),
      '✅ Ready to order!'
    ];
    
    const message = messageLines.join('\n');

    // Create the WhatsApp share URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset the cart
    setCartItems([]);
  };

  // ... existing handleAddToCart, handleUpdateQuantity, and handleShare functions ...

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Grocery List
              </h1>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 lg:hidden"
            >
              <ShoppingBasket className="w-6 h-6 text-green-600" />
              <span className="text-sm text-gray-500">
                {cartItems.length} items
              </span>
            </button>
            <div className="hidden lg:block text-sm text-gray-500">
              {cartItems.length} items in cart
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GroceryList items={groceryItems} onAddToCart={handleAddToCart} />
          </div>
          <div className="hidden lg:block">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onShare={handleShare}
            />
          </div>
        </div>
      </main>

      {/* Mobile cart drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onShare={handleShare}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;