import axios from 'axios';

// Mock API base URL
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data generators
export const mockOrders = [
  {
    id: 'ORD-001',
    date: '2025-01-15',
    salesman: 'Mike Johnson',
    customer: 'ABC Corporation',
    brand: 'TechPro',
    items: [
      { id: '1', name: 'Laptop Pro 15"', quantity: 5, rate: 1200, brand: 'TechPro' },
      { id: '2', name: 'Wireless Mouse', quantity: 10, rate: 45, brand: 'TechPro' }
    ],
    gross: 6450,
    tax: 645,
    discount: 200,
    shipping: 50,
    net: 6945,
    status: 'pending',
    currency: 'USD'
  },
  {
    id: 'ORD-002',
    date: '2025-01-14',
    salesman: 'Sarah Wilson',
    customer: 'XYZ Industries',
    brand: 'EliteGear',
    items: [
      { id: '3', name: 'Desktop Workstation', quantity: 2, rate: 1800, brand: 'EliteGear' }
    ],
    gross: 3600,
    tax: 360,
    discount: 100,
    shipping: 75,
    net: 3935,
    status: 'approved',
    currency: 'USD'
  }
];

export const mockProducts = [
  { id: '1', name: 'Laptop Pro 15"', brand: 'TechPro', rate: 1200, stock: 25 },
  { id: '2', name: 'Wireless Mouse', brand: 'TechPro', rate: 45, stock: 100 },
  { id: '3', name: 'Desktop Workstation', brand: 'EliteGear', rate: 1800, stock: 15 },
  { id: '4', name: 'Monitor 27"', brand: 'ViewMaster', rate: 350, stock: 30 },
  { id: '5', name: 'Keyboard Mechanical', brand: 'KeyCraft', rate: 120, stock: 50 }
];

export const mockCustomers = [
  { id: '1', name: 'ABC Corporation', contact: 'John Doe', email: 'john@abc.com', phone: '+1-555-0101' },
  { id: '2', name: 'XYZ Industries', contact: 'Jane Smith', email: 'jane@xyz.com', phone: '+1-555-0102' },
  { id: '3', name: 'Tech Solutions Inc', contact: 'Bob Wilson', email: 'bob@techsol.com', phone: '+1-555-0103' }
];

// API functions with mock implementations
export const apiService = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, token: 'mock-jwt-token', user: { email, role: email.includes('supplier') ? 'supplier' : 'customer' } };
  },

  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  },

  createOrder: async (orderData: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newOrder = {
      ...orderData,
      id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
      status: 'pending'
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  updateOrder: async (orderId: string, updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...updates };
      return mockOrders[orderIndex];
    }
    throw new Error('Order not found');
  },

  getProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts;
  },

  getCustomers: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCustomers;
  },

  updateStock: async (productId: string, newStock: number) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      mockProducts[productIndex].stock = newStock;
      return mockProducts[productIndex];
    }
    throw new Error('Product not found');
  }
};