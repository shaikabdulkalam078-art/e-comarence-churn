import { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import IndustryLandingPage from './pages/industry/IndustryLandingPage.jsx';
import IndustryDashboardPage from './pages/industry/IndustryDashboardPage.jsx';
import IndustryProfilePage from './pages/industry/IndustryProfilePage.jsx';
import IndustryActivityPage from './pages/industry/IndustryActivityPage.jsx';
import IndustryInsightsPage from './pages/industry/IndustryInsightsPage.jsx';
import IndustryOffersPage from './pages/industry/IndustryOffersPage.jsx';
import CustomerAreaLayout from './pages/customer/CustomerAreaLayout.jsx';
import CustomerActivity from './pages/customer/CustomerActivity.jsx';
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';
import CustomerInsights from './pages/customer/CustomerInsights.jsx';
import CustomerOffers from './pages/customer/CustomerOffers.jsx';
import CustomerProfile from './pages/customer/CustomerProfile.jsx';
import CustomerDirectoryPage from './pages/CustomerDirectoryPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PredictionPage from './pages/PredictionPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import SegmentationPage from './pages/SegmentationPage.jsx';
import AtRiskPage from './pages/AtRiskPage.jsx';
import ModelPerformancePage from './pages/ModelPerformancePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import CustomerDetailPage from './pages/CustomerDetailPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCustomers from './pages/admin/AdminCustomers.jsx';
import AdminCustomerDetails from './pages/admin/AdminCustomerDetails.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
import AdminAtRisk from './pages/admin/AdminAtRisk.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import { getCurrentCustomer } from './utils/customerUtils.js';

const titleMap = {
  '/dashboard': 'Dashboard',
  '/prediction': 'Customer Prediction',
  '/analytics': 'Customer Analytics',
  '/segmentation': 'Segmentation',
  '/at-risk': 'At-Risk Customers',
  '/model-performance': 'Model Performance',
  '/settings': 'Settings',
};

function CustomerRouteGuard() {
  const customer = getCurrentCustomer();
  return customer ? <Outlet context={{ customer }} /> : <Navigate to="/" replace />;
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const currentTitle = titleMap[location.pathname] ?? 'Dashboard';

  return (
    <div className="app-shell">
      <Sidebar
        currentPath={location.pathname}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(path) => {
          setSidebarOpen(false);
          setSearchValue('');
          navigate(path);
        }}
      />

      <div className="main-shell">
        <Header
          pageTitle={currentTitle}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => {
            setSearchValue('');
            navigate('/');
          }}
        />

        <main>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage searchValue={searchValue} />} />
            <Route path="/prediction" element={<PredictionPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/segmentation" element={<SegmentationPage />} />
            <Route path="/at-risk" element={<AtRiskPage />} />
            <Route path="/model-performance" element={<ModelPerformancePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/customer/:id" element={<CustomerDetailPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/directory" element={<CustomerDirectoryPage />} />

        <Route path="/ecommerce" element={<IndustryLandingPage industry="ecommerce" />} />
        <Route path="/ecommerce/dashboard" element={<IndustryDashboardPage industry="ecommerce" />} />
        <Route path="/ecommerce/profile" element={<IndustryProfilePage industry="ecommerce" />} />
        <Route path="/ecommerce/activity" element={<IndustryActivityPage industry="ecommerce" />} />
        <Route path="/ecommerce/insights" element={<IndustryInsightsPage industry="ecommerce" />} />
        <Route path="/ecommerce/offers" element={<IndustryOffersPage industry="ecommerce" />} />

        <Route path="/saas" element={<IndustryLandingPage industry="saas" />} />
        <Route path="/saas/dashboard" element={<IndustryDashboardPage industry="saas" />} />
        <Route path="/saas/profile" element={<IndustryProfilePage industry="saas" />} />
        <Route path="/saas/activity" element={<IndustryActivityPage industry="saas" />} />
        <Route path="/saas/insights" element={<IndustryInsightsPage industry="saas" />} />
        <Route path="/saas/offers" element={<IndustryOffersPage industry="saas" />} />

        <Route path="/banking" element={<IndustryLandingPage industry="banking" />} />
        <Route path="/banking/dashboard" element={<IndustryDashboardPage industry="banking" />} />
        <Route path="/banking/profile" element={<IndustryProfilePage industry="banking" />} />
        <Route path="/banking/activity" element={<IndustryActivityPage industry="banking" />} />
        <Route path="/banking/insights" element={<IndustryInsightsPage industry="banking" />} />
        <Route path="/banking/offers" element={<IndustryOffersPage industry="banking" />} />

        <Route path="/telecom" element={<IndustryLandingPage industry="telecom" />} />
        <Route path="/telecom/dashboard" element={<IndustryDashboardPage industry="telecom" />} />
        <Route path="/telecom/profile" element={<IndustryProfilePage industry="telecom" />} />
        <Route path="/telecom/activity" element={<IndustryActivityPage industry="telecom" />} />
        <Route path="/telecom/insights" element={<IndustryInsightsPage industry="telecom" />} />
        <Route path="/telecom/offers" element={<IndustryOffersPage industry="telecom" />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/:customerId" element={<AdminCustomerDetails />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="at-risk" element={<AdminAtRisk />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/customer" element={<CustomerRouteGuard />}>
          <Route element={<CustomerAreaLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="activity" element={<CustomerActivity />} />
            <Route path="insights" element={<CustomerInsights />} />
            <Route path="offers" element={<CustomerOffers />} />
            <Route path="*" element={<Navigate to="/customer" replace />} />
          </Route>
        </Route>
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  );
}