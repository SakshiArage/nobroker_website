import {
  Clock3,
  UserRound,
  Trash2,
  Settings
} from "lucide-react";

const logs = [
  {
    title: "Admin login",
    description: "admin@example.com",
    time: "2 min ago",
    icon: Clock3
  },
  {
    title: "Updated user role",
    description: "Changed role of user #1256",
    time: "30 min ago",
    icon: UserRound
  },
  {
    title: "Deleted property",
    description: "Property ID #1256 deleted",
    time: "1 hr ago",
    icon: Trash2
  },
  {
    title: "Updated system settings",
    description: "Email notifications settings updated",
    time: "2 hr ago",
    icon: Settings
  }
];

function AuditLogs() {

  return (
    <div className="dashboard-panel audit-panel">

      <div className="panel-header">

        <h2>
          Audit Logs
        </h2>

        <button className="view-all">
          View All
        </button>

      </div>

      <div className="audit-list">

        {logs.map((log) => {

          const Icon = log.icon;

          return (
            <div
              className="audit-item"
              key={log.title}
            >

              <div className="audit-icon">
                <Icon size={17} />
              </div>

              <div className="audit-info">

                <strong>
                  {log.title}
                </strong>

                <span>
                  {log.description}
                </span>

              </div>

              <small>
                {log.time}
              </small>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default AuditLogs;