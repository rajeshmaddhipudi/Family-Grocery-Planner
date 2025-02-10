import React from 'react';
import { Minus, Plus, Send } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onSendToWhatsApp: () => void;
  showPhoneInput: boolean;
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onSendToWhatsApp,
  showPhoneInput,
  phoneNumber,
  onPhoneNumberChange,
}: Props) {
  const total = items.length;

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart ({total} items)</h2>
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
          <div key={category}>
            <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
            <div className="space-y-3">
              {categoryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Per {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showPhoneInput && (
        <div className="mt-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Enter WhatsApp Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="e.g., +1234567890"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
      )}

      <button
        onClick={onSendToWhatsApp}
        className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {showPhoneInput ? 'Send to WhatsApp' : 'Continue to WhatsApp'}
      </button>
    </div>
  );
}