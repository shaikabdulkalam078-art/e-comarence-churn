import { Activity, ArrowUpRight, BadgePercent, ShoppingBag, WalletCards } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { formatCurrency } from '../../utils/customerUtils.js';

const metricCards = [
  { label: 'Total Visits', value: (customer) => customer.totalVisits, icon: Activity },
  { label: 'Total Orders', value: (customer) => customer.totalOrders, icon: ShoppingBag },
  { label: 'Total Spending', value: (customer) => formatCurrency(customer.totalSpending), icon: WalletCards },
  { label: 'Average Order Value', value: (customer) => formatCurrency(customer.averageOrderValue), icon: BadgePercent },
];

export default function MarketDashboard() {
  const { customer } = useOutletContext();

  return (
    <div className="market-page-shell dashboard-page-shell">
      <div className="market-page-header">
        <div>
          <span className="market-kicker">Customer dashboard</span>
          <h1>Welcome back, {customer.name.split(' ')[0]} 👋</h1>
        </div>
        <div className="status-pill">
          <span className="status-dot" />
          {customer.customerActivity} Customer
        </div>
      </div>

      <div className="market-summary-grid">
        {metricCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="market-summary-card">
            <div className="market-summary-head">
              <span>{label}</span>
              <Icon size={16} />
            </div>
            <strong>{value(customer)}</strong>
            <small>Updated today</small>
          </div>
        ))}
      </div>

      <div className="market-panel-grid">
        <div className="market-panel">
          <div className="panel-head">
            <div>
              <span className="market-kicker">Recent behavior</span>
              <h2>Customer status</h2>
            </div>
            <span className="panel-chip success">Healthy</span>
          </div>

          <ul className="customer-status-list">
            <li><span>Preferred category</span><strong>{customer.preferredCategory}</strong></li>
            <li><span>Purchase frequency</span><strong>{customer.purchaseFrequency}</strong></li>
            <li><span>Churn risk</span><strong>{customer.churnRisk}</strong></li>
            <li><span>Last visit</span><strong>{customer.lastVisitDate}</strong></li>
          </ul>
        </div>

        <div className="market-panel trend-panel">
          <div className="panel-head">
            <div>
              <span className="market-kicker">Shopping behavior</span>
              <h2>Visit activity</h2>
            </div>
            <ArrowUpRight size={16} />
          </div>

          <div className="mini-activity-bars" aria-label="Activity bars">
            {[32, 48, 42, 68, 75, 90, 84, 92].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
