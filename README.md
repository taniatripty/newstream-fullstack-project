# 📰 Full-Stack Newspaper Application

A modern full-stack newspaper platform where users can read, publish, and manage articles.  
Includes **premium subscription** support with Stripe payments, role-based access control, and an admin dashboard.

---

## 🌐 Live Demo
[Visit the Live Site](https://newspaper-auth-22b11.web.app/)

---



## 🚀 Features

### 👤 User Features
- Browse and read articles by category or tags.
- Search and filter by **title, publisher, or tags**.
- View premium articles (only for subscribed users).
- Stripe payment integration for premium subscription.
- Role automatically updates to **Premium User** on payment.
- Premium badge displayed on profile.

### 🛠 Admin Features
- Approve, decline, or delete articles.
- Mark articles as **Premium**.
- Manage publishers and tags.
- View all users and update roles.

### 🔐 Authentication & Authorization
- Secure JWT-based authentication.
- Role-based route protection (User, Admin, Premium).

---

## 🏗 Tech Stack

### **Frontend**
- React.js + Vite
- Tailwind CSS + DaisyUI
- React Router
- TanStack Query (React Query)
- Stripe.js + @stripe/react-stripe-js

### **Backend**
- Node.js + Express.js
- MongoDB (Native Driver)
- Stripe API
- JWT for authentication

---

## 📦 Dependencies

### **Frontend**
```bash
npm install react react-dom react-router-dom @tanstack/react-query tailwindcss daisyui @stripe/react-stripe-js @stripe/stripe-js axios sweetalert2

```
### **Backend**
npm install express cors stripe mongodb dotenv

