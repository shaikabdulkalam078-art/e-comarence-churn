import { useMemo, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { customerSegments, customers, kpis, recentAtRiskCustomers, riskDistribution, trendingData } from '../data/mockData.js';
import { downloadCsv } from '../utils/downloadCsv.js';

export default function DashboardPage({ searchValue = '' }) {
  const navigate = useNavigate();
  const [range, setRange] = useState('6m');

  const trendData = trendingData[range] || trendingData['6m'];

  const filteredHighRisk = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return recentAtRiskCustomers.slice(0, 4);

    return recentAtRiskCustomers.filter((customer) =>
      [customer.customerId, customer.name, customer.email, customer.segment, customer.risk].some((field) =>
        String(field).toLowerCase().includes(query),
      ),
    );
  }, [searchValue]);

  const exportReport = () => {
    downloadCsv('churniq-dashboard-report.csv', [
      { Metric: 'Total Customers', Value: '50,000', Description: 'Active customer base' },
      { Metric: 'Churn Rate', Value: '18.7%', Description: 'Compared with last month' },
      { Metric: 'High Risk Customers', Value: '4,820', Description: 'Customers requiring attention' },
      { Metric: 'Revenue at Risk', Value: '₹2.4 Cr', Description: 'Estimated revenue exposure' },
    ]);
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-intro">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER HEALTH OVERVIEW</div>
          <h2>E-Commerce Churn Intelligence</h2>
          <p>Monitor customer behavior, identify churn risks, and discover actionable insights.</p>
        </div>

        <div className="intro-actions">
          <div className="segmented-control" aria-label="Trend range selector">
            {['6m', '12m', 'ytd'].map((option) => (
              <button
                key={option}
                type="button"
                className={range === option ? 'segmented-button active' : 'segmented-button'}
                onClick={() => setRange(option)}
              >
                {option === '6m' ? 'Last 6 Months' : option === '12m' ? 'Last 12 Months' : 'This Year'}
              </button>
            ))}
          </div>
          <button type="button" className="export-button" onClick={exportReport}>
            <Download size={16} /> Export report
          </button>
        </div>
      </div>

      <section className="kpi-grid" aria-label="Key metrics">
        {kpis.map((item) => <KpiCard key={item.label} item={item} />)}
      </section>

      <div className="charts-grid">
        <ChartCard title="Monthly Churn Trend" subtitle="Monthly churn rate over the past six months">
          <div className="trend-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 12, right: 16, left: 0, bottom: 2 }}>
                <CartesianGrid vertical={false} stroke="#edf0f3" />
                <XAxis dataKey="month" tick={{ fill: '#8993a1', fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis domain={[10, 20]} ticks={[10, 12, 14, 16, 18, 20]} tickFormatter={(value) => `${value}%`} tick={{ fill: '#8993a1', fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
                <Tooltip formatter={(value) => [`${value}%`, 'Churn rate']} />
                <Line type="monotone" dataKey="value" name="Churn rate" stroke="#167d75" strokeWidth={2.5} dot={{ r: 4, fill: '#167d75', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#167d75', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Risk Distribution" subtitle="Share of customers by predicted risk">
          <div className="risk-chart-layout">
            <div className="risk-donut">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" innerRadius="68%" outerRadius="92%" paddingAngle={3} stroke="none">
                    {riskDistribution.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
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
          {customerSegments.map((segment) => (
            <SegmentCard key={segment.name} segment={segment} onClick={() => navigate(`/segmentation?segment=${encodeURIComponent(segment.name)}`)} />
          ))}
        </div>
      </section>

      <CustomerTable
        customers={filteredHighRisk}
        title="Recently Identified At-Risk Customers"
        description="Customers with the highest predicted churn probability"
        onViewAll={() => navigate('/at-risk')}
        onExport={() => downloadCsv('churniq-at-risk-customers.csv', filteredHighRisk.map((customer) => ({
          'Customer ID': customer.customerId,
          'Customer Name': customer.name,
          'Last Purchase': customer.lastPurchase,
          'Total Orders': customer.totalOrders,
          'Customer Value': customer.customerValue,
          'Churn Probability': `${customer.churnProbability}%`,
          Risk: customer.risk,
        })))}
        onRowClick={(customer) => navigate(`/customer/${customer.customerId}`)}
      />

      <div className="dashboard-footer">
        <span>Sample data for portfolio demonstration</span>
        <span>Currency <strong>INR</strong></span>
      </div>
    </div>
  );
}
