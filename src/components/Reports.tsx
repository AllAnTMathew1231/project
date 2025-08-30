import React, { useState, useEffect } from 'react';
import { Download, Calendar, TrendingUp, Users, Package } from 'lucide-react';
import Layout from './Layout';
import Charts from './Charts';
import { apiService } from '../utils/api';
import { generateSalesReport } from '../utils/pdf';
import toast from 'react-hot-toast';

const Reports: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading report data:', error);
      toast.error('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (format: 'pdf' | 'excel') => {
    try {
      const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return orderDate >= startDate && orderDate <= endDate;
      });

      if (format === 'pdf') {
        await generateSalesReport(filteredOrders, dateRange);
        toast.success('PDF report generated successfully');
      } else {
        // Excel generation would be implemented here
        toast.success('Excel report functionality would be implemented here');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return orderDate >= startDate && orderDate <= endDate;
  });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.net, 0);
  const totalOrders = filteredOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const uniqueCustomers = new Set(filteredOrders.map(order => order.customer)).size;

  const reportStats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'green' },
    { label: 'Total Orders', value: totalOrders.toString(), icon: Package, color: 'blue' },
    { label: 'Average Order Value', value: `$${avgOrderValue.toFixed(2)}`, icon: TrendingUp, color: 'purple' },
    { label: 'Unique Customers', value: uniqueCustomers.toString(), icon: Users, color: 'indigo' },
  ];

  const navigation = [
    { name: 'Dashboard', href: '/supplier', icon: TrendingUp },
  ];

  return (
    <Layout title="Sales Reports" navigation={navigation}>
      <div className="space-y-6">
        {/* Report Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sales Reports</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <span className="text-gray-500 dark:text-gray-400 py-2">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('pdf')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={() => generateReport('excel')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                    'bg-indigo-100 dark:bg-indigo-900'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                      'text-indigo-600 dark:text-indigo-400'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Showing data from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
            </p>
          </div>
          <div className="p-6">
            <Charts orders={filteredOrders} />
          </div>
        </div>

        {/* Detailed Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Salesman</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.date}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.salesman}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.items.length}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">${order.net.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        order.status === 'approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;