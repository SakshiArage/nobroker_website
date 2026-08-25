import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import OverviewChart from "../components/OverviewChart";
import RecentActivity from "../components/RecentActivity";
import UserRegistrations from "../components/UserRegistration";
import TopLocations from "../components/TopLocations";
import AuditLogs from "../components/AuditLogs";

function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={() => navigate("/admin/login")}
      />

      {/* MAIN */}

      <main
        className={`dashboard-main ${
          collapsed
            ? "dashboard-main-expanded"
            : ""
        }`}
      >

        {/* HEADER */}

        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onLogout={() => navigate("/admin/login")}
          title="Dashboard"
        />

        {/* CONTENT */}

        <div className="dashboard-content">

          {/* STAT CARDS */}

          <section className="stats-grid">

            <StatCard
              title="Total Users"
              value="12,458"
              percentage="12.5%"
              type="users"
            />

            <StatCard
              title="Total Properties"
              value="8,756"
              percentage="8.3%"
              type="properties"
            />

            <StatCard
              title="Active Listings"
              value="5,234"
              percentage="10.2%"
              type="listings"
            />

            <StatCard
              title="Total Transactions"
              value="3,245"
              percentage="15.7%"
              type="transactions"
            />

          </section>

          {/* FIRST ROW */}

          <section className="dashboard-grid-main">

            <OverviewChart />

            <RecentActivity />

          </section>

          {/* SECOND ROW */}

          <section className="dashboard-grid-bottom">

            <UserRegistrations />

            <TopLocations />

            <AuditLogs />

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
