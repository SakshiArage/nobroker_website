import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    day: "May 17",
    users: 2000,
    listings: 1000
  },
  {
    day: "May 18",
    users: 2550,
    listings: 1300
  },
  {
    day: "May 19",
    users: 2600,
    listings: 1300
  },
  {
    day: "May 20",
    users: 3050,
    listings: 1600
  },
  {
    day: "May 21",
    users: 3000,
    listings: 1550
  },
  {
    day: "May 22",
    users: 2900,
    listings: 1700
  },
  {
    day: "May 23",
    users: 2600,
    listings: 1500
  }
];

function OverviewChart() {

  return (
    <div className="dashboard-panel overview-panel">

      <div className="panel-header">

        <h2>
          Overview
        </h2>

        <button className="period-button">
          Last 7 Days
          <span>⌄</span>
        </button>

      </div>

      <div className="chart-legend">

        <div>
          <span className="legend-line users-line"></span>
          Users
        </div>

        <div>
          <span className="legend-line listings-line"></span>
          Listings
        </div>

      </div>

      <div className="overview-chart">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              bottom: 5
            }}
          >

            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#e8ebef"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#667085",
                fontSize: 12
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 4000]}
              ticks={[0, 1000, 2000, 3000, 4000]}
              tickFormatter={(value) =>
                value === 0
                  ? "0"
                  : `${value / 1000}K`
              }
              tick={{
                fill: "#667085",
                fontSize: 12
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#ef476f"
              strokeWidth={2}
              dot={{
                r: 3
              }}
              activeDot={{
                r: 5
              }}
            />

            <Line
              type="monotone"
              dataKey="listings"
              stroke="#2f80ed"
              strokeWidth={2}
              dot={{
                r: 3
              }}
              activeDot={{
                r: 5
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default OverviewChart;