# Gupio Employee Management System

A full-stack web application for managing employee records with CRUD operations, search, filtering, and a responsive dashboard. Built as part of the Gupio Campus Placement Development Practical Assignment.

## 🚀 Live Demo

- **Frontend:** https://gupio-employee-management.vercel.app
- **Backend API:** https://gupio-employee-management.onrender.com
- **GitHub Repository:** https://github.com/Yashaswini-2006-4/gupio-employee-management

## ✨ Features

- **Dashboard:** View employee records in an organized interface.
- **Add Employees:** Create new employee records with form validation.
- **View Employee Details:** Access individual employee information.
- **Edit Employees:** Update existing employee records.
- **Delete Employees:** Remove employee records when no longer needed.
- **Search:** Find employees by name or email.
- **Filtering:** Filter employee records by department and employment status.
- **Data Persistence:** Store employee information in MongoDB.
- **Validation and Error Handling:** Handle invalid inputs and API errors.
- **Responsive Interface:** Use the application across desktop and mobile screen sizes.

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- REST API
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Vercel — Frontend
- Render — Backend

## 📁 Project Structure

```text
gupio-employee-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB Atlas account or a MongoDB connection string
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Yashaswini-2006-4/gupio-employee-management.git
cd gupio-employee-management
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your own MongoDB connection string.

Start the backend:

```bash
npm run dev
```

If your `package.json` does not contain a `dev` script, use the start command configured in that file, such as `npm start`.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend` if required and configure the backend URL:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

For local development, make sure the frontend API configuration points to your local backend. For deployment, use the deployed backend URL.

## 🔌 API Overview

The backend provides REST API endpoints for employee management.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend and database status |
| GET | `/api/employees` | Retrieve employee records |
| GET | `/api/employees/:id` | Retrieve a specific employee |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

**Base URL:** `https://gupio-employee-management.onrender.com`

## 🗃️ Employee Data Model

Employee records may include the following fields:

| Field | Type | Description |
|---|---|---|
| `name` | String | Employee's full name |
| `email` | String | Employee's email address |
| `department` | String | Employee's department |
| `position` | String | Employee's job position |
| `salary` | Number | Employee's salary |
| `status` | String | Active or inactive status |
| `createdAt` | Date | Record creation time |
| `updatedAt` | Date | Last update time |

The actual fields and validation rules are defined by the backend employee model.

## 🔐 Environment Variables and Security

- Store database connection strings in environment variables.
- Do not commit `.env` files or database credentials to GitHub.
- Configure `VITE_API_URL` in the frontend deployment environment.
- Configure `MONGODB_URI` in the backend deployment environment.
- Ensure the `.gitignore` file excludes sensitive environment files.

## ☁️ Deployment

### Frontend — Vercel

Deploy the `frontend` directory using Vercel and configure:

```env
VITE_API_URL=https://gupio-employee-management.onrender.com
```

Redeploy the frontend after changing environment variables.

### Backend — Render

Deploy the backend service on Render. Configure the required environment variables, including `MONGODB_URI`, and ensure the start command matches the backend configuration.

## 🧪 Testing Checklist

- [ ] Add a new employee.
- [ ] View the employee list.
- [ ] Open an individual employee's details.
- [ ] Edit an existing employee.
- [ ] Delete an employee.
- [ ] Search by name or email.
- [ ] Filter by department or status.
- [ ] Test required-field validation.
- [ ] Verify that employee data persists after refreshing the page.
- [ ] Verify that the deployed frontend communicates with the deployed backend.

## 🎯 Project Objective

The objective of this project is to demonstrate full-stack development skills by connecting a React frontend, Express REST API, and MongoDB database to build a functional employee management application.

## 👩‍💻 Author

**Yashaswini**

- GitHub: https://github.com/Yashaswini-2006-4
- Project Repository: https://github.com/Yashaswini-2006-4/gupio-employee-management
