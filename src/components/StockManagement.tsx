import React, { useState, useEffect } from 'react';
import { Package, Edit3, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import Layout from './Layout';
import { apiService, mockProducts } from '../utils/api';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  brand: string;
  rate: number;
  stock: number;
}

const StockManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId: string, newStock: number) => {
    try {
      await apiService.updateStock(productId, newStock);
      setProducts(products.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      ));
      setEditingProduct(null);
      toast.success('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: 'out', color: 'red', text: 'Out of Stock' };
    if (stock < 10) return { status: 'low', color: 'yellow', text: 'Low Stock' };
    return { status: 'good', color: 'green', text: 'In Stock' };
  };

  const brands = ['all', ...new Set(products.map(p => p.brand))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  const lowStockItems = products.filter(p => p.stock < 10);
  const outOfStockItems = products.filter(p => p.stock === 0);

  const navigation = [
    { name: 'Dashboard', href: '/supplier', icon: Package },
  ];

  return (
    <Layout title="Stock Management" navigation={navigation}>
      <div className="space-y-6">
        {/* Stock Alerts */}
        {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outOfStockItems.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3" />
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Out of Stock</h3>
                </div>
                <p className="text-red-700 dark:text-red-300 mb-2">{outOfStockItems.length} items need immediate attention</p>
                <div className="space-y-1">
                  {outOfStockItems.slice(0, 3).map(item => (
                    <p key={item.id} className="text-sm text-red-600 dark:text-red-400">• {item.name}</p>
                  ))}
                  {outOfStockItems.length > 3 && (
                    <p className="text-sm text-red-500 dark:text-red-400">+ {outOfStockItems.length - 3} more</p>
                  )}
                </div>
              </div>
            )}

            {lowStockItems.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3" />
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Low Stock</h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 mb-2">{lowStockItems.length} items running low</p>
                <div className="space-y-1">
                  {lowStockItems.slice(0, 3).map(item => (
                    <p key={item.id} className="text-sm text-yellow-600 dark:text-yellow-400">• {item.name} ({item.stock} left)</p>
                  ))}
                  {lowStockItems.length > 3 && (
                    <p className="text-sm text-yellow-500 dark:text-yellow-400">+ {lowStockItems.length - 3} more</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand === 'all' ? 'All Brands' : brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product Inventory ({filteredProducts.length})
            </h3>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {filteredProducts.map((product) => {
                    const stockInfo = getStockStatus(product.stock);
                    const isEditing = editingProduct === product.id;
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Package className="h-5 w-5 text-gray-400 mr-3" />
                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.brand}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">${product.rate}</td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              defaultValue={product.stock}
                              onBlur={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  updateStock(product.id, parseInt(e.currentTarget.value) || 0);
                                }
                              }}
                              className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              autoFocus
                            />
                          ) : (
                            <span className="font-medium text-gray-900 dark:text-white">{product.stock}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            stockInfo.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            stockInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {stockInfo.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setEditingProduct(isEditing ? null : product.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StockManagement;