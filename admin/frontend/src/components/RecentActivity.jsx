import {
  UserRound,
  Home,
  FileText,
  IndianRupee,
  ShieldCheck
} from "lucide-react";

const activities = [
  {
    title: "New user registered",
    description: "john.doe@example.com",
    time: "2 min ago",
    icon: UserRound,
    type: "blue"
  },
  {
    title: "New property added",
    description: "2 BHK Apartment in Koramangala",
    time: "15 min ago",
    icon: Home,
    type: "green"
  },
  {
    title: "Property listed",
    description: "3 BHK Villa in Whitefield",
    time: "30 min ago",
    icon: FileText,
    type: "purple"
  },
  {
    title: "Payment received",
    description: "₹25,000 from User #1245",
    time: "1 hr ago",
    icon: IndianRupee,
    type: "green"
  },
  {
    title: "User verified",
    description: "alice.brown@example.com",
    time: "2 hr ago",
    icon: ShieldCheck,
    type: "orange"
  }
];

function RecentActivity() {

  return (
    <div className="dashboard-panel activity-panel">

      <div className="panel-header">

        <h2>
          Recent Activity
        </h2>

        <button className="view-all">
          View All
        </button>

      </div>

      <div className="activity-list">

        {activities.map((activity) => {

          const Icon = activity.icon;

          return (
            <div
              className="activity-item"
              key={activity.title}
            >

              <div
                className={`activity-icon ${activity.type}`}
              >
                <Icon size={20} />
              </div>

              <div className="activity-info">

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.description}
                </span>

              </div>

              <small>
                {activity.time}
              </small>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default RecentActivity;