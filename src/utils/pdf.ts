import jsPDF from 'jspdf';

export const generateOrderPDF = async (order: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246); // Blue
  doc.text('SALES ORDER', 20, 25);
  
  // Order Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Order ID: ${order.id}`, 20, 45);
  doc.text(`Date: ${order.date}`, 20, 55);
  doc.text(`Customer: ${order.customer}`, 20, 65);
  doc.text(`Salesman: ${order.salesman}`, 20, 75);
  
  // Items Header
  doc.setFontSize(14);
  doc.text('ORDER ITEMS', 20, 95);
  
  // Items Table Header
  doc.setFontSize(10);
  doc.text('Item', 20, 110);
  doc.text('Brand', 70, 110);
  doc.text('Qty', 110, 110);
  doc.text('Rate', 130, 110);
  doc.text('Total', 160, 110);
  
  // Items
  let y = 125;
  order.items.forEach((item: any) => {
    doc.text(item.name, 20, y);
    doc.text(item.brand, 70, y);
    doc.text(item.quantity.toString(), 110, y);
    doc.text(`$${item.rate.toFixed(2)}`, 130, y);
    doc.text(`$${(item.quantity * item.rate).toFixed(2)}`, 160, y);
    y += 15;
  });
  
  // Totals
  y += 20;
  doc.setFontSize(12);
  doc.text(`Gross Amount: $${order.gross.toFixed(2)}`, 120, y);
  doc.text(`Tax (10%): $${order.tax.toFixed(2)}`, 120, y + 15);
  doc.text(`Discount: -$${order.discount.toFixed(2)}`, 120, y + 30);
  doc.text(`Shipping: $${order.shipping.toFixed(2)}`, 120, y + 45);
  
  // Net Total
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text(`NET AMOUNT: $${order.net.toFixed(2)}`, 120, y + 65);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text('Thank you for your business!', 20, 280);
  
  doc.save(`Order-${order.id}.pdf`);
};

export const generateSalesReport = async (orders: any[], dateRange: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246);
  doc.text('SALES REPORT', 20, 25);
  
  // Date Range
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Period: ${dateRange.start} to ${dateRange.end}`, 20, 45);
  
  // Summary Statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.net, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  doc.setFontSize(14);
  doc.text('SUMMARY', 20, 65);
  
  doc.setFontSize(12);
  doc.text(`Total Orders: ${totalOrders}`, 20, 85);
  doc.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 20, 100);
  doc.text(`Average Order Value: $${avgOrderValue.toFixed(2)}`, 20, 115);
  
  // Orders Table
  doc.setFontSize(14);
  doc.text('ORDER DETAILS', 20, 140);
  
  doc.setFontSize(10);
  doc.text('Order ID', 20, 155);
  doc.text('Date', 60, 155);
  doc.text('Customer', 100, 155);
  doc.text('Amount', 160, 155);
  
  let y = 170;
  orders.slice(0, 15).forEach((order) => { // Limit to first 15 orders for PDF
    doc.text(order.id, 20, y);
    doc.text(order.date, 60, y);
    doc.text(order.customer.substring(0, 15), 100, y);
    doc.text(`$${order.net.toLocaleString()}`, 160, y);
    y += 12;
  });
  
  if (orders.length > 15) {
    doc.text(`... and ${orders.length - 15} more orders`, 20, y + 10);
  }
  
  doc.save(`Sales-Report-${dateRange.start}-to-${dateRange.end}.pdf`);
};