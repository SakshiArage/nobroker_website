import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Home,
  Megaphone,
  Receipt,
  BarChart3,
  FileClock,
  Wallet,
  Headphones,
  Settings,
  ShieldCheck,
  Sliders,
  LogOut,
  ChevronRight
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed, onLogout }) {

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard"
    },
    {
      name: "User Management",
      icon: Users,
      path: "/admin/users",
      arrow: true
    },
    {
      name: "Property Management",
      icon: Home,
      arrow: true
    },
    {
      name: "Listings & Ads",
      icon: Megaphone,
      arrow: true
    },
    {
      name: "Transactions",
      icon: Receipt,
      arrow: true
    },
    {
      name: "Reports & Analytics",
      icon: BarChart3,
      arrow: true
    },
    {
      name: "Audit Logs",
      icon: FileClock
    },
    {
      name: "Payments & Payouts",
      icon: Wallet
    },
    {
      name: "Support & Helpdesk",
      icon: Headphones,
      arrow: true
    },
    {
      name: "Settings",
      icon: Settings
    },
    {
      name: "Roles & Permissions",
      icon: ShieldCheck
    },
    {
      name: "System Settings",
      icon: Sliders
    }
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          @
        </div>

        {!collapsed && (
          <span>noBroker</span>
        )}

      </div>

      {/* MENU */}

      <div className="sidebar-section-title">
        {!collapsed && "ADMIN PANEL"}
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => {

          const Icon = item.icon;
          const isActive = item.path
            ? location.pathname.startsWith(item.path)
            : false;

          return (
            <button
              key={item.name}
              className={`sidebar-item ${
                isActive ? "sidebar-item-active" : ""
              }`}
              title={collapsed ? item.name : ""}
              onClick={() => item.path && navigate(item.path)}
            >

              <Icon size={21} />

              {!collapsed && (
                <>
                  <span>{item.name}</span>

                  {item.arrow && (
                    <ChevronRight
                      size={17}
                      className="sidebar-arrow"
                    />
                  )}
                </>
              )}

            </button>
          );

        })}

      </nav>

      {/* BOTTOM */}

      <div className="sidebar-bottom">

        <button className="sidebar-item logout-item" onClick={onLogout}>

          <LogOut size={21} />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
