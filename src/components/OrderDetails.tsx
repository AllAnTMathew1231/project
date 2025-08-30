import React, { useState } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  rate: number;
}

interface OrderDetailsProps {
  orderData: any;
  updateOrderData: (updates: any) => void;
  products: any[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderData, updateOrderData, products }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  const addItem = () => {
    if (!selectedProduct) {
      toast.error('Please select a product');
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: product.name,
      brand: product.brand,
      quantity: 1,
      rate: product.rate
    };

    const updatedItems = [...orderData.items, newItem];
    updateOrderData({ items: updatedItems });
    setSelectedProduct('');
    toast.success('Item added to order');
  };

  const removeItem = (itemId: string) => {
    const updatedItems = orderData.items.filter((item: OrderItem) => item.id !== itemId);
    updateOrderData({ items: updatedItems });
    toast.success('Item removed from order');
  };

  const updateItem = (itemId: string, field: string, value: any) => {
    const updatedItems = orderData.items.map((item: OrderItem) => 
      item.id === itemId ? { ...item, [field]: value } : item
    );
    updateOrderData({ items: updatedItems });
  };

  const brands = [...new Set(products.map(p => p.brand))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Details</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Primary Brand
        </label>
        <select
          value={orderData.brand}
          onChange={(e) => updateOrderData({ brand: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select primary brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Add Item Section */}
      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Items</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.brand} (${product.rate})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addItem}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Items ({orderData.items.length})</h3>
        
        {orderData.items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No items added yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Use the form above to add products to your order</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.items.map((item: OrderItem, index: number) => (
              <div key={item.id} className="p-4 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rate ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Total</label>
                    <p className="font-bold text-gray-900 dark:text-white py-2">
                      ${(item.quantity * item.rate).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;