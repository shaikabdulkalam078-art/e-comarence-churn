import { useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader.jsx';
import CustomerSidebar from '../../components/CustomerSidebar.jsx';
import { clearCurrentCustomer, saveCustomerProfile } from '../../utils/customerUtils.js';

export default function MarketAreaLayout() {
  const { customer: verifiedCustomer } = useOutletContext();
  const [customer, setCustomer] = useState(verifiedCustomer);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const updateCustomer = (changes) => {
    const updatedCustomer = saveCustomerProfile(customer.customerId, changes);
    if (updatedCustomer) setCustomer(updatedCustomer);
    return updatedCustomer;
  };

  const logout = () => {
    clearCurrentCustomer();
    navigate('/market', { replace: true });
  };

  return (
    <div className="customer-area-shell market-area-shell">
      <CustomerSidebar basePath="/market" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="customer-area-main">
        <CustomerHeader
          customer={customer}
          basePath="/market"
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        <main className="customer-route-content market-route-content">
          <Outlet context={{ customer, updateCustomer }} />
        </main>
      </div>
    </div>
  );
}
