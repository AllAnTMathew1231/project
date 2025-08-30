```markdown
# 📦 Sales Order Management System

A comprehensive **Sales Order Management System** built with **React, TypeScript, Tailwind CSS, Axios, and Recharts**.  
The system supports **customer and supplier workflows**, **role-based authentication**, **stock tracking**, **interactive analytics**, and **PDF export** — all wrapped in a modern, responsive UI.

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

## 📂 Project Structure

```

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

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation
```bash
# 1) Clone
git clone https://github.com/yourusername/sales-order-management.git
cd sales-order-management

# 2) Install deps
npm install

# 3) (Optional) Copy env
cp .env.example .env
````

### Environment Variables (`.env`)

```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Sales Order Management
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
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

  ```
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

## 📡 API Endpoints (example)

```
POST   /api/login
GET    /api/orders            # list/filter
POST   /api/orders            # create
GET    /api/orders/:id
PATCH  /api/orders/:id        # status updates (approve/ship/complete)
GET    /api/stock
PATCH  /api/stock/:itemId
GET    /api/analytics/summary
```

> Replace with your backend or `json-server` mocks during development.

---

## 🧪 Testing (optional)

* **Unit:** Jest + React Testing Library
* **E2E:** Cypress

Example:

```bash
npm run test
npm run cypress:open
```

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

## 📸 Screenshots (placeholders)

* `docs/screenshots/login.png`
* `docs/screenshots/customer-dashboard.png`
* `docs/screenshots/supplier-dashboard.png`
* `docs/screenshots/order-form.png`
* `docs/screenshots/analytics.png`
* `docs/screenshots/invoice-pdf.png`

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit: `git commit -m "feat: add awesome thing"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

---

## 👨‍💻 Author

Developed with ❤️ by **Your Name**

* GitHub: [https://github.com/yourusername](https://github.com/yourusername)
* LinkedIn: [https://www.linkedin.com/in/yourusername](https://www.linkedin.com/in/yourusername)

---

## 📜 License

Licensed under **MIT**. Use it freely for personal or commercial projects.

```
```
