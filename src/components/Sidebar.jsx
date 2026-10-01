import {
  Activity,
  BarChart3,
  Gauge,
  Layers3,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  UserRoundSearch,
  X,
} from 'lucide-react';
import { pages } from '../data/mockData.js';

const icons = {
  dashboard: LayoutDashboard,
  prediction: UserRoundSearch,
  analytics: BarChart3,
  segments: Layers3,
  risk: ShieldAlert,
  model: Activity,
  settings: Settings,
};

export default function Sidebar({ currentPath, onNavigate, isOpen, onClose }) {
  return (
    <>
      <button
        className={`sidebar-backdrop${isOpen ? ' is-visible' : ''}`}
        aria-label="Close navigation"
        onClick={onClose}
      />

      <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark"><Gauge size={21} strokeWidth={2.4} /></div>
          <div className="brand-copy">
            <span className="brand-name">Churn<span className="brand-light">IQ</span></span>
            <span className="brand-subtitle">E-Commerce Intelligence</span>
          </div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {pages.map((page) => {
            const Icon = icons[page.icon];
            const active = currentPath === page.to;
            return (
              <button
                key={page.label}
                className={`nav-item${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(page.to)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{page.label}</span>
                {page.label === 'At-Risk Customers' && <span className="nav-count">4.8k</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-copyright">CHURNIQ ANALYTICS <span>•</span> 2026</div>
        </div>
      </aside>
    </>
  );
}