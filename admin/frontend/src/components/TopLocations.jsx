import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Bangalore",
    value: 40
  },
  {
    name: "Mumbai",
    value: 25
  },
  {
    name: "Pune",
    value: 15
  },
  {
    name: "Hyderabad",
    value: 10
  },
  {
    name: "Chennai",
    value: 10
  }
];

const colors = [
  "#2f80ed",
  "#6ea8e8",
  "#55c991",
  "#ef5b87",
  "#f5a34b"
];

function TopLocations() {

  return (
    <div className="dashboard-panel small-chart-panel">

      <div className="panel-header">

        <h2>
          Top Locations (Listings)
        </h2>

        <span className="panel-period">
          Last 7 Days
        </span>

      </div>

      <div className="location-content">

        <div className="donut-chart">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={1}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={colors[index]}
                  />
                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          <div className="donut-center">

            <strong>
              8,756
            </strong>

            <span>
              Total
            </span>

          </div>

        </div>

        <div className="location-list">

          {data.map((location, index) => (

            <div
              className="location-item"
              key={location.name}
            >

              <div>

                <span
                  className="location-dot"
                  style={{
                    backgroundColor:
                      colors[index]
                  }}
                ></span>

                {location.name}

              </div>

              <strong>
                {location.value}%
              </strong>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TopLocations;