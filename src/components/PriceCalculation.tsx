import React, { useEffect } from 'react';
import { Calculator, DollarSign } from 'lucide-react';

interface PriceCalculationProps {
  orderData: any;
  updateOrderData: (updates: any) => void;
  calculateTotals: (items: any[], discount: number, shipping: number, taxRate?: number) => any;
}

const PriceCalculation: React.FC<PriceCalculationProps> = ({ 
  orderData, 
  updateOrderData, 
  calculateTotals 
}) => {
  useEffect(() => {
    const totals = calculateTotals(orderData.items, orderData.discount, orderData.shipping);
    updateOrderData(totals);
  }, [orderData.items, orderData.discount, orderData.shipping]);

  const currencySymbol = orderData.currency === 'USD' ? '$' : 
                        orderData.currency === 'EUR' ? '€' : 
                        orderData.currency === 'GBP' ? '£' : '$';

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Price Calculation</h2>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
        <div className="space-y-3">
          {orderData.items.map((item: any, index: number) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity} × {currencySymbol}{item.rate.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {currencySymbol}{(item.quantity * item.rate).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Adjustments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Discount ({currencySymbol})
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              min="0"
              value={orderData.discount}
              onChange={(e) => updateOrderData({ discount: parseFloat(e.target.value) || 0 })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Shipping ({currencySymbol})
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              min="0"
              value={orderData.shipping}
              onChange={(e) => updateOrderData({ shipping: parseFloat(e.target.value) || 0 })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Final Calculations */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Gross Amount:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currencySymbol}{orderData.gross?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Tax (10%):</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currencySymbol}{orderData.tax?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Discount:</span>
            <span className="font-medium text-red-600">
              -{currencySymbol}{orderData.discount?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currencySymbol}{orderData.shipping?.toFixed(2) || '0.00'}
            </span>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-900 dark:text-white">Net Amount:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {currencySymbol}{orderData.net?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
      </div>

      {orderData.items.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            ✓ Order ready for submission with {orderData.items.length} items
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCalculation;
