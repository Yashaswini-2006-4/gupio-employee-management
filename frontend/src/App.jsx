
import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const API = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/employees`;

const emptyForm = {
  name: "",
  email: "",
  department: "",
  position: "",
  salary: "",
  status: "Active",
};

const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Design",
];

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("gupio-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("gupio-theme", theme);
    } catch {
      // The theme still works if browser storage is unavailable.
    }
  }, [theme]);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (department) params.set("department", department);
      if (status) params.set("status", status);

      const response = await fetch(`${API}?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load employees");
      }

      setEmployees(data);
    } catch (err) {
      setError(err.message || "Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [search, department, status]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
    setNotice("");
  }

  function openEdit(employee) {
    setEditing(employee);
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      status: employee.status,
    });
    setShowForm(true);
    setError("");
    setNotice("");
  }

  function closeModals() {
    setShowForm(false);
    setViewing(null);
    setEditing(null);
    setForm(emptyForm);
  }

  async function saveEmployee(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        editing ? `${API}/${editing._id}` : API,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            salary: Number(form.salary),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save employee");
      }

      const wasEditing = Boolean(editing);

      closeModals();

      setNotice(
        wasEditing
          ? "Employee updated successfully."
          : "Employee added successfully."
      );

      await loadEmployees();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  async function deleteEmployee(employee) {
    if (
      !window.confirm(
        `Delete ${employee.name}? This cannot be undone.`
      )
    ) {
      return;
    }

    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API}/${employee._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete employee");
      }

      setNotice("Employee deleted successfully.");

      if (viewing?._id === employee._id) {
        setViewing(null);
      }

      await loadEmployees();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  // Analytics are calculated from the currently displayed records.
  const analytics = useMemo(() => {
    const total = employees.length;

    const active = employees.filter(
      (employee) => employee.status === "Active"
    ).length;

    const inactive = employees.filter(
      (employee) => employee.status === "Inactive"
    ).length;

    const departmentCounts = employees.reduce((counts, employee) => {
      const name = employee.department || "Unassigned";
      counts[name] = (counts[name] || 0) + 1;
      return counts;
    }, {});

    const departments = Object.entries(departmentCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const totalSalary = employees.reduce(
      (sum, employee) => sum + (Number(employee.salary) || 0),
      0
    );

    const averageSalary = total ? totalSalary / total : 0;

    return {
      total,
      active,
      inactive,
      departments,
      totalSalary,
      averageSalary,
      activePercentage: total ? Math.round((active / total) * 100) : 0,
      inactivePercentage: total
        ? Math.round((inactive / total) * 100)
        : 0,
    };
  }, [employees]);

  function exportCSV() {
    if (!employees.length) {
      setNotice("There are no employee records to export.");
      return;
    }

    const columns = [
      ["Name", "name"],
      ["Email", "email"],
      ["Department", "department"],
      ["Position", "position"],
      ["Monthly Salary", "salary"],
      ["Status", "status"],
    ];

    // Escape CSV values safely, including commas and quotation marks.
    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvRows = [
      columns.map(([label]) => escapeCSV(label)).join(","),
      ...employees.map((employee) =>
        columns
          .map(([, key]) => escapeCSV(employee[key]))
          .join(",")
      ),
    ];

    // UTF-8 BOM improves compatibility with spreadsheet software.
    const csvContent = "\uFEFF" + csvRows.join("\r\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `gupio-employees-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setNotice("Employee CSV exported successfully.");
  }

  return (
    <main className={`app-shell ${theme}-theme`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">G</span> gupio
          <span className="brand-dot">.</span>
        </div>

        <p className="side-label">WORKSPACE</p>

        <div className="side-link active">
          <span>▦</span> Employees
        </div>

        <div className="side-note">EMPLOYEE MANAGEMENT</div>

        <div className="sidebar-bottom">
          <div className="avatar">HR</div>
          <div>
            <strong>HR Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <span>
            Workspace / <strong>Employees</strong>
          </span>

          <div className="topbar-actions">
            <button
              className="theme-toggle"
              onClick={() =>
                setTheme((current) =>
                  current === "light" ? "dark" : "light"
                )
              }
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
              type="button"
            >
              {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
            </button>

            <span className="live-status">
              <i /> System workspace
            </span>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">PEOPLE & ORGANIZATION</p>
              <h1>Employee directory</h1>
              <p className="subtitle">
                Manage your people, all in one place.
              </p>
            </div>

            <button className="primary-btn" onClick={openCreate}>
              ＋ Add employee
            </button>
          </div>

          {notice && (
            <div className="notice" role="status">
              {notice}
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setNotice("")}
              >
                ×
              </button>
            </div>
          )}

          {error && (
            <div className="error-banner" role="alert">
              {error}
            </div>
          )}

          {/* Summary cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span>Total employees</span>
              <strong>{analytics.total}</strong>
              <small>Matching current filters</small>
            </div>

            <div className="stat-card">
              <span>Active employees</span>
              <strong>{analytics.active}</strong>
              <small>
                {analytics.activePercentage}% of displayed employees
              </small>
            </div>

            <div className="stat-card">
              <span>Departments</span>
              <strong>{analytics.departments.length}</strong>
              <small>Represented in current results</small>
            </div>
          </div>

          {/* Employee analytics dashboard */}
          <section className="analytics-section">
            <div className="analytics-heading">
              <div>
                <p className="eyebrow">WORKFORCE OVERVIEW</p>
                <h2>Employee analytics</h2>
                <p className="subtitle">
                  A snapshot of the employees matching your current filters.
                </p>
              </div>

              <button
                className="export-btn"
                type="button"
                onClick={exportCSV}
                disabled={loading || employees.length === 0}
                title="Download displayed employee records as CSV"
              >
                <span aria-hidden="true">↓</span> Export CSV
              </button>
            </div>

            <div className="analytics-grid">
              <article className="analytics-card status-analytics">
                <div className="analytics-card-heading">
                  <div>
                    <h3>Employee status</h3>
                    <p>Active vs. inactive</p>
                  </div>
                  <span className="analytics-icon">◉</span>
                </div>

                <div className="status-summary">
                  <div>
                    <span className="status-dot active-dot" />
                    <span>Active</span>
                    <strong>{analytics.active}</strong>
                  </div>

                  <div>
                    <span className="status-dot inactive-dot" />
                    <span>Inactive</span>
                    <strong>{analytics.inactive}</strong>
                  </div>
                </div>

                <div
                  className="status-progress"
                  role="img"
                  aria-label={`${analytics.active} active and ${analytics.inactive} inactive employees`}
                >
                  <span
                    className="active-progress"
                    style={{
                      width: `${analytics.total
                        ? (analytics.active / analytics.total) * 100
                        : 0}%`,
                    }}
                  />
                  <span
                    className="inactive-progress"
                    style={{
                      width: `${analytics.total
                        ? (analytics.inactive / analytics.total) * 100
                        : 0}%`,
                    }}
                  />
                </div>

                <p className="analytics-footnote">
                  {analytics.activePercentage}% of displayed employees are
                  active.
                </p>
              </article>

              <article className="analytics-card salary-analytics">
                <div className="analytics-card-heading">
                  <div>
                    <h3>Salary overview</h3>
                    <p>Based on monthly salary records</p>
                  </div>
                  <span className="analytics-icon">₹</span>
                </div>

                <div className="salary-metric">
                  <span>Total monthly payroll</span>
                  <strong>{money(analytics.totalSalary)}</strong>
                </div>

                <div className="salary-divider" />

                <div className="salary-metric">
                  <span>Average monthly salary</span>
                  <strong>{money(analytics.averageSalary)}</strong>
                </div>

                <p className="analytics-footnote">
                  Calculated from the displayed employee records.
                </p>
              </article>

              <article className="analytics-card department-analytics">
                <div className="analytics-card-heading">
                  <div>
                    <h3>Department breakdown</h3>
                    <p>Employees by department</p>
                  </div>
                  <span className="analytics-icon">▥</span>
                </div>

                {analytics.departments.length === 0 ? (
                  <div className="analytics-empty">
                    Department insights will appear when employee records
                    are available.
                  </div>
                ) : (
                  <div className="department-chart">
                    {analytics.departments.map((item) => {
                      const percentage = analytics.total
                        ? (item.count / analytics.total) * 100
                        : 0;

                      return (
                        <div className="department-row" key={item.name}>
                          <div className="department-label">
                            <span title={item.name}>{item.name}</span>
                            <strong>{item.count}</strong>
                          </div>

                          <div className="department-track">
                            <span
                              className="department-bar"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            </div>
          </section>

          {/* Employee directory */}
          <section className="directory-card">
            <div className="directory-heading">
              <div>
                <h2>All employees</h2>
                <p>View and manage employee records.</p>
              </div>

              <span className="count-pill">
                {employees.length} records
              </span>
            </div>

            <div className="filters">
              <input
                aria-label="Search employees"
                placeholder="⌕  Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                aria-label="Filter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">All departments</option>
                {DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>DEPARTMENT</th>
                    <th>POSITION</th>
                    <th>SALARY</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        Loading employees...
                      </td>
                    </tr>
                  ) : employees.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-icon">♙</div>
                        <strong>No employees found</strong>
                        <p>
                          Add an employee or change your search filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          <button
                            className="employee-name"
                            onClick={() => setViewing(employee)}
                          >
                            {employee.name}
                          </button>
                          <small className="email">
                            {employee.email}
                          </small>
                        </td>

                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>{money(employee.salary)}</td>

                        <td>
                          <span
                            className={`status ${
                              employee.status === "Active"
                                ? "status-active"
                                : "status-inactive"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </td>

                        <td>
                          <div className="actions">
                            <button
                              title="View details"
                              onClick={() => setViewing(employee)}
                            >
                              View
                            </button>

                            <button
                              title="Edit employee"
                              onClick={() => openEdit(employee)}
                            >
                              Edit
                            </button>

                            <button
                              className="delete-action"
                              title="Delete employee"
                              onClick={() => deleteEmployee(employee)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              Employee records are stored in your database.
            </div>
          </section>

          <footer>
            Gupio Employee Management System
            <span>Built with React · Express · MongoDB</span>
          </footer>
        </div>
      </section>

      {/* Add, edit and view modals */}
      {(showForm || viewing) && (
        <div className="modal-backdrop" onClick={closeModals}>
          <section
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close modal"
              onClick={closeModals}
            >
              ×
            </button>

            {showForm ? (
              <>
                <p className="eyebrow">
                  {editing ? "UPDATE RECORD" : "NEW RECORD"}
                </p>

                <h2>
                  {editing ? "Edit employee" : "Add employee"}
                </h2>

                <p className="subtitle">
                  Enter the employee information below.
                </p>

                <form className="employee-form" onSubmit={saveEmployee}>
                  <label>
                    Full name
                    <input
                      required
                      maxLength="100"
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="e.g. Ananya Rao"
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      placeholder="name@company.com"
                    />
                  </label>

                  <label>
                    Department
                    <select
                      required
                      value={form.department}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          department: event.target.value,
                        })
                      }
                    >
                      <option value="">Select department</option>
                      {DEPARTMENTS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Position
                    <input
                      required
                      maxLength="100"
                      value={form.position}
                      onChange={(event) =>
                        setForm({ ...form, position: event.target.value })
                      }
                      placeholder="e.g. Software Engineer"
                    />
                  </label>

                  <label>
                    Monthly salary (₹)
                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      value={form.salary}
                      onChange={(event) =>
                        setForm({ ...form, salary: event.target.value })
                      }
                      placeholder="e.g. 35000"
                    />
                  </label>

                  <label>
                    Status
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({ ...form, status: event.target.value })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>

                  <button className="primary-btn full-btn" type="submit">
                    {editing ? "Save changes" : "Create employee"}
                  </button>
                </form>
              </>
            ) : (
              viewing && (
                <>
                  <p className="eyebrow">EMPLOYEE PROFILE</p>
                  <h2>{viewing.name}</h2>
                  <p className="subtitle">{viewing.position}</p>

                  <div className="detail-list">
                    <div>
                      <span>Email</span>
                      <strong>{viewing.email}</strong>
                    </div>

                    <div>
                      <span>Department</span>
                      <strong>{viewing.department}</strong>
                    </div>

                    <div>
                      <span>Salary</span>
                      <strong>{money(viewing.salary)}</strong>
                    </div>

                    <div>
                      <span>Status</span>
                      <strong>{viewing.status}</strong>
                    </div>

                    <div>
                      <span>Created</span>
                      <strong>
                        {viewing.createdAt
                          ? new Date(viewing.createdAt).toLocaleDateString()
                          : "—"}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="primary-btn full-btn"
                    onClick={() => {
                      const employee = viewing;
                      setViewing(null);
                      openEdit(employee);
                    }}
                  >
                    Edit employee
                  </button>
                </>
              )
            )}
          </section>
        </div>
      )}
    </main>
  );
}
