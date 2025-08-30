import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Plus, Trash2 } from 'lucide-react';
import Layout from './Layout';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails';
import PriceCalculation from './PriceCalculation';
import { apiService, mockCustomers, mockProducts } from '../utils/api';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  rate: number;
}

interface OrderData {
  date: string;
  salesman: string;
  customer: string;
  brand: string;
  items: OrderItem[];
  gross: number;
  tax: number;
  discount: number;
  shipping: number;
  net: number;
  currency: string;
}

const OrderForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderData>({
    date: new Date().toISOString().split('T')[0],
    salesman: '',
    customer: '',
    brand: '',
    items: [],
    gross: 0,
    tax: 0,
    discount: 0,
    shipping: 0,
    net: 0,
    currency: 'USD'
  });
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { title: 'Customer Details', component: CustomerDetails },
    { title: 'Order Details', component: OrderDetails },
    { title: 'Price Calculation', component: PriceCalculation }
  ];

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [customerData, productData] = await Promise.all([
        apiService.getCustomers(),
        apiService.getProducts()
      ]);
      setCustomers(customerData);
      setProducts(productData);
    } catch (error) {
      console.error('Error loading form data:', error);
      toast.error('Failed to load form data');
    }
  };

  const updateOrderData = (updates: Partial<OrderData>) => {
    setOrderData(prev => ({ ...prev, ...updates }));
  };

  const calculateTotals = (items: OrderItem[], discount: number, shipping: number, taxRate: number = 0.1) => {
    const gross = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const tax = gross * taxRate;
    const net = gross + tax - discount + shipping;
    
    return { gross, tax, net };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const totals = calculateTotals(orderData.items, orderData.discount, orderData.shipping);
      const finalOrderData = {
        ...orderData,
        ...totals
      };

      await apiService.createOrder(finalOrderData);
      toast.success('Order created successfully!');
      navigate('/customer/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const navigation = [
    { name: 'Dashboard', href: '/customer', icon: ArrowLeft },
  ];

  return (
    <Layout title="Create New Order" navigation={navigation}>
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <span key={index} className={`text-sm ${
                index <= currentStep 
                  ? 'text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <CurrentStepComponent
            orderData={orderData}
            updateOrderData={updateOrderData}
            customers={customers}
            products={products}
            calculateTotals={calculateTotals}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading || orderData.items.length === 0}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Creating Order...' : 'Create Order'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderForm;