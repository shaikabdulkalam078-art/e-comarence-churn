import { BarChart3, Clock3, ShieldAlert, UsersRound } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import {
  getActiveCustomers,
  getAtRiskCustomers,
  getNewCustomers,
  getRecentRegisteredCustomers,
  getRegisteredCustomerCount,
  getRegisteredCustomers,
} from '../../utils/customerUtils.js';
import { getIndustryMeta, getSelectedIndustry } from '../../utils/industryUtils.js';
import { getRegisteredIndustryCustomerIds } from '../../utils/registrationUtils.js';

const pieColors = ['#1f7adf', '#8cd3c5', '#f0a94b'];

function formatRegistrationLabel(timestamp) {
  if (!timestamp) return 'Registered recently';

  const date = new Date(timestamp);
  const diffDays = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Registered today';
  if (diffDays === 1) return 'Registered yesterday';
  return `Registered ${diffDays} days ago`;
}

export default function AdminDashboard() {
  const selectedIndustry = getSelectedIndustry();
  const industryMeta = getIndustryMeta(selectedIndustry);
  const registeredCustomerIds = getRegisteredIndustryCustomerIds(selectedIndustry);
  const registeredCustomers = registeredCustomerIds.map((customerId) => industryMeta.lookup(customerId)).filter(Boolean);
  const totalCustomers = registeredCustomers.length;
  const newCustomers = registeredCustomers.slice(0, Math.min(registeredCustomers.length, 4));
  const activeCustomers = registeredCustomers.filter((customer) => {
    if (selectedIndustry === 'ecommerce') return customer.customerActivity === 'Active';
    if (selectedIndustry === 'saas') return customer.subscriptionStatus === 'Active';
    if (selectedIndustry === 'banking') return customer.customerActivity === 'High' || customer.customerActivity === 'Medium';
    return customer.customerActivity === 'High' || customer.customerActivity === 'Medium';
  });
  const atRiskCustomers = registeredCustomers.filter((customer) => customer.churnRisk === 'Medium' || customer.churnRisk === 'High');
  const recentCustomers = registeredCustomers.slice(0, 4).map((customer) => ({ ...customer, registeredAt: new Date().toISOString() }));

  const activityData = [
    { name: 'Active', value: activeCustomers.length },
    { name: 'Inactive', value: Math.max(0, totalCustomers - activeCustomers.length) },
  ];

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

  const growthData = registeredCustomers.length
    ? Array.from({ length: Math.min(registeredCustomers.length, 6) }, (_, index) => ({
        name: `R${index + 1}`,
        customers: index + 1,
      }))
    : [{ name: 'No data', customers: 0 }];

  const industrySpecificLabels = {
    ecommerce: ['Total Customers', 'New Customers', 'Active Customers', 'At-Risk Customers', 'Total Orders', 'Total Revenue'],
    saas: ['Total Customers', 'Active Subscriptions', 'New Customers', 'At-Risk Customers', 'Monthly Recurring Revenue'],
    banking: ['Total Customers', 'Active Accounts', 'New Customers', 'At-Risk Customers', 'Digital Active Customers'],
    telecom: ['Total Customers', 'Active Customers', 'New Customers', 'At-Risk Customers', 'Average Monthly Bill'],
  };

  const summaryCards = [
    { label: industrySpecificLabels[selectedIndustry][0], value: totalCustomers.toLocaleString('en-IN'), icon: UsersRound, tone: 'blue' },
    { label: industrySpecificLabels[selectedIndustry][1], value: newCustomers.length.toLocaleString('en-IN'), icon: Clock3, tone: 'green' },
    { label: industrySpecificLabels[selectedIndustry][2], value: activeCustomers.length.toLocaleString('en-IN'), icon: BarChart3, tone: 'teal' },
    { label: industrySpecificLabels[selectedIndustry][3], value: atRiskCustomers.length.toLocaleString('en-IN'), icon: ShieldAlert, tone: 'amber' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Overview</p>
          <h2>{industryMeta.label} Admin Dashboard</h2>
          <p className="admin-subtitle">Monitor {industryMeta.label.toLowerCase()} customer activity and understand your customer base.</p>
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
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip />
                <Area type="monotone" dataKey="customers" stroke="#2563eb" strokeWidth={2.5} fill="url(#adminGrowthFill)" />
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
                <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={35} outerRadius={58} paddingAngle={3}>
                  {riskData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={['#22c55e', '#f59e0b', '#ef4444'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="admin-chart-legend">
              {riskData.map((item, index) => (
                <div key={item.name} className="admin-legend-item">
                  <span className="admin-legend-dot" style={{ background: ['#22c55e', '#f59e0b', '#ef4444'][index % 3] }} />
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
              <h3>Recently Registered Customers</h3>
              <p>Latest customers in the demo</p>
            </div>
          </div>

          <div className="admin-list-group">
            {recentCustomers.length ? recentCustomers.map((customer) => (
              <div key={customer.customerId} className="admin-list-item">
                <div className="admin-avatar">{customer.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
                <div className="admin-list-copy">
                  <strong>{customer.customerId}</strong>
                  <span>{customer.name}</span>
                  <small>{customer.location}</small>
                </div>
                <span className="admin-pill">{formatRegistrationLabel(customer.registeredAt)}</span>
              </div>
            )) : <div className="admin-empty-state">No recent registrations yet.</div>}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Customer Activity</h3>
              <p>Registered customer activity mix</p>
            </div>
          </div>

          <div className="admin-chart-wrap chart-compact">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="vertical" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#374151' }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#3b82f6" barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="admin-panel admin-table-panel">
        <div className="admin-panel-head">
          <div>
            <h3>Customer Locations</h3>
            <p>Top customer cities</p>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Customers</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {locationData.length ? locationData.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                  <td>{Math.round((item.value / Math.max(1, totalCustomers)) * 100)}%</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="admin-empty-row">No data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-inline-actions">
        <Link to="/admin/customers" className="admin-primary-button">View all customers</Link>
        <Link to="/admin/analytics" className="admin-secondary-button">Open analytics</Link>
      </div>
    </div>
  );
}
