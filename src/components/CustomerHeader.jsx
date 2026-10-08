import { Gauge, LogOut, Menu, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CustomerHeader({ customer, onMenuClick, onLogout, basePath = '/customer' }) {
  const dashboardPath = basePath === '/market' ? `${basePath}/dashboard` : basePath;

  return (
    <header className="customer-topbar">
      <button className="customer-menu-button" type="button" onClick={onMenuClick} aria-label="Open navigation">
        <Menu size={19} />
      </button>
      <Link className="customer-topbar-brand" to={dashboardPath} aria-label="ChurnIQ home">
        <span><Gauge size={17} /></span>
        <strong>ChurnIQ</strong>
        <small>Customer Intelligence</small>
      </Link>
      <div className="customer-topbar-actions">
        <span className="customer-topbar-id">Customer ID <strong>{customer.customerId}</strong></span>
        <Link className="customer-profile-link" to={`${basePath}/profile`} aria-label="My Profile" title="My Profile">
          <UserRound size={17} />
        </Link>
        <button className="customer-logout-button" type="button" onClick={onLogout}>
          <LogOut size={16} /><span>Logout</span>
        </button>
      </div>
    </header>
  );
}