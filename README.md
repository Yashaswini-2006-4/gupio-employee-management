<<<<<<< HEAD
Gupio Employee Management System
A full-stack Employee Management System built for the Gupio Full Stack
Developer practical assignment.
The application provides a clean dashboard for managing employee records
with a React frontend, Express.js REST API, and MongoDB Atlas database.
Live Demo
- Frontend: https://gupio-employee-management.vercel.app
- Backend API: https://gupio-employee-management.onrender.com
- Health Check:
  https://gupio-employee-management.onrender.com/api/health
Features
- Add new employees
- View all employees
- View individual employee details
- Edit employee information
- Delete employees
- Search employees by name or email
- Filter employees by department
- Filter employees by active/inactive status
- Form validation for required fields
- Email uniqueness validation
- Salary validation
- Loading, success, and error states
- Responsive dashboard UI
- Persistent data storage with MongoDB Atlas
- RESTful API architecture
- Production deployment with Vercel and Render
Technology Stack
Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API
Backend
- Node.js
- Express.js
- Mongoose
- CORS
- dotenv
Database
- MongoDB Atlas
Deployment
- Vercel --- Frontend
- Render --- Backend
Project Structure
=======
# Gupio Employee Management System

A full-stack Employee Management System built for the Gupio Full Stack
Developer practical assignment.

The application provides a clean dashboard for managing employee records
with a React frontend, Express.js REST API, and MongoDB Atlas database.

## Live Demo

-   **Frontend:** https://gupio-employee-management.vercel.app
-   **Backend API:** https://gupio-employee-management.onrender.com
-   **Health Check:**
    https://gupio-employee-management.onrender.com/api/health

## Features

-   Add new employees
-   View all employees
-   View individual employee details
-   Edit employee information
-   Delete employees
-   Search employees by name or email
-   Filter employees by department
-   Filter employees by active/inactive status
-   Form validation for required fields
-   Email uniqueness validation
-   Salary validation
-   Loading, success, and error states
-   Responsive dashboard UI
-   Persistent data storage with MongoDB Atlas
-   RESTful API architecture
-   Production deployment with Vercel and Render

## Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   CSS
-   Fetch API

### Backend

-   Node.js
-   Express.js
-   Mongoose
-   CORS
-   dotenv

### Database

-   MongoDB Atlas

### Deployment

-   Vercel --- Frontend
-   Render --- Backend

## Project Structure

``` text
>>>>>>> 363e105 (Add project README documentation)
gupio-employee-management/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
<<<<<<< HEAD
Employee Data Model
Each employee record contains:
  Field          Type     Description
  name         String   Employee full name
  email        String   Unique employee email
  department   String   Employee department
  position     String   Job position
  salary       Number   Monthly salary
  status       String   Active or Inactive
  createdAt    Date     Record creation time
  updatedAt    Date     Last update time
API Endpoints
Base URL:
https://gupio-employee-management.onrender.com
  Method   Endpoint               Purpose
  GET      /                    API welcome message
  GET      /api/health          Check API and database status
  GET      /api/employees       Get all employees
  GET      /api/employees/:id   Get one employee
  POST     /api/employees       Create an employee
  PUT      /api/employees/:id   Update an employee
  DELETE   /api/employees/:id   Delete an employee
Search and Filtering
The employee listing endpoint supports query parameters.
Search by name or email:
/api/employees?search=ananya
Filter by department:
/api/employees?department=Engineering
Filter by status:
/api/employees?status=Active
Filters can also be combined:
/api/employees?search=ananya&department=Engineering&status=Active
Running Locally
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/gupio-employee-management.git
cd gupio-employee-management
2. Run the backend
cd backend
npm install
Create a .env file inside the backend folder:
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
Start the backend:
npm run dev
The backend will run at:
http://localhost:5000
3. Run the frontend
Open another terminal:
cd frontend
npm install
For local development, the frontend uses the local backend by default.
Start Vite:
npm run dev
The frontend will run at:
http://localhost:5173
Environment Variables
Backend
Create backend/.env:
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
Frontend
For production, configure:
VITE_API_URL=https://gupio-employee-management.onrender.com
Environment files containing credentials must not be committed to
GitHub.
Data Flow
=======
```

## Employee Data Model

Each employee record contains:

  Field          Type     Description
  -------------- -------- ------------------------
  `name`         String   Employee full name
  `email`        String   Unique employee email
  `department`   String   Employee department
  `position`     String   Job position
  `salary`       Number   Monthly salary
  `status`       String   `Active` or `Inactive`
  `createdAt`    Date     Record creation time
  `updatedAt`    Date     Last update time

