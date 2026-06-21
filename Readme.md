# Hero Cycles Pricing Engine

Full-stack pricing engine for managing bicycle components, creating cycle configurations, and calculating prices with component-wise breakdown.

---

## Problem

Hero Cycles manages thousands of bicycle configurations where component costs change over time.

The system replaces manual Excel-based pricing by allowing sales teams to:

- Manage bicycle parts
- Create cycle configurations
- Update component prices
- Generate cycle price breakdown instantly
- Preserve previous cycle quotations

---

## Features

### Component Management

- Create component categories
- Add bicycle components
- Update component prices
- Delete components
- Delete categories
- Search components
- Category-wise component grouping
- Input validation and error handling

---

### Cycle Builder

- Create cycle configurations
- Select multiple components
- Live price preview
- Remove selected components before creating cycle
- Prevent invalid cycle creation
- Store component price snapshot when cycle is created

---

### Price Calculator

- View saved cycle configurations
- Component-wise price breakdown
- Total price calculation
- Delete saved cycles

---

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Project Structure

```bash
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   └── src
│       ├── api
│       ├── pages
│       └── App.jsx
```

---

# Database Design

## Category

```js
{
  name
}
```

---

## Component

```js
{
  name,

  category,

  currentPrice
}
```

---

## Cycle

```js
{
  name,

  components:[
    {
      componentId,

      name,

      category,

      price
    }
  ]
}
```

Cycle stores component snapshots during creation.

This ensures existing cycle quotations remain unchanged even if:

- Component price changes
- Component gets deleted
- Category gets deleted

---

# API Endpoints


## Components

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/components | Get components |
| POST | /api/components | Create component |
| PATCH | /api/components/:id/price | Update component price |
| DELETE | /api/components/:id | Delete component |


---

## Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/categories | Get categories |
| POST | /api/categories | Create category |
| DELETE | /api/categories/:id | Delete category |


---

## Cycles

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/cycles | Get cycles |
| POST | /api/cycles | Create cycle |
| GET | /api/cycles/:id/price | Get price breakdown |
| DELETE | /api/cycles/:id | Delete cycle |

---

# Setup Instructions


## Clone Repository

```bash
git clone <repository-url>
```


---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```


Create `.env` inside backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```


---

# Frontend Setup


```bash
cd frontend

npm install

npm run dev
```


Create `.env` inside frontend:

```env
VITE_API_URL=http://localhost:5000/api
```


---

# Assumptions

- Categories are dynamic because future bicycle types may require new component groups.

- Existing cycle quotations should not change after creation.

- Updated component prices affect only newly created cycles.

- Deleted components/categories should not affect previous cycle pricing records.

---

# Testing

Manual testing performed for:

- Category creation and deletion
- Component CRUD operations
- Component price update
- Cycle creation validation
- Price calculation
- Snapshot price preservation
- Delete operations
- Responsive UI

---

# Live Demo


```
(https://cycle-pricing-aaye.onrender.com)
```


---
