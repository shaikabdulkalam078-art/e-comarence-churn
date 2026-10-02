import { ArrowLeft, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getIndustryCustomer, getIndustryMeta } from '../../utils/industryUtils.js';

const fieldMap = {
  ecommerce: ['customerId', 'name', 'email', 'location', 'totalOrders', 'totalSpending', 'averageOrderValue', 'preferredCategory', 'churnRisk'],
  saas: ['customerId', 'name', 'email', 'companyName', 'location', 'plan', 'monthlyRevenue', 'featureUsage', 'subscriptionStatus', 'churnRisk'],
  banking: ['customerId', 'name', 'email', 'location', 'accountType', 'accountAge', 'monthlyTransactions', 'averageTransactionValue', 'loanStatus', 'churnRisk'],
  telecom: ['customerId', 'name', 'email', 'location', 'plan', 'monthlyBill', 'dataUsage', 'callMinutes', 'contractType', 'churnRisk'],
};

export default function IndustryProfilePage({ industry }) {
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

  const labels = {
    customerId: 'Customer ID',
    name: 'Name',
    email: 'Email',
    companyName: 'Company',
    location: 'Location',
    plan: 'Plan',
    monthlyRevenue: 'Monthly Revenue',
    featureUsage: 'Feature Usage',
    subscriptionStatus: 'Subscription Status',
    accountType: 'Account Type',
    accountAge: 'Account Age',
    monthlyTransactions: 'Monthly Transactions',
    averageTransactionValue: 'Average Transaction Value',
    loanStatus: 'Loan Status',
    totalOrders: 'Total Orders',
    totalSpending: 'Total Spending',
    averageOrderValue: 'Average Order Value',
    preferredCategory: 'Preferred Category',
    monthlyBill: 'Monthly Bill',
    dataUsage: 'Data Usage',
    callMinutes: 'Call Minutes',
    contractType: 'Contract Type',
    churnRisk: 'Churn Risk'
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
            <NavLink to={`${meta.route}/profile`} end className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Profile</NavLink>
            <NavLink to={`${meta.route}/activity`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Activity</NavLink>
            <NavLink to={`${meta.route}/insights`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Insights</NavLink>
            <NavLink to={`${meta.route}/offers`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Offers</NavLink>
          </nav>
        </aside>

        <div className="industry-main-panel">
          <div className="industry-main-topbar">
            <div>
              <p className="industry-page-kicker">Profile</p>
              <h1>{customer.name}</h1>
            </div>
            <span className="customer-id-pill">{customer.customerId}</span>
          </div>

          <div className="industry-profile-grid">
            {fieldMap[industry].map((field) => (
              <div className="industry-profile-item" key={field}>
                <span>{labels[field]}</span>
                <strong>{customer[field] ?? 'Not available'}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