## API Endpoints

Base URL:

``` text
https://gupio-employee-management.onrender.com
```

  Method   Endpoint               Purpose
  -------- ---------------------- -------------------------------
  GET      `/`                    API welcome message
  GET      `/api/health`          Check API and database status
  GET      `/api/employees`       Get all employees
  GET      `/api/employees/:id`   Get one employee
  POST     `/api/employees`       Create an employee
  PUT      `/api/employees/:id`   Update an employee
  DELETE   `/api/employees/:id`   Delete an employee

### Search and Filtering

The employee listing endpoint supports query parameters.

Search by name or email:

``` text
/api/employees?search=ananya
```

Filter by department:

``` text
/api/employees?department=Engineering
```

Filter by status:

``` text
/api/employees?status=Active
```

Filters can also be combined:

``` text
/api/employees?search=ananya&department=Engineering&status=Active
```

## Running Locally

### 1. Clone the repository

``` bash
git clone https://github.com/YOUR_USERNAME/gupio-employee-management.git
cd gupio-employee-management
```

### 2. Run the backend

``` bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

``` env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Start the backend:

``` bash
npm run dev
```

The backend will run at:

``` text
http://localhost:5000
```

### 3. Run the frontend

Open another terminal:

``` bash
cd frontend
npm install
```

For local development, the frontend uses the local backend by default.

Start Vite:

``` bash
npm run dev
```

The frontend will run at:

``` text
http://localhost:5173
```

## Environment Variables

### Backend

Create `backend/.env`:

``` env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### Frontend

For production, configure:

``` env
VITE_API_URL=https://gupio-employee-management.onrender.com
```

Environment files containing credentials must not be committed to
GitHub.

## Data Flow

``` text
>>>>>>> 363e105 (Add project README documentation)
React Frontend
      │
      │ HTTP REST API
      ▼
Express.js Backend
      │
      │ Mongoose
      ▼
MongoDB Atlas
<<<<<<< HEAD
Validation and Error Handling
The application includes:
- Required field validation
- Email format validation
- Unique email handling
- Non-negative salary validation
- Employee-not-found handling
- Invalid employee ID handling
- API error responses
- Frontend loading and error states
- Success notifications after create/update/delete operations
Deployment
Frontend
The React/Vite frontend is deployed on Vercel.
Vercel
   ↓
React + Vite
Backend
The Express API is deployed on Render.
=======
```

## Validation and Error Handling

The application includes:

-   Required field validation
-   Email format validation
-   Unique email handling
-   Non-negative salary validation
-   Employee-not-found handling
-   Invalid employee ID handling
-   API error responses
-   Frontend loading and error states
-   Success notifications after create/update/delete operations

## Deployment

### Frontend

The React/Vite frontend is deployed on Vercel.

``` text
Vercel
   ↓
React + Vite
```

### Backend

The Express API is deployed on Render.

``` text
>>>>>>> 363e105 (Add project README documentation)
Render
   ↓
Node.js + Express
   ↓
MongoDB Atlas
<<<<<<< HEAD
Security
- MongoDB credentials are stored using environment variables.
- .env files are excluded through .gitignore.
- Database credentials are not stored in source code.
- CORS is configured for frontend/backend communication.
Testing Checklist
Before submission, verify:
- [x] Add employee
- [x] View employee details
- [x] Edit employee
- [x] Delete employee
- [x] Search employee
- [x] Filter by department
- [x] Filter by status
- [x] Data persists after page refresh
- [x] MongoDB connection works
- [x] Backend deployed
- [x] Frontend deployed
Assignment
This project was developed as part of the Gupio Campus Placement Full
Stack Developer Practical Assignment.
Author
Yashaswini
=======
```

## Security

-   MongoDB credentials are stored using environment variables.
-   `.env` files are excluded through `.gitignore`.
-   Database credentials are not stored in source code.
-   CORS is configured for frontend/backend communication.

## Testing Checklist

Before submission, verify:

-   [x] Add employee
-   [x] View employee details
-   [x] Edit employee
-   [x] Delete employee
-   [x] Search employee
-   [x] Filter by department
-   [x] Filter by status
-   [x] Data persists after page refresh
-   [x] MongoDB connection works
-   [x] Backend deployed
-   [x] Frontend deployed

## Assignment

This project was developed as part of the **Gupio Campus Placement Full
Stack Developer Practical Assignment**.

## Author

**Yashaswini**

>>>>>>> 363e105 (Add project README documentation)
Computer Science & Engineering Student
