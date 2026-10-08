import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MarketLanding from './pages/market/MarketLanding.jsx';
import MarketAreaLayout from './pages/market/MarketAreaLayout.jsx';
import MarketDashboard from './pages/market/MarketDashboard.jsx';
import MarketProfile from './pages/market/MarketProfile.jsx';
import MarketActivity from './pages/market/MarketActivity.jsx';
import MarketInsights from './pages/market/MarketInsights.jsx';
import MarketOffers from './pages/market/MarketOffers.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCustomers from './pages/admin/AdminCustomers.jsx';
import AdminCustomerDetails from './pages/admin/AdminCustomerDetails.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
import AdminAtRisk from './pages/admin/AdminAtRisk.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import { getCurrentCustomer } from './utils/customerUtils.js';

function MarketRouteGuard() {
  const customer = getCurrentCustomer();
  return customer ? <Outlet context={{ customer }} /> : <Navigate to="/market" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<MarketLanding />} />
        <Route path="/market/*" element={<MarketRouteGuard />}>
          <Route element={<MarketAreaLayout />}>
            <Route path="dashboard" element={<MarketDashboard />} />
            <Route path="profile" element={<MarketProfile />} />
            <Route path="activity" element={<MarketActivity />} />
            <Route path="insights" element={<MarketInsights />} />
            <Route path="offers" element={<MarketOffers />} />
            <Route path="*" element={<Navigate to="/market/dashboard" replace />} />
          </Route>
        </Route>

        <Route path="/login" element={<Navigate to="/market" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/:customerId" element={<AdminCustomerDetails />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="at-risk" element={<AdminAtRisk />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}