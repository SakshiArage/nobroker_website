import {
  Menu,
  Bell,
  ChevronDown,
  UserRound,
  LogOut
} from "lucide-react";
import { useState } from "react";

function Header({ collapsed, setCollapsed, onLogout, title = "Dashboard" }) {

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="dashboard-header">

      <div className="header-left">

        <button
          className="menu-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={23} />
        </button>

        <h1>{title}</h1>

      </div>

      <div className="header-right">

        {/* NOTIFICATION */}

        <button className="notification-button">

          <Bell size={22} />

          <span className="notification-count">
            5
          </span>

        </button>

        {/* PROFILE */}

        <div className="profile-menu">
          <button
            className="admin-profile"
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >

          <div className="profile-avatar">
            AD
          </div>

          <div className="profile-info">

            <strong>
              Admin User
            </strong>

            <span>
              Super Admin
            </span>

          </div>

          <ChevronDown size={17} />

          </button>

          {profileOpen && (
            <div className="profile-dropdown" role="menu">
              <button type="button" role="menuitem">
                <UserRound size={17} />
                Profile
              </button>
              <button type="button" role="menuitem" onClick={onLogout}>
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Header;
