import { ArrowLeft, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getIndustryCustomer, getIndustryMeta } from '../../utils/industryUtils.js';

export default function IndustryActivityPage({ industry }) {
  const navigate = useNavigate();
  const meta = getIndustryMeta(industry);
  const customer = getIndustryCustomer(industry);

  useEffect(() => {
    if (!customer) {
      navigate(meta.route, { replace: true });
    }
  }, [customer, navigate, meta.route]);

  if (!customer) {
    return null;
  }

  const records = customer.recentOrders || [
    { date: customer.lastTransactionDate || customer.lastActiveDate || customer.lastRechargeDate, product: 'Recent activity', category: 'Activity', amount: customer.monthlyBill || customer.monthlyRevenue || customer.totalSpending || 0 },
  ];

  return (
    <main className="industry-dashboard-page">
      <header className="industry-dashboard-header">
        <div className="industry-dashboard-brand-wrap">
          <Link to="/" className="industry-back-link subtle"><ArrowLeft size={15} /> Back to Industries</Link>
          <div className="industry-dashboard-brand-row">
            <span className="industry-home-mark">C</span>
            <div>
              <strong>ChurnIQ</strong>
              <small>{meta.label}</small>
            </div>
          </div>
        </div>
      </header>

      <section className="industry-dashboard-shell">
        <aside className="industry-sidebar-panel">
          <div className="industry-sidebar-header">Customer Area</div>
          <nav className="industry-nav-list">
            <NavLink to={`${meta.route}/dashboard`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Dashboard</NavLink>
            <NavLink to={`${meta.route}/profile`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Profile</NavLink>
            <NavLink to={`${meta.route}/activity`} end className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Activity</NavLink>
            <NavLink to={`${meta.route}/insights`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Insights</NavLink>
            <NavLink to={`${meta.route}/offers`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Offers</NavLink>
          </nav>
        </aside>

        <div className="industry-main-panel">
          <div className="industry-main-topbar">
            <div>
              <p className="industry-page-kicker">Activity</p>
              <h1>{customer.name}</h1>
            </div>
            <span className="customer-id-pill">{customer.customerId}</span>
          </div>

          <div className="industry-table-wrap">
            <table className="industry-activity-table">
              <thead>
                <tr>
                  <th>{industry === 'ecommerce' ? 'Recent Orders' : 'Activity'}</th>
                  <th>{industry === 'ecommerce' ? 'Category' : 'Detail'}</th>
                  <th>{industry === 'ecommerce' ? 'Amount' : 'Value'}</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((entry, index) => (
                  <tr key={`${entry.product}-${index}`}>
                    <td>{entry.product || entry.orderId || 'Customer activity'}</td>
                    <td>{entry.category || entry.plan || entry.featureUsage || 'Usage'}</td>
                    <td>{entry.amount ? `₹${Number(entry.amount).toLocaleString('en-IN')}` : (entry.monthlyBill ? `₹${Number(entry.monthlyBill).toLocaleString('en-IN')}` : '—')}</td>
                    <td>{entry.date || entry.lastActiveDate || entry.lastTransactionDate || entry.lastRechargeDate || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
