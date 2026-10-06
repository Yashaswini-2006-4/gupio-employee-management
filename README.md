# Gupio Employee Management System

A full-stack Employee Management System developed as part of a technical assignment for Gupio. The application provides employee record management, database integration, validation, and an interactive dashboard enhanced with additional analytics and productivity features.

## 🌐 Live Demo & Project Links

**Live Application (Frontend):**
https://gupio-employee-management.vercel.app/

**Backend API (Render):**
https://gupio-employee-management.onrender.com/

**Employees API Endpoint:**
https://gupio-employee-management.onrender.com/api/employees

**GitHub Repository:**
https://github.com/Yashaswini-2006-4/gupio-employee-management

- **Frontend Deployment:** Vercel
- **Backend Deployment:** Render
- **Database:** MongoDB Atlas

## 📌 Project Overview

The goal of this project is to build an employee management application with a React frontend, a Node.js and Express backend, and MongoDB for persistent data storage.

In addition to implementing the core employee management requirements, the project includes extra features to improve usability, data visualization, and productivity.

## ✅ 1. Core Assignment Requirements

### Employee CRUD Operations

- **Create:** Add new employee records.
- **Read:** Retrieve and view employee information.
- **Update:** Modify existing employee details.
- **Delete:** Remove employee records.

### Employee Data Model and Database

- Implement an Employee data model using Mongoose.
- Store employee records in MongoDB.
- Persist changes to the database.
- Retrieve employee data through backend API endpoints.

### REST API Development

- Implement API endpoints for employee creation, retrieval, updating, and deletion.
- Connect the React frontend to the Express backend.
- Handle API requests and responses.

### Input Validation and Error Handling

- Validate employee input before processing requests.
- Handle duplicate email addresses.
- Handle invalid input and unsuccessful requests.
- Provide appropriate feedback for application operations.

### Documentation and Deployment

- Maintain project documentation in GitHub.
- Deploy the frontend and backend.
- Configure the application to connect to the deployed API and database.

## ✨ 2. Additional Features Implemented

The following features extend the core assignment and improve the application's functionality.

### 📊 Employee Analytics Dashboard

- Display employee statistics.
- Track active and inactive employees.
- Visualize employment-status distribution.
- Calculate total monthly payroll.
- Calculate average monthly salary.
- Display employee distribution by department through visual bar charts.

### 🌙 Dark and Light Mode

- Switch between light and dark themes.
- Apply theme styling across the dashboard.
- Save the selected theme preference in the browser.

### 📥 Export Employee Data to CSV

- Download employee records as a CSV file.
- Export employee names, email addresses, departments, positions, monthly salaries, and employment statuses.
- Export the records currently displayed after search and filtering.

### 🔍 Search and Filtering

- Search employee records.
- Filter employees by department.
- Filter employees by employment status.
- Update the displayed records and related analytics according to the active filters.

### 🎨 Dashboard UI and User Experience

- Create a modern employee dashboard.
- Organize employee records in a structured table.
- Use modals for employee creation, editing, and viewing details.
- Provide employee status indicators and summary cards.
- Support responsive layouts for different screen sizes.

## 🛠️ 3. Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| API | REST API |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## 🏗️ 4. Application Architecture

The application follows a client-server architecture.

1. **Frontend:** React provides the employee management interface and dashboard.
2. **Backend:** Express.js handles API requests and employee operations.
3. **Database:** MongoDB stores employee records, accessed through Mongoose.
4. **Integration:** The frontend communicates with the backend through HTTP requests.
5. **Deployment:** The frontend is hosted on Vercel and the backend on Render.

## 📁 5. Project Structure

```text
gupio-employee-management/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── package.json
│   └── ...
└── README.md
```

The backend may contain additional files and folders according to the implementation.

## 🚀 6. Live Deployment

### Frontend — React Application

The frontend is deployed on Vercel and provides the employee management interface, analytics dashboard, theme switching, search and filtering, and CSV export functionality.

**Live Application:**

https://gupio-employee-management.vercel.app/

### Backend — REST API

The backend is deployed on Render using Node.js and Express.js. It handles employee-related API requests and connects to MongoDB for data storage.

**Backend URL:**

https://gupio-employee-management.onrender.com/

**Employees API Endpoint:**

https://gupio-employee-management.onrender.com/api/employees

### GitHub Repository

The complete project source code is available on GitHub.

**Repository URL:**

https://github.com/Yashaswini-2006-4/gupio-employee-management

## ⚙️ 7. Running the Project Locally

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### Clone the Repository

```bash
git clone https://github.com/Yashaswini-2006-4/gupio-employee-management.git
cd gupio-employee-management
```

### Start the Backend

Navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

Configure the required backend environment variables in a `.env` file, including the MongoDB connection string and server port.

Start the backend using the appropriate script in `backend/package.json`, for example:

```bash
npm run dev
```

### Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Configure the frontend API URL if required:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

**Security:** Keep database credentials and other secrets in environment variables. Never commit them to GitHub.

## 🎯 8. Project Highlights

- Implemented full-stack employee management functionality.
- Integrated a React frontend with an Express REST API.
- Used MongoDB for persistent data storage.
- Added input validation and duplicate-email handling.
- Built an employee analytics dashboard.
- Implemented persistent dark/light theme preferences.
- Added CSV export functionality.
- Integrated search and department/status filtering.
- Deployed the frontend and backend online.
- Documented the project and source code using GitHub.

## 🔮 9. Potential Future Enhancements

- User authentication and role-based access control.
- Pagination for large employee datasets.
- Advanced reporting and additional analytics.
- Automated backend and frontend testing.
- PDF report generation.

## 👩‍💻 Author

**Yashaswini**

Computer Science and Engineering Student

Interested in full-stack development and building practical web applications.

---

*Developed as a technical assignment for Gupio and extended with additional dashboard, analytics, and data-export functionality.*