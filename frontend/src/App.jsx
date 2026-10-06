
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/employees`;

const emptyForm = {
  name: "",
  email: "",
  department: "",
  position: "",
  salary: "",
  status: "Active",
};

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

      if (!response.ok) throw new Error(data.message || "Could not load employees");
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
          body: JSON.stringify({ ...form, salary: Number(form.salary) }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not save employee");

      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      setNotice(editing ? "Employee updated successfully." : "Employee added successfully.");
      await loadEmployees();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  async function deleteEmployee(employee) {
    if (!window.confirm(`Delete ${employee.name}? This cannot be undone.`)) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API}/${employee._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not delete employee");

      setNotice("Employee deleted successfully.");
      if (viewing?._id === employee._id) setViewing(null);
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

  const activeCount = employees.filter((e) => e.status === "Active").length;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">G</span> gupio<span className="brand-dot">.</span></div>
        <p className="side-label">WORKSPACE</p>
        <div className="side-link active"><span>▦</span> Employees</div>
        <div className="side-note">EMPLOYEE MANAGEMENT</div>
        <div className="sidebar-bottom">
          <div className="avatar">HR</div>
          <div><strong>HR Admin</strong><small>Administrator</small></div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <span>Workspace / <strong>Employees</strong></span>
          <span className="live-status"><i /> System workspace</span>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">PEOPLE & ORGANIZATION</p>
              <h1>Employee directory</h1>
              <p className="subtitle">Manage your people, all in one place.</p>
            </div>
            <button className="primary-btn" onClick={openCreate}>＋ Add employee</button>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><span>Total employees</span><strong>{employees.length}</strong><small>Matching current filters</small></div>
            <div className="stat-card"><span>Active employees</span><strong>{activeCount}</strong><small>Currently active</small></div>
            <div className="stat-card"><span>Departments</span><strong>{new Set(employees.map((e) => e.department)).size}</strong><small>Represented in results</small></div>
          </div>

          {notice && <div className="notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}
          {error && <div className="error-banner">{error}</div>}

          <section className="directory-card">
            <div className="directory-heading">
              <div><h2>All employees</h2><p>View and manage employee records.</p></div>
              <span className="count-pill">{employees.length} records</span>
            </div>

            <div className="filters">
              <input
                aria-label="Search employees"
                placeholder="⌕  Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select aria-label="Filter department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">All departments</option>
                {["Engineering", "Human Resources", "Marketing", "Sales", "Finance", "Operations", "Design"].map((d) => <option key={d}>{d}</option>)}
              </select>
              <select aria-label="Filter status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="table-wrap">
              <table>
                <thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>POSITION</th><th>SALARY</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="empty-state">Loading employees...</td></tr>
                  ) : employees.length === 0 ? (
                    <tr><td colSpan="6" className="empty-state"><div className="empty-icon">♙</div><strong>No employees found</strong><p>Add an employee or change your search filters.</p></td></tr>
                  ) : employees.map((employee) => (
                    <tr key={employee._id}>
                      <td><button className="employee-name" onClick={() => setViewing(employee)}>{employee.name}</button><small className="email">{employee.email}</small></td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>{money(employee.salary)}</td>
                      <td><span className={`status ${employee.status === "Active" ? "status-active" : "status-inactive"}`}>{employee.status}</span></td>
                      <td><div className="actions"><button title="View details" onClick={() => setViewing(employee)}>View</button><button title="Edit employee" onClick={() => openEdit(employee)}>Edit</button><button className="delete-action" title="Delete employee" onClick={() => deleteEmployee(employee)}>Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">Employee records are stored in your database.</div>
          </section>
          <footer>Gupio Employee Management System <span>Built with React · Express · MongoDB</span></footer>
        </div>
      </section>

      {(showForm || viewing) && (
        <div className="modal-backdrop" onClick={() => { setShowForm(false); setViewing(null); }}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setShowForm(false); setViewing(null); }}>×</button>
            {showForm ? (
              <>
                <p className="eyebrow">{editing ? "UPDATE RECORD" : "NEW RECORD"}</p>
                <h2>{editing ? "Edit employee" : "Add employee"}</h2>
                <p className="subtitle">Enter the employee information below.</p>
                <form className="employee-form" onSubmit={saveEmployee}>
                  <label>Full name<input required maxLength="100" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ananya Rao" /></label>
                  <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" /></label>
                  <label>Department<select required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}><option value="">Select department</option>{["Engineering", "Human Resources", "Marketing", "Sales", "Finance", "Operations", "Design"].map((d) => <option key={d}>{d}</option>)}</select></label>
                  <label>Position<input required maxLength="100" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g. Software Engineer" /></label>
                  <label>Monthly salary (₹)<input required type="number" min="0" step="1" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="e.g. 35000" /></label>
                  <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></label>
                  <button className="primary-btn full-btn" type="submit">{editing ? "Save changes" : "Create employee"}</button>
                </form>
              </>
            ) : viewing && (
              <>
                <p className="eyebrow">EMPLOYEE PROFILE</p>
                <h2>{viewing.name}</h2>
                <p className="subtitle">{viewing.position}</p>
                <div className="detail-list">
                  <div><span>Email</span><strong>{viewing.email}</strong></div>
                  <div><span>Department</span><strong>{viewing.department}</strong></div>
                  <div><span>Salary</span><strong>{money(viewing.salary)}</strong></div>
                  <div><span>Status</span><strong>{viewing.status}</strong></div>
                  <div><span>Created</span><strong>{viewing.createdAt ? new Date(viewing.createdAt).toLocaleDateString() : "—"}</strong></div>
                </div>
                <button className="primary-btn full-btn" onClick={() => { setViewing(null); openEdit(viewing); }}>Edit employee</button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
