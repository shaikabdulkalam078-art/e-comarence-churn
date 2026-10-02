import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  formatCurrency,
  getCustomerRegistrationMeta,
  getRegisteredCustomers,
} from '../../utils/customerUtils.js';

export default function AdminCustomers() {
  const customers = useMemo(() => getRegisteredCustomers().map((customer) => ({
    ...customer,
    registeredAt: getCustomerRegistrationMeta(customer.customerId)?.registeredAt || null,
  })), []);

  const [search, setSearch] = useState('');
  const [activityFilter, setActivityFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const locations = ['All', ...new Set(customers.map((customer) => customer.location))];

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesQuery = !query || [
        customer.customerId,
        customer.name,
        customer.email,
        customer.location,
      ].some((field) => field?.toLowerCase().includes(query));

      const matchesActivity = activityFilter === 'All' || customer.customerActivity === activityFilter;
      const matchesRisk = riskFilter === 'All' || customer.churnRisk === riskFilter;
      const matchesLocation = locationFilter === 'All' || customer.location === locationFilter;

      return matchesQuery && matchesActivity && matchesRisk && matchesLocation;
    });
  }, [activityFilter, customers, locationFilter, riskFilter, search]);

  const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Customers</p>
          <h2>Registered Customer Directory</h2>
        </div>
        <Link to="/admin" className="admin-secondary-button">Back to dashboard</Link>
      </div>

      <div className="admin-panel admin-toolbar-panel">
        <div className="admin-toolbar-search">
          <Search size={15} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers..."
            aria-label="Search customers"
          />
        </div>

        <div className="admin-toolbar-filters">
          <label>
            <span>Activity</span>
            <select value={activityFilter} onChange={(event) => setActivityFilter(event.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Occasional">Occasional</option>
            </select>
          </label>

          <label>
            <span>Churn Risk</span>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            <span>Location</span>
            <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
              {locations.map((location) => (
                <option key={location} value={location}>{location === 'All' ? 'All' : location}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="admin-panel admin-table-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Total Orders</th>
                <th>Total Spending</th>
                <th>Activity</th>
                <th>Churn Risk</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length ? filteredCustomers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.location}</td>
                  <td>{customer.totalOrders}</td>
                  <td>{formatCurrency(customer.totalSpending)}</td>
                  <td>
                    <span className={`admin-status-pill ${customer.customerActivity === 'Active' ? 'active' : customer.customerActivity === 'Inactive' ? 'inactive' : 'cool'}`}>
                      {customer.customerActivity}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-risk-pill ${String(customer.churnRisk).toLowerCase()}`}>
                      {customer.churnRisk}
                    </span>
                  </td>
                  <td>{formatDate(customer.registeredAt)}</td>
                  <td>
                    <Link to={`/admin/customers/${customer.customerId}`} className="admin-link-button">
                      View
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="admin-empty-row">No registered customers match your current search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
