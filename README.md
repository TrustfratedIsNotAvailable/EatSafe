# EatSafe - Personal Food Expiry Tracker and Management System

EatSafe is a web app that helps users efficiently track food items, reduce waste, and manage their pantry. It features fridge management, personalized notes, expiry alerts, and smart recipe suggestions based on nearly expired or available items.

---

## Live Demo

> [View EatSafe Online](https://eatsafe-7744e.web.app/)

---

## Features

- **Fridge Manager** – Add, update, and delete food items with expiry tracking
- **Notes System** – Add personal notes and like/unlike them
- **User Reviews** – Submit and display the latest 3 user testimonials
- **Dashboard** – Visual overview of stats, expiring items, and food categories
- **Recipe Suggestions** – Get recipes based on your near-expiry or available foods
- **Search, Filter, Sort** – Easily find and manage your stored food items
- **Light/Dark Theme** – Seamless theme toggle across the app
- **Authentication** – Firebase-based secure login and profile updates
- **Secure API** - EatSafe backend APIs are protected by verifying Firebase Authentication ID tokens.  

---

## Tech Stack

### Frontend

- React + Vite
- React Router DOM
- Axios, dayjs, react-countdown, tanStack Table, react toastify, framer motion, recharts
- Firebase Authentication (handles user authentication and API token verification)
- Tailwind CSS (theme support)

### Backend

- Node.js + Express.js
- MongoDB (Native Driver)
- dotenv for config management

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TrustfratedIsNotAvailable/EatSafe.git
cd EatSafe
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a .env file in server/:

```env
PORT=3000
DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
```

Then run:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd client
npm install
npm run dev
```

