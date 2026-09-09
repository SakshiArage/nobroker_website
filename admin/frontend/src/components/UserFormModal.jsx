import { useEffect, useState } from "react";
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Tag,
  ShieldCheck
} from "lucide-react";

const emptyUserForm = {
  name: "",
  email: "",
  phone: "",
  role: "User",
  status: "Active",
  location: "",
  propertyPreference: "Buyer",
  password: "",
  confirmPassword: ""
};

const emptyAdminForm = {
  name: "",
  email: "",
  phone: "",
  role: "Admin",
  status: "Active",
  department: "Operations",
  permissions: ["Dashboard"],
  password: "",
  confirmPassword: ""
};

const permissionOptions = [
  "Dashboard",
  "User Management",
  "Property Management",
  "Listings & Ads",
  "Transactions",
  "Reports & Analytics",
  "Payments & Payouts",
  "Settings"
];

const departmentOptions = [
  "Operations",
  "Customer Support",
  "Finance",
  "Technology",
  "Compliance & Trust"
];

function UserFormModal({ mode, initialData, defaultRole, onClose, onSave }) {

  const isAdminVariant =
    (initialData?.role || defaultRole) === "Admin" ||
    (initialData?.role || defaultRole) === "Super Admin";

  const [form, setForm] = useState(isAdminVariant ? emptyAdminForm : emptyUserForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    const base = isAdminVariant ? emptyAdminForm : emptyUserForm;

    if (mode === "edit" && initialData) {
      setForm({
        ...base,
        ...initialData,
        password: "",
        confirmPassword: ""
      });
    } else {
      setForm({
        ...base,
        role: defaultRole || base.role
      });
    }

  }, [mode, initialData, defaultRole, isAdminVariant]);

  const isSuperAdmin = form.role === "Super Admin";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePermission = (permission) => {
    setForm((prev) => {
      const has = prev.permissions?.includes(permission);
      const next = has
        ? prev.permissions.filter((p) => p !== permission)
        : [...(prev.permissions || []), permission];
      return { ...prev, permissions: next };
    });
    setErrors((prev) => ({ ...prev, permissions: "" }));
  };

  const validate = () => {

    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (isAdminVariant && !isSuperAdmin && (!form.permissions || form.permissions.length === 0)) {
      nextErrors.permissions = "Select at least one module";
    }

    if (mode === "create") {
      if (!form.password) {
        nextErrors.password = "Password is required";
      } else if (form.password.length < 6) {
        nextErrors.password = "Password must be at least 6 characters";
      }

      if (form.confirmPassword !== form.password) {
        nextErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    const { confirmPassword, password, ...rest } = form;

    onSave({
      ...rest,
      ...(isSuperAdmin ? { permissions: [...permissionOptions] } : {}),
      ...(mode === "create" ? { password } : {})
    });

  };

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <h2>
              {mode === "edit"
                ? isAdminVariant ? "Edit Admin" : "Edit User"
                : isAdminVariant ? "Add New Admin" : "Add New User"}
            </h2>
            <p className="modal-subtitle">
              {isAdminVariant
                ? "Grants backend access to the admin panel"
                : "Creates a regular marketplace account"}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form className="modal-form" onSubmit={handleSubmit}>

          <div className="form-section-title">Basic Details</div>

          <div className="form-row">

            <div className="input-group">

              <label>Full Name</label>

              <div className={`input-wrapper ${errors.name ? "input-error" : ""}`}>
                <UserIcon size={17} />
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}

            </div>

            <div className="input-group">

              <label>Email Address</label>

              <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                <Mail size={17} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}

            </div>

          </div>

          <div className="form-row">

            <div className="input-group">

              <label>Phone Number</label>

              <div className={`input-wrapper ${errors.phone ? "input-error" : ""}`}>
                <Phone size={17} />
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}

            </div>

            <div className="input-group">

              <label>Status</label>

              <select
                className="select-field"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>

            </div>

          </div>

          {/* ===== USER-ONLY FIELDS ===== */}

          {!isAdminVariant && (
            <>
              <div className="form-section-title">Marketplace Details</div>

              <div className="form-row">

                <div className="input-group">

                  <label>Location</label>

                  <div className="input-wrapper">
                    <MapPin size={17} />
                    <input
                      type="text"
                      placeholder="City, Area"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </div>

                </div>

                <div className="input-group">

                  <label>Property Preference</label>

                  <div className="input-wrapper">
                    <Tag size={17} />
                    <select
                      className="select-plain"
                      value={form.propertyPreference}
                      onChange={(e) => handleChange("propertyPreference", e.target.value)}
                    >
                      <option value="Buyer">Buyer</option>
                      <option value="Tenant">Tenant</option>
                      <option value="Owner / Seller">Owner / Seller</option>
                    </select>
                  </div>

                </div>

              </div>
            </>
          )}

          {/* ===== ADMIN-ONLY FIELDS ===== */}

          {isAdminVariant && (
            <>
              <div className="form-section-title">Admin Access</div>

              <div className="form-row">

                <div className="input-group">

                  <label>Admin Role</label>

                  <select
                    className="select-field"
                    value={form.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>

                </div>

                <div className="input-group">

                  <label>Department</label>

                  <div className="input-wrapper">
                    <Building2 size={17} />
                    <select
                      className="select-plain"
                      value={form.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                    >
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              <div className="input-group">

                <label>Module Permissions</label>

                {isSuperAdmin ? (
                  <div className="super-admin-note">
                    <ShieldCheck size={17} />
                    Super Admins automatically get full access to every module.
                  </div>
                ) : (
                  <>
                    <div className="permission-grid">
                      {permissionOptions.map((permission) => (
                        <label
                          className="permission-checkbox"
                          key={permission}
                        >
                          <input
                            type="checkbox"
                            checked={form.permissions?.includes(permission) || false}
                            onChange={() => togglePermission(permission)}
                          />
                          {permission}
                        </label>
                      ))}
                    </div>

                    {errors.permissions && (
                      <span className="field-error">{errors.permissions}</span>
                    )}
                  </>
                )}

              </div>
            </>
          )}

          {mode === "create" && (
            <>
              <div className="form-section-title">Set Password</div>

              <div className="form-row">

                <div className="input-group">

                  <label>Password</label>

                  <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
                    <Lock size={17} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <button
                      type="button"
                      className="eye-button"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {errors.password && (
                    <span className="field-error">{errors.password}</span>
                  )}

                </div>

                <div className="input-group">

                  <label>Confirm Password</label>

                  <div className={`input-wrapper ${errors.confirmPassword ? "input-error" : ""}`}>
                    <Lock size={17} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                  </div>

                  {errors.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}

                </div>

              </div>
            </>
          )}

          <div className="modal-actions">

            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {mode === "edit"
                ? "Save Changes"
                : isAdminVariant ? "Create Admin Account" : "Create User Account"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UserFormModal;
