import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, Users, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import Charts from '../components/Charts';
import { apiService } from '../utils/api';
import { useAuth } from '../utils/auth';
import toast from 'react-hot-toast';

const SupplierDashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const orderData = await apiService.getOrders();
      setOrders(orderData);
      setPendingOrders(orderData.filter(order => order.status === 'pending'));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderAction = async (orderId: string, action: 'approve' | 'reject') => {
    try {
      const status = action === 'approve' ? 'approved' : 'rejected';
      await apiService.updateOrder(orderId, { status });
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
      
      toast.success(`Order ${orderId} ${action}d successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} order`);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/supplier', icon: TrendingUp },
    { name: 'Stock Management', href: '/supplier/stock', icon: Package },
    { name: 'Reports', href: '/supplier/reports', icon: DollarSign },
  ];

const stats = [
  { 
    label: 'Total Orders', 
    value: orders.length.toString(), 
    icon: Package, 
    color: 'blue',
    change: '+12% from last month'
  },
  { 
    label: 'Pending Approval', 
    value: pendingOrders.length.toString(), 
    icon: Clock, 
    color: 'yellow',
    change: '3 orders awaiting action'
  },
  { 
    label: 'Monthly Revenue', 
    value: `$${orders.reduce((sum, order) => sum + order.net, 0).toLocaleString()}`, 
    icon: DollarSign, 
    color: 'green',
    change: '+8% from last month'
  },
  { 
    label: 'Active Customers', 
    value: '48', 
    icon: Users, 
    color: 'purple',
    change: '+3 new this week'
  },
];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Layout title="Supplier Dashboard" navigation={navigation}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Supplier Dashboard" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-indigo-100 mb-6">Manage orders, track inventory, and view analytics from your supplier dashboard.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/supplier/stock')}
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
            >
              <Package className="h-5 w-5 inline mr-2" />
              Manage Stock
            </button>
            <button
              onClick={() => navigate('/supplier/reports')}
              className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-400 transition-all duration-200"
            >
              View Reports
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                    stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    'bg-purple-100 dark:bg-purple-900'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                      stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`} />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Pending Orders ({pendingOrders.length})
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="border dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Total: ${order.net.toLocaleString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOrderAction(order.id, 'approve')}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleOrderAction(order.id, 'reject')}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {pendingOrders.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No pending orders</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sales Analytics</h3>
            </div>
            <div className="p-6">
              <Charts reportStats={stats} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Orders</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{order.customer}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.salesman}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-gray-900 dark:text-white">${order.net.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplierDashboard;