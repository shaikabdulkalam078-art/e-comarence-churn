import {
  Activity,
  BadgePercent,
  House,
  Lightbulb,
  UserRound,
  X,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function CustomerSidebar({ isOpen, onClose, basePath = '/customer' }) {
  const homePath = basePath === '/market' ? `${basePath}/dashboard` : basePath;
  const navigation = [
    { label: 'Home', to: homePath, icon: House, end: true },
    { label: 'My Profile', to: `${basePath}/profile`, icon: UserRound },
    { label: 'My Activity', to: `${basePath}/activity`, icon: Activity },
    { label: 'My Insights', to: `${basePath}/insights`, icon: Lightbulb },
    { label: 'Recommended Offers', to: `${basePath}/offers`, icon: BadgePercent },
  ];

  const portalLabel = basePath.startsWith('/market') ? 'Market customer portal' : 'Customer portal';

  return (
    <>
      <aside className={`customer-sidebar${isOpen ? ' is-open' : ''}`} aria-label="Customer navigation">
        <div className="customer-sidebar-heading">
          <Link className="customer-sidebar-brand" to={basePath} onClick={onClose}>
            <span className="customer-sidebar-mark"><span className="brand-mark"><House size={18} /></span></span>
            <span><strong>ChurnIQ</strong><small>Customer Intelligence</small></span>
          </Link>
          <button className="customer-sidebar-close" type="button" onClick={onClose} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <span className="customer-sidebar-label">YOUR ACCOUNT</span>
        <nav className="customer-sidebar-nav">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `customer-nav-link${isActive ? ' active' : ''}`}
            >
              <Icon size={17} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="customer-sidebar-footer">
          <span className="customer-demo-dot" /> {portalLabel}
        </div>
      </aside>
      {isOpen && <button className="customer-sidebar-backdrop" type="button" onClick={onClose} aria-label="Close navigation" />}
    </>
  );
}