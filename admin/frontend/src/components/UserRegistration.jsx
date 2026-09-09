import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "May 17", users: 850 },
  { day: "May 18", users: 1200 },
  { day: "May 19", users: 1000 },
  { day: "May 20", users: 730 },
  { day: "May 21", users: 1000 },
  { day: "May 22", users: 850 },
  { day: "May 23", users: 500 }
];

function UserRegistrations() {

  return (
    <div className="dashboard-panel small-chart-panel">

      <div className="panel-header">

        <h2>
          User Registrations
        </h2>

        <span className="panel-period">
          Last 7 Days
        </span>

      </div>

      <div className="bar-chart">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 0
            }}
          >

            <CartesianGrid
              vertical={false}
              stroke="#e8ebef"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#667085",
                fontSize: 11
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 1500]}
              ticks={[0, 500, 1000, 1500]}
              tick={{
                fill: "#667085",
                fontSize: 11
              }}
            />

            <Tooltip />

            <Bar
              dataKey="users"
              fill="#ef5b7b"
              radius={[
                4,
                4,
                0,
                0
              ]}
              barSize={17}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default UserRegistrations;