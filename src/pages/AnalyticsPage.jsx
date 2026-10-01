import { useMemo, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { analyticsData } from '../data/mockData.js';

export default function AnalyticsPage() {
  const [range, setRange] = useState('6m');
  const [segment, setSegment] = useState('All Segments');
  const [location, setLocation] = useState('All Cities');
  const [ageGroup, setAgeGroup] = useState('All Ages');

  const filteredCustomerGrowth = useMemo(() => {
    const growth = analyticsData.customerGrowth.slice(0, range === '6m' ? 6 : 9);
    return growth.map((item, index) => ({
      ...item,
      customers: item.customers + (segment !== 'All Segments' ? index * 110 : index * 35),
    }));
  }, [range, segment]);

  const avgOrderValue = 48120;
  const clv = '₹6.8L';
  const repeatRate = '72.5%';
  const avgOrders = 8.4;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER INTELLIGENCE</div>
          <h2>Customer Analytics</h2>
          <p>Monitor customer behavior, purchase trends, and retention patterns.</p>
        </div>
      </div>

      <div className="filter-bar">
        <select value={range} onChange={(event) => setRange(event.target.value)}>
          <option value="6m">Last 6 Months</option>
          <option value="9m">Last 9 Months</option>
          <option value="12m">Last 12 Months</option>
        </select>
        <select value={segment} onChange={(event) => setSegment(event.target.value)}>
          <option value="All Segments">All Segments</option>
          <option value="Loyal">Loyal</option>
          <option value="High Value">High Value</option>
          <option value="At Risk">At Risk</option>
        </select>
        <select value={location} onChange={(event) => setLocation(event.target.value)}>
          <option value="All Cities">All Cities</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
        <select value={ageGroup} onChange={(event) => setAgeGroup(event.target.value)}>
          <option value="All Ages">All Ages</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
        </select>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <span>Total Customers</span>
          <strong>50,000</strong>
        </div>
        <div className="mini-stat">
          <span>Average Order Value</span>
          <strong>₹{avgOrderValue.toLocaleString('en-IN')}</strong>
        </div>
        <div className="mini-stat">
          <span>Average CLV</span>
          <strong>{clv}</strong>
        </div>
        <div className="mini-stat">
          <span>Repeat Purchase Rate</span>
          <strong>{repeatRate}</strong>
        </div>
        <div className="mini-stat">
          <span>Average Orders/Customer</span>
          <strong>{avgOrders}</strong>
        </div>
      </div>

      <div className="page-chart-grid">
        <div className="detail-card chart-card-full">
          <h3>Customer Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={filteredCustomerGrowth}>
              <defs>
                <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#27a693" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#27a693" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#edf0f3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="customers" stroke="#167d75" fill="url(#growthFill)" strokeWidth={2.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full">
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={analyticsData.revenueTrend}>
              <CartesianGrid stroke="#edf0f3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}L`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#4f7ff7" strokeWidth={2.4} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full">
          <h3>Order Frequency</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analyticsData.orderFrequency}>
              <CartesianGrid stroke="#edf0f3" vertical={false} />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3d9d8f" radius={[7, 7, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full">
          <h3>Customer Lifetime Value Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={analyticsData.lifetimeValue} dataKey="value" nameKey="segment" innerRadius={55} outerRadius={90} paddingAngle={4}>
                {analyticsData.lifetimeValue.map((entry, index) => (
                  <Cell key={entry.segment} fill={['#167d75', '#4f7ff7', '#dba74f', '#d96d57'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full full-span">
          <h3>Churn by Customer Tenure</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analyticsData.churnByTenure} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid stroke="#edf0f3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="tenure" />
              <Tooltip formatter={(value) => [`${value}%`, 'Churn']} />
              <Bar dataKey="value" fill="#d96d57" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
