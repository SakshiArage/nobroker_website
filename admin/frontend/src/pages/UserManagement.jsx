import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  ShieldPlus,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon,
  UserCheck,
  ShieldCheck,
  UserX
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import UserFormModal from "../components/UserFormModal";
import ConfirmDialog from "../components/ConfirmDialog";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+91 98765 43210", role: "User", status: "Active", location: "Koramangala, Bengaluru", joined: "12 Aug 2026" },
  { id: 2, name: "Alice Brown", email: "alice.brown@example.com", phone: "+91 91234 56780", role: "User", status: "Active", location: "Whitefield, Bengaluru", joined: "10 Aug 2026" },
  { id: 3, name: "Ravi Kumar", email: "ravi.kumar@example.com", phone: "+91 99887 66554", role: "Admin", status: "Active", location: "Indiranagar, Bengaluru", joined: "02 Jul 2026" },
  { id: 4, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 90909 12345", role: "Super Admin", status: "Active", location: "HSR Layout, Bengaluru", joined: "18 Jan 2026" },
  { id: 5, name: "Mohammed Ali", email: "mohammed.ali@example.com", phone: "+91 87654 32109", role: "User", status: "Inactive", location: "Powai, Mumbai", joined: "28 Jun 2026" },
  { id: 6, name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "+91 98123 45670", role: "User", status: "Blocked", location: "Gachibowli, Hyderabad", joined: "05 May 2026" },
  { id: 7, name: "Karan Mehta", email: "karan.mehta@example.com", phone: "+91 90011 22334", role: "Admin", status: "Active", location: "Andheri, Mumbai", joined: "14 Apr 2026" },
  { id: 8, name: "Divya Nair", email: "divya.nair@example.com", phone: "+91 97865 54321", role: "User", status: "Active", location: "Kothrud, Pune", joined: "22 Mar 2026" },
  { id: 9, name: "Arjun Verma", email: "arjun.verma@example.com", phone: "+91 96754 32198", role: "User", status: "Inactive", location: "Salt Lake, Kolkata", joined: "09 Mar 2026" },
  { id: 10, name: "Neha Kapoor", email: "neha.kapoor@example.com", phone: "+91 95643 21870", role: "User", status: "Active", location: "Sector 62, Noida", joined: "27 Feb 2026" },
  { id: 11, name: "Vikram Singh", email: "vikram.singh@example.com", phone: "+91 94532 10987", role: "User", status: "Active", location: "Banjara Hills, Hyderabad", joined: "11 Feb 2026" },
  { id: 12, name: "Anjali Gupta", email: "anjali.gupta@example.com", phone: "+91 93421 09876", role: "User", status: "Blocked", location: "Viman Nagar, Pune", joined: "30 Jan 2026" }
];

