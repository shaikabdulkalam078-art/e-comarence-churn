import { Download } from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '../components/ChartCard.jsx';
import CustomerTable from '../components/CustomerTable.jsx';
import KpiCard from '../components/KpiCard.jsx';
import SegmentCard from '../components/SegmentCard.jsx';
import { customers, customerSegments, kpis, monthlyChurn, riskDistribution } from '../data/mockData.js';
import { downloadCsv } from '../utils/downloadCsv.js';

export default function Dashboard({ searchValue, onNavigate }) {
  const search = searchValue.trim().toLowerCase();
  // Filter the local examples in the table without sending data to a server.
  const filteredCustomers = customers.filter((customer) =>
    [customer.id, customer.name, customer.risk].some((field) => field.toLowerCase().includes(search)),
  );

  return (
    <div className="dashboard-content">
      <div className="dashboard-intro">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER HEALTH OVERVIEW</div>
          <h2>E-Commerce Churn Intelligence</h2>
          <p>Monitor customer behavior, identify churn risks, and discover actionable insights.</p>
        </div>
        <button
          className="export-button"
          onClick={() => downloadCsv('churniq-dashboard-report.csv', kpis.map(({ label, value, note }) => ({ Metric: label, Value: value, Description: note })))}
        >
          <Download size={16} /> Export report
        </button>
      </div>

      <section className="kpi-grid" aria-label="Key metrics">
        {kpis.map((item) => <KpiCard key={item.label} item={item} />)}
      </section>

      <div className="charts-grid">
        <ChartCard title="Monthly Churn Trend" subtitle="Monthly churn rate over the past six months" action={false}>
          <div className="trend-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyChurn} margin={{ top: 12, right: 16, left: 0, bottom: 2 }}>
                <CartesianGrid vertical={false} stroke="#edf0f3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(month) => month.slice(0, 3)}
                  tick={{ fill: '#8993a1', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  domain={[12, 20]}
                  ticks={[12, 14, 16, 18, 20]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: '#8993a1', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip labelFormatter={(month) => month} formatter={(value) => [`${value}%`, 'Churn rate']} />
                <Line
                  type="monotone"
                  dataKey="churn"
                  name="Churn rate"
                  stroke="#167d75"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#167d75', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#167d75', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Risk Distribution" subtitle="Share of customers by predicted risk" action={false}>
          <div className="risk-chart-layout">
            <div className="risk-donut">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="68%"
                    outerRadius="92%"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {riskDistribution.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center"><strong>100%</strong><span>Customers</span></div>
            </div>
            <div className="risk-legend">
              {riskDistribution.map((item) => (
                <div className="risk-legend-item" key={item.name}>
                  <span className="risk-legend-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <section className="segments-section" aria-labelledby="segments-heading">
        <div className="section-heading">
          <div>
            <h2 id="segments-heading">Customer Segments</h2>
            <p>Understand the audiences shaping your retention strategy.</p>
          </div>
        </div>
        <div className="segment-grid">
          {customerSegments.map((segment) => <SegmentCard key={segment.name} segment={segment} />)}
        </div>
      </section>

      <CustomerTable
        customers={filteredCustomers}
        onViewAll={() => onNavigate('At-Risk Customers')}
        onExport={() => downloadCsv('churniq-at-risk-customers.csv', filteredCustomers.map((customer) => ({
          'Customer ID': customer.id,
          'Customer Name': customer.name,
          'Last Purchase': customer.lastPurchase,
          'Total Orders': customer.orders,
          'Customer Value': customer.value,
          'Churn Probability': `${customer.probability}%`,
          Risk: customer.risk,
        })))}
      />

      <div className="dashboard-footer"><span>Sample data for portfolio demonstration</span><span>Currency <strong>INR</strong></span></div>
    </div>
  );
}