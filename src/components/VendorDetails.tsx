import React, { useState } from 'react';
import { Building, User, Mail, Phone, MapPin, Percent } from 'lucide-react';
import Layout from './Layout';
import toast from 'react-hot-toast';

interface VendorInfo {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  margin: number;
}

const VendorDetails: React.FC = () => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
    id: '1',
    companyName: 'XYZ Supplies Ltd.',
    contactPerson: 'Jane Doe',
    email: 'jane@xyzsupplies.com',
    phone: '+1-555-0123',
    address: '123 Business St, Suite 100, Business City, BC 12345',
    taxId: 'TAX-123456789',
    margin: 15
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Vendor details updated successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In a real app, you would reload the original data here
  };

  const navigation = [
    { name: 'Dashboard', href: '/supplier', icon: Building },
  ];

  return (
    <Layout title="Vendor Details" navigation={navigation}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Vendor Information</h2>
          <p className="text-purple-100">Manage your company details and vendor settings</p>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Company Details</h3>
            <div className="space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Details
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Building className="h-4 w-4 inline mr-2" />
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={vendorInfo.companyName}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.companyName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Contact Person
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={vendorInfo.contactPerson}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, contactPerson: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.contactPerson}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={vendorInfo.email}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={vendorInfo.phone}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.phone}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Business Address
              </label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={vendorInfo.address}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tax ID / Registration Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={vendorInfo.taxId}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, taxId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.taxId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Percent className="h-4 w-4 inline mr-2" />
                Default Margin (%)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={vendorInfo.margin}
                  onChange={(e) => setVendorInfo(prev => ({ ...prev, margin: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {vendorInfo.margin}%
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Business Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5 Years</p>
              <p className="text-gray-600 dark:text-gray-400">In Business</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">250+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Customers</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
              <p className="text-gray-600 dark:text-gray-400">Products Managed</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorDetails;