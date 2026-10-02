import { BarChart3, LayoutDashboard, LogOut, Settings, ShieldAlert, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/at-risk', label: 'At-Risk Customers', icon: ShieldAlert },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="admin-brand-mark">
          <LayoutDashboard size={18} />
        </div>
        <div className="admin-brand-copy">
          <strong>ChurnIQ</strong>
          <span>Customer Intelligence</span>
        </div>
      </div>

      <div className="admin-sidebar-section">Admin</div>
      <nav className="admin-nav" aria-label="Admin dashboard navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-footer-brand">
          <span className="admin-footer-badge">ChurnIQ</span>
          <small>Customer Intelligence</small>
        </div>
        <button type="button" className="admin-logout-button" onClick={onLogout}>
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
