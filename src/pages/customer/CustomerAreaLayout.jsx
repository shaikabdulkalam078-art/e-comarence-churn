import { useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader.jsx';
import CustomerSidebar from '../../components/CustomerSidebar.jsx';
import { clearCurrentCustomer, saveCustomerProfile } from '../../utils/customerUtils.js';

export default function CustomerAreaLayout() {
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
    navigate('/', { replace: true });
  };

  return (
    <div className="customer-area-shell">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="customer-area-main">
        <CustomerHeader
          customer={customer}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        <main className="customer-route-content">
          <Outlet context={{ customer, updateCustomer }} />
        </main>
      </div>
    </div>
  );
}