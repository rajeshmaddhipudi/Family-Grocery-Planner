import React, { useState } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { GroceryList } from './components/GroceryList';
import { Cart } from './components/Cart';
import { groceryItems } from './data/groceries';
import { CartItem, GroceryItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

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

  const handleSendToWhatsApp = () => {
    if (!showPhoneInput) {
      setShowPhoneInput(true);
      return;
    }

    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return;
    }

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

    // Clean the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');

    // Create the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset the form
    setCartItems([]);
    setPhoneNumber('');
    setShowPhoneInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Grocery Planner
              </h1>
            </div>
            <div className="text-sm text-gray-500">
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
          <div>
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onSendToWhatsApp={handleSendToWhatsApp}
              showPhoneInput={showPhoneInput}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;