import { Gauge, LogOut } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import { clearCurrentCustomer, getCurrentCustomer } from '../../utils/customerUtils.js';
import { getIndustryMeta, getSelectedIndustry } from '../../utils/industryUtils.js';

export default function AdminLayout() {
  const navigate = useNavigate();
  const currentCustomer = getCurrentCustomer();
  const selectedIndustry = getSelectedIndustry();
  const industryMeta = getIndustryMeta(selectedIndustry);

  const handleLogout = () => {
    clearCurrentCustomer();
    navigate('/');
  };

  return (
    <div className="admin-shell">
      <AdminSidebar onLogout={handleLogout} />

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <div className="admin-topbar-badge"><Gauge size={15} /></div>
            <div>
              <p className="admin-topbar-eyebrow">ChurnIQ</p>
              <h1>{industryMeta.label} Customer Intelligence</h1>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <span className="admin-user-pill">{currentCustomer ? currentCustomer.name : 'Admin View'}</span>
            <button type="button" className="admin-topbar-logout" onClick={handleLogout}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