const avatarPalette = [
  "#ef476f", "#2879e9", "#2bae6b", "#eea438", "#8b5cf6", "#0ea5e9"
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getAvatarColor(name) {
  const index = name.charCodeAt(0) % avatarPalette.length;
  return avatarPalette[index];
}

function roleBadgeClass(role) {
  if (role === "Super Admin") return "role-badge role-superadmin";
  if (role === "Admin") return "role-badge role-admin";
  return "role-badge role-user";
}

function statusBadgeClass(status) {
  if (status === "Active") return "status-badge status-active";
  if (status === "Blocked") return "status-badge status-blocked";
  return "status-badge status-inactive";
}

const PAGE_SIZE = 7;

function UserManagement() {

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;

    });

  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const updateFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const adminCount = users.filter((u) => u.role === "Admin" || u.role === "Super Admin").length;
  const blockedCount = users.filter((u) => u.status === "Blocked").length;

  const openCreateModal = (defaultRole) => {
    setModalState({ mode: "create", defaultRole, data: null });
  };

  const openEditModal = (user) => {
    setModalState({ mode: "edit", defaultRole: user.role, data: user });
  };

  const closeModal = () => setModalState(null);

  const handleSaveUser = (formData) => {

    if (modalState.mode === "edit") {

      setUsers((prev) =>
        prev.map((u) =>
          u.id === modalState.data.id ? { ...u, ...formData } : u
        )
      );

    } else {

      const newUser = {
        ...formData,
        id: Math.max(0, ...users.map((u) => u.id)) + 1,
        joined: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      };

      setUsers((prev) => [newUser, ...prev]);

    }

    closeModal();

  };

  const handleDeleteConfirmed = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={() => navigate("/admin/login")}
      />

      <main
        className={`dashboard-main ${collapsed ? "dashboard-main-expanded" : ""}`}
      >

        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onLogout={() => navigate("/admin/login")}
          title="User Management"
        />

        <div className="dashboard-content">

          {/* STAT CARDS */}

          <section className="stats-grid">

            <StatCard
              title="Total Users"
              value={totalUsers.toLocaleString()}
              percentage="12.5%"
              type="users"
            />

            <div className="stat-card">
              <div className="stat-icon stat-listings">
                <UserCheck size={27} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Active Users</span>
                <strong className="stat-value">{activeUsers.toLocaleString()}</strong>
                <div className="stat-growth">
                  <UsersIcon size={15} />
                  <span>{Math.round((activeUsers / totalUsers) * 100)}%</span>
                  <small>of total users</small>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-transactions">
                <ShieldCheck size={27} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Admins</span>
                <strong className="stat-value">{adminCount.toLocaleString()}</strong>
                <div className="stat-growth">
                  <span>Admin + Super Admin</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-users">
                <UserX size={27} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Blocked Users</span>
                <strong className="stat-value">{blockedCount.toLocaleString()}</strong>
                <div className="stat-growth">
                  <span>Needs review</span>
                </div>
              </div>
            </div>

          </section>

          {/* TABLE PANEL */}

          <section className="dashboard-panel users-panel">

            <div className="users-toolbar">

              <div className="search-wrapper">
                <Search size={17} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => updateFilter(setSearchQuery)(e.target.value)}
                />
              </div>

              <div className="toolbar-filters">

                <select
                  className="select-field"
                  value={roleFilter}
                  onChange={(e) => updateFilter(setRoleFilter)(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>

                <select
                  className="select-field"
                  value={statusFilter}
                  onChange={(e) => updateFilter(setStatusFilter)(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>

              </div>

              <div className="toolbar-actions">

                <button
                  className="btn btn-outline"
                  onClick={() => openCreateModal("Admin")}
                >
                  <ShieldPlus size={17} />
                  Add Admin
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => openCreateModal("User")}
                >
                  <Plus size={17} />
                  Add User
                </button>

              </div>

            </div>

            <div className="table-wrapper">

              <table className="users-table">

                <thead>
                  <tr>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {paginatedUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty-state">
                        No users match your filters.
                      </td>
                    </tr>
                  )}

                  {paginatedUsers.map((user) => (
                    <tr key={user.id}>

                      <td>
                        <div className="user-cell">
                          <div
                            className="user-avatar"
                            style={{ background: getAvatarColor(user.name) }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div className="user-cell-info">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>{user.phone}</td>

                      <td>
                        <span className={roleBadgeClass(user.role)}>
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span className={statusBadgeClass(user.status)}>
                          {user.status}
                        </span>
                      </td>

                      <td className="muted-cell">{user.joined}</td>

                      <td>
                        <div className="row-actions">

                          <button
                            className="icon-btn"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            className="icon-btn"
                            title="Edit"
                            onClick={() => openEditModal(user)}
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="icon-btn icon-btn-danger"
                            title="Delete"
                            onClick={() => setDeleteTarget(user)}
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            <div className="table-pagination">

              <span className="pagination-summary">
                Showing {paginatedUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length} users
              </span>

              <div className="pagination-controls">

                <button
                  className="icon-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "page-btn-active" : ""}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="icon-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>

          </section>

        </div>

      </main>

      {modalState && (
        <UserFormModal
          mode={modalState.mode}
          initialData={modalState.data}
          defaultRole={modalState.defaultRole}
          onClose={closeModal}
          onSave={handleSaveUser}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete this account?"
          message={`This will permanently remove ${deleteTarget.name} (${deleteTarget.email}). This action cannot be undone.`}
          confirmLabel="Delete"
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

    </div>
  );
}

export default UserManagement;
