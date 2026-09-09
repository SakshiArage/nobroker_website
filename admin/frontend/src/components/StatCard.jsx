import {
  Users,
  Home,
  FileText,
  IndianRupee,
  TrendingUp
} from "lucide-react";

function StatCard({
  title,
  value,
  percentage,
  type
}) {

  const icons = {
    users: Users,
    properties: Home,
    listings: FileText,
    transactions: IndianRupee
  };

  const Icon = icons[type];

  return (
    <div className="stat-card">

      <div className={`stat-icon stat-${type}`}>
        <Icon size={27} />
      </div>

      <div className="stat-content">

        <span className="stat-title">
          {title}
        </span>

        <strong className="stat-value">
          {value}
        </strong>

        <div className="stat-growth">

          <TrendingUp size={17} />

          <span>
            {percentage}
          </span>

          <small>
            vs last month
          </small>

        </div>

      </div>

    </div>
  );
}

export default StatCard;