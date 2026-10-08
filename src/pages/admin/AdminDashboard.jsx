import { BarChart3, Clock3, ShieldAlert, UsersRound } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  getActiveCustomers,
  getAtRiskCustomers,
  getNewCustomers,
  getRecentRegisteredCustomers,
  getRegisteredCustomerCount,
  getRegisteredCustomers,
} from '../../utils/customerUtils.js';

export default function AdminDashboard() {
  const registeredCustomers = getRegisteredCustomers();
  const totalCustomers = registeredCustomers.length;
  const newCustomers = getNewCustomers(7);
  const activeCustomers = getActiveCustomers();
  const atRiskCustomers = getAtRiskCustomers();
  const recentCustomers = getRecentRegisteredCustomers(4);

  const riskData = [
    { name: 'Low', value: registeredCustomers.filter((customer) => customer.churnRisk === 'Low').length },
    { name: 'Medium', value: registeredCustomers.filter((customer) => customer.churnRisk === 'Medium').length },
    { name: 'High', value: registeredCustomers.filter((customer) => customer.churnRisk === 'High').length },
  ];

  const locationData = Object.entries(
    registeredCustomers.reduce((accumulator, customer) => {
      accumulator[customer.location] = (accumulator[customer.location] || 0) + 1;
      return accumulator;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .slice(0, 6);

  const growthData = totalCustomers
    ? Array.from({ length: Math.min(totalCustomers, 6) }, (_, index) => ({
        name: `R${index + 1}`,
        customers: index + 1,
      }))
    : [{ name: 'No data', customers: 0 }];

  const summaryCards = [
    { label: 'Total Customers', value: totalCustomers.toLocaleString('en-IN'), icon: UsersRound, tone: 'blue' },
    { label: 'New Customers', value: newCustomers.length.toLocaleString('en-IN'), icon: Clock3, tone: 'green' },
    { label: 'Active Customers', value: activeCustomers.length.toLocaleString('en-IN'), icon: BarChart3, tone: 'teal' },
    { label: 'At-Risk Customers', value: atRiskCustomers.length.toLocaleString('en-IN'), icon: ShieldAlert, tone: 'amber' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Overview</p>
          <h2>Market Customer Intelligence</h2>
          <p className="admin-subtitle">Understand your customers. Track market activity. Improve retention.</p>
        </div>
      </div>

      <div className="admin-summary-grid">
        {summaryCards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className={`admin-summary-card ${tone}`}>
            <div className="admin-summary-head">
              <span>{label}</span>
              <div className="admin-summary-icon"><Icon size={16} /></div>
            </div>
            <strong>{value}</strong>
            <small>Registered customers</small>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-callout">
        <div>
          <span>Available Market Customers</span>
          <strong>1,000</strong>
        </div>
        <div>
          <span>Registered Customers</span>
          <strong>{getRegisteredCustomerCount().toLocaleString('en-IN')}</strong>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer Growth</h3>
              <p>Registration trend</p>
            </div>
          </div>

          <div className="admin-chart-wrap chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminGrowthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d0a453" stopOpacity={0.38} />
                    <stop offset="95%" stopColor="#d0a453" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9e1d6" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip />
                <Area type="monotone" dataKey="customers" stroke="#d0a453" strokeWidth={2.5} fill="url(#adminGrowthFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Churn Risk Overview</h3>
              <p>Registered customer distribution</p>
            </div>
          </div>

          <div className="admin-chart-wrap small-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60} paddingAngle={3}>
                  {riskData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={['#2c9e7a', '#d0a453', '#d8655d'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="admin-chart-legend">
              {riskData.map((item, index) => (
                <div key={item.name} className="admin-legend-item">
                  <span className="admin-legend-dot" style={{ background: ['#2c9e7a', '#d0a453', '#d8655d'][index % 3] }} />
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Recent registrations</h3>
              <p>Newest market customers</p>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.length ? recentCustomers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>{customer.name}</td>
                    <td>{customer.location}</td>
                    <td><span className={`admin-risk-pill ${String(customer.churnRisk).toLowerCase()}`}>{customer.churnRisk}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="admin-empty-row">No recent registrations yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer locations</h3>
              <p>Top cities</p>
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
      </div>
    </div>
  );
}
