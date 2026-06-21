# Hero Cycles Pricing Engine

Full-stack pricing engine for managing bicycle components, creating cycle configurations, and calculating real-time prices with component-wise breakdown.

---

## Problem

Hero Cycles manages multiple bicycle configurations where component prices change over time.

The system replaces manual Excel-based pricing by allowing sales teams to:

- Manage bicycle components
- Create cycle configurations
- Update component prices
- Calculate latest cycle prices instantly

---

## Features

### Component Management

- Add new component categories
- Add bicycle components
- Update component prices
- Maintain price history
- Delete components
- Search components
- Category-wise component grouping

### Cycle Builder

- Create cycle configurations
- Select multiple components
- Live price preview
- Remove selected components
- Validation for invalid cycles

### Price Calculator

- View saved cycles
- Component-wise price breakdown
- Dynamic total price calculation
- Delete cycles

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

## Database Models

### Component

```js
{
  (name, category, currentPrice, priceHistory);
}
```

### Cycle

```js
{
  name,
  components:[Component]
}
```

Cycle prices are calculated dynamically using current component prices.

---

## API Endpoints

### Components

| Method | Endpoint | Description |
| GET | /api/components | Get components |
| POST | /api/components | Add component |
| PATCH | /api/components/:id/price | Update price |
| DELETE | /api/components/:id | Delete component |

### Categories

| Method | Endpoint | Description |
| GET | /api/categories | Get categories |
| POST | /api/categories | Add category |

### Cycles

| Method | Endpoint | Description |
| GET | /api/cycles | Get cycles |
| POST | /api/cycles | Create cycle |
| GET | /api/cycles/:id/price | Calculate price |
| DELETE | /api/cycles/:id | Delete cycle |

---

## Setup Instructions

Clone repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend

npm install

npm run dev
```

Environment variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Testing

Manual testing was performed for:

- Component CRUD operations
- Price update flow
- Cycle creation validation
- Price calculation
- Delete operations
- Responsive UI behavior

---
