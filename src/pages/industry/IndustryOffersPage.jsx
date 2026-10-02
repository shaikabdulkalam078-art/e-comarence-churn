import { ArrowLeft, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getIndustryCustomer, getIndustryMeta } from '../../utils/industryUtils.js';

export default function IndustryOffersPage({ industry }) {
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

  const offers = customer.recommendedOffers || [
    { title: customer.recommendedAction || 'Retention Offer', description: 'A personalized action for your account.' },
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
            <NavLink to={`${meta.route}/activity`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Activity</NavLink>
            <NavLink to={`${meta.route}/insights`} className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Insights</NavLink>
            <NavLink to={`${meta.route}/offers`} end className={({ isActive }) => `industry-nav-link${isActive ? ' active' : ''}`}><UserRound size={16} />Offers</NavLink>
          </nav>
        </aside>

        <div className="industry-main-panel">
          <div className="industry-main-topbar">
            <div>
              <p className="industry-page-kicker">Recommended Actions</p>
              <h1>{customer.name}</h1>
            </div>
            <span className="customer-id-pill">{customer.customerId}</span>
          </div>

          <div className="industry-offer-grid">
            {offers.map((offer, index) => (
              <div className="industry-offer-card" key={`${offer.title}-${index}`}>
                <span className="industry-offer-badge">{offer.discount || offer.title}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
