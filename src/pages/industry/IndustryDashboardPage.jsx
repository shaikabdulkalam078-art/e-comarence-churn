import { Activity, ArrowLeft, BadgePercent, Lightbulb, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getIndustryCustomer, getIndustryMeta } from '../../utils/industryUtils.js';

const metricsByIndustry = {
  ecommerce: [
    { label: 'Total Orders', valueKey: 'totalOrders' },
    { label: 'Total Spending', valueKey: 'totalSpending', currency: true },
    { label: 'Average Order Value', valueKey: 'averageOrderValue', currency: true },
    { label: 'Churn Risk', valueKey: 'churnRisk' },
  ],
  saas: [
    { label: 'Monthly Revenue', valueKey: 'monthlyRevenue', currency: true },
    { label: 'Login Frequency', valueKey: 'loginFrequency' },
    { label: 'Feature Usage', valueKey: 'featureUsage' },
    { label: 'Churn Risk', valueKey: 'churnRisk' },
  ],
  banking: [
    { label: 'Monthly Transactions', valueKey: 'monthlyTransactions' },
    { label: 'Digital Usage', valueKey: 'digitalUsage' },
    { label: 'Average Transaction', valueKey: 'averageTransactionValue', currency: true },
    { label: 'Churn Risk', valueKey: 'churnRisk' },
  ],
  telecom: [
    { label: 'Monthly Bill', valueKey: 'monthlyBill', currency: true },
    { label: 'Data Usage', valueKey: 'dataUsage' },
    { label: 'Call Minutes', valueKey: 'callMinutes' },
    { label: 'Churn Risk', valueKey: 'churnRisk' },
  ],
};

const currency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

export default function IndustryDashboardPage({ industry }) {
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

  const metricCards = metricsByIndustry[industry].map((item) => {
    const rawValue = customer[item.valueKey];
    let value = rawValue;
    if (item.currency) value = currency(rawValue);
    if (item.label === 'Churn Risk') value = rawValue;
    return { ...item, value };
  });

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
            <NavLink to={`${meta.route}/dashboard`} end className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><Activity size={16} />Dashboard</NavLink>
            <NavLink to={`${meta.route}/profile`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Profile</NavLink>
            <NavLink to={`${meta.route}/activity`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><Activity size={16} />Activity</NavLink>
            <NavLink to={`${meta.route}/insights`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><Lightbulb size={16} />Insights</NavLink>
            <NavLink to={`${meta.route}/offers`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><BadgePercent size={16} />Offers</NavLink>
          </nav>
        </aside>

        <div className="industry-main-panel">
          <div className="industry-main-topbar">
            <div>
              <p className="industry-page-kicker">Customer Overview</p>
              <h1>{customer.name}</h1>
            </div>
            <span className="customer-id-pill">{customer.customerId}</span>
          </div>

          <div className="industry-metric-grid">
            {metricCards.map((card) => (
              <div className="industry-summary-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </div>

          <div className="industry-content-panel">
            <h2>Recommended actions</h2>
            <ul className="industry-action-list">
              {(customer.recommendedOffers || []).slice(0, 3).map((offer, index) => (
                <li key={`${offer.title}-${index}`}>
                  <strong>{offer.title}</strong>
                  <small>{offer.description}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
