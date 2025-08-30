import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface ChartsProps {
  orders?: any[];
  reportStats?: {
    label: string;
    value: string | number;
    color: string;
    icon: React.ElementType;
  }[];
}

const Charts: React.FC<ChartsProps> = ({ orders = [], reportStats = [] }) => {
  // Mock data for charts
  const salesByMonth = [
    { month: 'Jan', sales: 45230, orders: 23 },
    { month: 'Feb', sales: 52100, orders: 28 },
    { month: 'Mar', sales: 47800, orders: 25 },
    { month: 'Apr', sales: 61200, orders: 32 },
    { month: 'May', sales: 55900, orders: 29 },
    { month: 'Jun', sales: 67400, orders: 35 },
  ];

  const topCustomers = [
    { name: 'ABC Corp', value: 25, sales: 15230 },
    { name: 'XYZ Industries', value: 20, sales: 12100 },
    { name: 'Tech Solutions', value: 18, sales: 10950 },
    { name: 'Global Systems', value: 15, sales: 9100 },
    { name: 'Others', value: 22, sales: 13420 },
  ];

  const brandSales = [
    { brand: 'TechPro', jan: 12000, feb: 14500, mar: 13200, apr: 16800, may: 15600, jun: 18200 },
    { brand: 'EliteGear', jan: 18000, feb: 21000, mar: 19500, apr: 23400, may: 22100, jun: 25600 },
    { brand: 'ViewMaster', jan: 8500, feb: 9200, mar: 8800, apr: 11200, may: 10300, jun: 12400 },
    { brand: 'KeyCraft', jan: 6730, feb: 7400, mar: 6300, apr: 9800, may: 8000, jun: 11200 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-8">
      {/* Sales by Month */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }}
            />
            <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Customers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topCustomers}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {topCustomers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Brand Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Brand Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={brandSales.map(item => ({
              month: 'Q2',
              TechPro: item.jun,
              EliteGear: item.jun,
              ViewMaster: item.jun,
              KeyCraft: item.jun,
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="TechPro" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="EliteGear" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="ViewMaster" stroke="#F59E0B" strokeWidth={3} />
              <Line type="monotone" dataKey="KeyCraft" stroke="#EF4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Statistics */}
      {reportStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
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
      )}
    </div>
  );
};

export default Charts;
