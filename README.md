````markdown
# 📦 Sales Order Management System

The **Sales Order Management System** is a modern, full-featured application for managing **customer and supplier operations**.  
It provides a seamless workflow from order placement to fulfillment, with built-in support for:

- 🔑 Role-based authentication (Customer / Supplier)  
- 📦 Stock and inventory management  
- 📊 Interactive analytics and dashboards  
- 🧾 Invoice and report generation (PDF/CSV)  
- 🎨 Responsive UI with dark and light themes  

Built with **React, TypeScript, Tailwind CSS, Axios, and Recharts**, it combines performance, scalability, and usability in one system.  

---

## ✨ Features

### Customer
- Role-based login & access
- Create/submit sales orders
- Order history & tracking (Pending → Approved → Shipped → Completed)
- Live price calculation (discount, tax, shipping)
- Download invoices as **PDF**

### Supplier
- Supplier dashboard with approval workflow
- Stock management & vendor details
- Analytics (sales by brand, top customers, monthly revenue)
- Generate PDF/CSV reports
- Real-time order status updates

### Global
- Responsive UI with **Dark/Light mode**
- Interactive charts (Recharts) with tooltips/hover
- Toast notifications (success/error)
- Modular, scalable architecture

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS  
- **Routing:** React Router  
- **State:** React Hooks / Context API  
- **HTTP:** Axios  
- **Charts:** Recharts  
- **PDF:** jsPDF / html2canvas (via `utils/pdf.ts`)  
- **Build:** Vite  
- **Lint/Format:** ESLint, Prettier

---
````
## 📂 Project Structure

```plaintext
src/
├─ components/
│   ├─ OrderForm.tsx
│   ├─ CustomerDetails.tsx
│   ├─ OrderDetails.tsx
│   ├─ PriceCalculation.tsx
│   ├─ OrderHistory.tsx
│   ├─ StockManagement.tsx
│   ├─ Reports.tsx
│   ├─ Charts.tsx
│   ├─ VendorDetails.tsx
│   └─ ReportView.tsx
│
├─ pages/
│   ├─ CustomerDashboard.tsx
│   └─ SupplierDashboard.tsx
│
├─ utils/
│   ├─ api.ts           # Axios instance, interceptors (auth token)
│   └─ pdf.ts           # Helpers for invoice + report export
│
├─ context/
│   └─ auth.tsx         # Auth provider, role-based guards
│
├─ App.tsx              # Routes + layout + theme toggle
└─ main.tsx
````

## 🚀 Getting Started

### 1. Prerequisites

* Node.js ≥ 18
* npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

### 2. Setup

```bash
git clone https://github.com/AllAnTMathew1231/project.git
cd project
npm install
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

### Environment Variables (`.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Sales Order Management
```

---

## 🔐 Authentication & Roles

* JWT-based login
* Roles: `customer`, `supplier`
* Protected routes via `AuthProvider` + `RequireRole` wrapper
* Axios interceptor attaches `Authorization: Bearer <token>`

---

## 🧮 Price Calculation

* Fields: MRP, Discount %, Tax %, Shipping
* Formula:

  ```plaintext
  discounted = mrp - (mrp * discount/100)
  taxed      = discounted + (discounted * tax/100)
  total      = taxed + shipping
  ```
* Auto-updates on change; precision to 2 decimals

---

## 📊 Analytics (Recharts)

* Sales by month (BarChart)
* Top customers (PieChart)
* Brand-wise revenue (LineChart)
* Tooltips, legends, responsive container

---

## 🧾 PDF & Reports

* **Invoices** and **summary reports** generated via `utils/pdf.ts`
* Supports page headers/footers, logo, tables, and totals
* Export buttons in `ReportView` and `Reports`

---

## 🌐 Deployment

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Fly.io / Railway
* **DB:** MongoDB Atlas / Supabase / Postgres

Steps:

1. Set `VITE_API_BASE_URL` to your hosted API.
2. Build and deploy the frontend.
3. Add environment vars on the hosting platform.


---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit: `git commit -m "feat: add awesome thing"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

---

## 👨‍💻 Author

Developed by [Allan T Mathew](https://github.com/AllAnTMathew1231)

[GitHub](https://github.com/AllAnTMathew1231) , [LinkedIn](https://www.linkedin.com/in/allan-mathew-92874924b/)

---

## 📜 License

Licensed under **MIT**. Use it freely for personal or commercial projects.


