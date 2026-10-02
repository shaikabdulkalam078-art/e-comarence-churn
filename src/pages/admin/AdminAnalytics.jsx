import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getRegisteredCustomers } from '../../utils/customerUtils.js';

const colors = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#22c55e'];

export default function AdminAnalytics() {
  const customers = getRegisteredCustomers();

  const activityData = [
    { name: 'Active', value: customers.filter((customer) => customer.customerActivity === 'Active').length },
    { name: 'Inactive', value: customers.filter((customer) => customer.customerActivity === 'Inactive').length },
    { name: 'Occasional', value: customers.filter((customer) => customer.customerActivity === 'Occasional').length },
  ];

  const churnData = [
    { name: 'Low Risk', value: customers.filter((customer) => customer.churnRisk === 'Low').length },
    { name: 'Medium Risk', value: customers.filter((customer) => customer.churnRisk === 'Medium').length },
    { name: 'High Risk', value: customers.filter((customer) => customer.churnRisk === 'High').length },
  ];

  const locationData = Object.entries(
    customers.reduce((accumulator, customer) => {
      accumulator[customer.location] = (accumulator[customer.location] || 0) + 1;
      return accumulator;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .slice(0, 6);

  const categoryData = Object.entries(
    customers.reduce((accumulator, customer) => {
      accumulator[customer.preferredCategory] = (accumulator[customer.preferredCategory] || 0) + 1;
      return accumulator;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .slice(0, 6);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Analytics</p>
          <h2>Customer Analytics</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer Activity Distribution</h3>
              <p>Current registered mix</p>
            </div>
          </div>
          <div className="admin-chart-wrap chart-medium">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={activityData} dataKey="value" nameKey="name" innerRadius={34} outerRadius={70} paddingAngle={2}>
                  {activityData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Churn Risk Distribution</h3>
              <p>Low, medium and high risk</p>
            </div>
          </div>
          <div className="admin-chart-wrap chart-medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnData} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip />
                <Bar dataKey="value" radius={[7, 7, 0, 0]} fill="#3b82f6" barSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer Locations</h3>
              <p>Top cities by registered customers</p>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {locationData.length ? locationData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="2" className="admin-empty-row">No location data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer Categories</h3>
              <p>Preferred product segments</p>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.length ? categoryData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="2" className="admin-empty-row">No category data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
