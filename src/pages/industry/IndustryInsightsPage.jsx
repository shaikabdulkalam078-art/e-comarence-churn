import { ArrowLeft, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getIndustryCustomer, getIndustryMeta } from '../../utils/industryUtils.js';

export default function IndustryInsightsPage({ industry }) {
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

  const insightCards = {
    ecommerce: [
      { label: 'Purchase Frequency', value: customer.purchaseFrequency || 'Medium' },
      { label: 'Spending Pattern', value: customer.spendingPattern || 'Medium' },
      { label: 'Activity Level', value: customer.customerActivity || 'Active' },
      { label: 'Churn Risk', value: customer.churnRisk || 'Medium' },
    ],
    saas: [
      { label: 'Engagement Level', value: customer.featureUsage || 'Medium' },
      { label: 'Subscription Status', value: customer.subscriptionStatus || 'Active' },
      { label: 'Usage Pattern', value: customer.loginFrequency || 'Medium' },
      { label: 'Churn Risk', value: customer.churnRisk || 'Medium' },
    ],
    banking: [
      { label: 'Transaction Frequency', value: `${customer.monthlyTransactions ?? 0} / month` },
      { label: 'Digital Engagement', value: `${customer.digitalUsage ?? 0}%` },
      { label: 'Account Activity', value: customer.customerActivity || 'Medium' },
      { label: 'Churn Risk', value: customer.churnRisk || 'Medium' },
    ],
    telecom: [
      { label: 'Data Usage', value: `${customer.dataUsage ?? 0} GB` },
      { label: 'Recharge Pattern', value: `${customer.rechargeFrequency ?? 0} recharges` },
      { label: 'Service Engagement', value: customer.customerActivity || 'Medium' },
      { label: 'Churn Risk', value: customer.churnRisk || 'Medium' },
    ],
  };

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
            <NavLink to={`${meta.route}/activity`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Activity</NavLink>
            <NavLink to={`${meta.route}/insights`} end className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Insights</NavLink>
            <NavLink to={`${meta.route}/offers`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Offers</NavLink>
          </nav>
        </aside>

        <div className="industry-main-panel">
          <div className="industry-main-topbar">
            <div>
              <p className="industry-page-kicker">Insights</p>
              <h1>{customer.name}</h1>
            </div>
            <span className="customer-id-pill">{customer.customerId}</span>
          </div>

          <div className="industry-insights-grid">
            {insightCards[industry].map((item) => (
              <div className="industry-insight-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
