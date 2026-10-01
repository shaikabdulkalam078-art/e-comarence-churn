import { useMemo } from 'react';
import { ArrowRight, Download, Heart, ShoppingBag, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { customers } from '../data/mockData.js';
import RiskBadge from '../components/RiskBadge.jsx';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const customer = customers.find((entry) => entry.customerId === id) || customers[0];

  const trend = useMemo(() => [
    { month: 'Jan', revenue: 36 },
    { month: 'Feb', revenue: 52 },
    { month: 'Mar', revenue: 59 },
    { month: 'Apr', revenue: 63 },
    { month: 'May', revenue: 74 },
    { month: 'Jun', revenue: 86 },
  ], []);

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('churniq-watchlist') || '[]');
    if (!watchlist.includes(customer.customerId)) {
      watchlist.push(customer.customerId);
      localStorage.setItem('churniq-watchlist', JSON.stringify(watchlist));
    }
    window.alert(`${customer.name} added to watchlist.`);
  };

  const exportCustomer = () => {
    const csvRows = [{
      'Customer ID': customer.customerId,
      Name: customer.name,
      Email: customer.email,
      Phone: customer.phone,
      Location: customer.location,
      Segment: customer.segment,
      Risk: customer.risk,
      'Churn Probability': `${customer.churnProbability}%`,
      'Total Revenue': customer.totalRevenue,
    }];

    const blob = new Blob([`\uFEFFCustomer ID,Name,Email,Phone,Location,Segment,Risk,Churn Probability,Total Revenue\r\n${csvRows.map((row) => Object.values(row).join(',')).join('\r\n')}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${customer.customerId}-profile.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER PROFILE</div>
          <h2>{customer.name}</h2>
          <p>{customer.customerId} · {customer.location}</p>
        </div>

        <div className="inline-actions">
          <button type="button" className="secondary-button" onClick={() => window.alert('Order history opened.')}>View Orders</button>
          <button type="button" className="secondary-button" onClick={exportCustomer}><Download size={15} /> Export Customer</button>
          <button type="button" className="primary-button" onClick={addToWatchlist}><Heart size={15} /> Add to Watchlist</button>
        </div>
      </div>

      <div className="customer-profile-grid">
        <div className="detail-card profile-card">
          <div className="profile-header-row">
            <div className="customer-avatar large-avatar">{customer.initials}</div>
            <div>
              <h3>{customer.name}</h3>
              <p>{customer.email}</p>
            </div>
          </div>

          <div className="profile-meta-grid">
            <div><span>Customer ID</span><strong>{customer.customerId}</strong></div>
            <div><span>Email</span><strong>{customer.email}</strong></div>
            <div><span>Phone</span><strong>{customer.phone}</strong></div>
            <div><span>Location</span><strong>{customer.location}</strong></div>
            <div><span>Customer Since</span><strong>{customer.customerSince}</strong></div>
            <div><span>Segment</span><strong>{customer.segment}</strong></div>
            <div><span>Risk Level</span><RiskBadge level={customer.risk} /></div>
            <div><span>Churn Probability</span><strong>{customer.churnProbability}%</strong></div>
          </div>
        </div>

        <div className="detail-card score-tile">
          <div className="score-header">
            <span>Churn Probability</span>
            <button type="button" className="icon-button"><Star size={16} /></button>
          </div>
          <div className="big-score">{customer.churnProbability}%</div>
          <div className="score-bar"><span style={{ width: `${customer.churnProbability}%` }} /></div>
          <div className="score-label-row"><span>Low Risk</span><span>Medium</span><span>High Risk</span></div>
        </div>
      </div>

      <div className="detail-card metrics-grid">
        <div className="metric-box">
          <span>Purchase History</span>
          <strong>{customer.totalOrders}</strong>
        </div>
        <div className="metric-box">
          <span>Order Count</span>
          <strong>{customer.totalOrders}</strong>
        </div>
        <div className="metric-box">
          <span>Total Revenue</span>
          <strong>₹{(customer.totalRevenue / 100000).toFixed(2)}L</strong>
        </div>
        <div className="metric-box">
          <span>Average Order Value</span>
          <strong>₹{customer.averageOrderValue}</strong>
        </div>
        <div className="metric-box">
          <span>Last Purchase</span>
          <strong>{customer.lastPurchase}</strong>
        </div>
        <div className="metric-box">
          <span>Return Rate</span>
          <strong>{customer.returnRate}%</strong>
        </div>
      </div>

      <div className="detail-card chart-card-full">
        <h3>Purchase Activity</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="customerTrend" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#27a693" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#27a693" stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#edf0f3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#167d75" fill="url(#customerTrend)" strokeWidth={2.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
