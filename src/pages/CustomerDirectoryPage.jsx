import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Search, UserRound, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { customers } from '../data/customers.js';
import { getCustomerProfile, setCurrentCustomerId } from '../utils/customerUtils.js';

const pageSize = 25;

export default function CustomerDirectoryPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activityFilter, setActivityFilter] = useState('All activity');
  const [currentPage, setCurrentPage] = useState(1);
  const [directoryCustomers] = useState(() => customers.map((customer) => getCustomerProfile(customer.customerId)));

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return directoryCustomers.filter((customer) => {
      const matchesQuery = !normalizedQuery || [
        customer.customerId,
        customer.name,
        customer.email,
        customer.phone,
        customer.location,
      ].some((field) => String(field).toLowerCase().includes(normalizedQuery));
      const matchesActivity = activityFilter === 'All activity' || customer.customerActivity === activityFilter;
      return matchesQuery && matchesActivity;
    });
  }, [activityFilter, directoryCustomers, query]);

  const pageCount = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const safePage = Math.min(currentPage, pageCount);
  const pageCustomers = filteredCustomers.slice((safePage - 1) * pageSize, safePage * pageSize);
  const activeCount = directoryCustomers.filter((customer) => customer.customerActivity === 'Active').length;
  const firstVisible = filteredCustomers.length ? (safePage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(safePage * pageSize, filteredCustomers.length);

  const openProfile = (customerId) => {
    if (setCurrentCustomerId(customerId)) navigate('/customer');
  };

  return (
    <main className="customer-directory-page">
      <header className="customer-directory-header">
        <Link className="customer-directory-brand" to="/" aria-label="Back to ChurnIQ home">
          <span><UserRound size={17} /></span><strong>ChurnIQ</strong><small>Customer Intelligence</small>
        </Link>
        <Link className="customer-directory-back" to="/"><ArrowLeft size={15} /> Back to Home</Link>
      </header>

      <div className="customer-directory-content">
        <div className="directory-page-heading">
          <div><span className="customer-page-eyebrow">DEMO OVERVIEW</span><h1>Customer Directory</h1><p>Browse names and contact details across the synthetic customer dataset.</p></div>
          <span className="directory-demo-tag">SYNTHETIC DATA</span>
        </div>

        <section className="directory-summary-grid" aria-label="Customer counts">
          <article><span className="directory-summary-icon"><UsersRound size={17} /></span><div><small>Total customers</small><strong>{directoryCustomers.length.toLocaleString('en-IN')}</strong></div></article>
          <article><span className="directory-summary-icon directory-active-icon"><UserRound size={17} /></span><div><small>Active customers</small><strong>{activeCount.toLocaleString('en-IN')}</strong></div></article>
          <article><span className="directory-summary-icon directory-list-icon"><Search size={17} /></span><div><small>Matching records</small><strong>{filteredCustomers.length.toLocaleString('en-IN')}</strong></div></article>
        </section>

        <section className="customer-directory-panel">
          <div className="directory-toolbar">
            <div><h2>All customers</h2><p>Search by name, customer ID, phone, email, or city.</p></div>
            <div className="directory-filters">
              <label className="directory-search" htmlFor="directory-search">
                <Search size={16} />
                <input id="directory-search" type="search" value={query} placeholder="Search customers" onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} />
              </label>
              <select aria-label="Filter by activity" value={activityFilter} onChange={(event) => { setActivityFilter(event.target.value); setCurrentPage(1); }}>
                <option>All activity</option><option>Active</option><option>Occasional</option><option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="customer-directory-table-wrap">
            <table className="customer-directory-table">
              <thead><tr><th>Customer</th><th>Customer ID</th><th>Phone number</th><th>Email</th><th>City</th><th>Activity</th><th /></tr></thead>
              <tbody>
                {pageCustomers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td><strong>{customer.name}</strong></td>
                    <td><span className="directory-customer-id">{customer.customerId}</span></td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.location}</td>
                    <td><span className={`directory-activity directory-${customer.customerActivity.toLowerCase()}`}><span />{customer.customerActivity}</span></td>
                    <td><button className="directory-open-button" type="button" onClick={() => openProfile(customer.customerId)}>Open</button></td>
                  </tr>
                ))}
                {pageCustomers.length === 0 && <tr><td className="directory-empty" colSpan="7">No customers match this search.</td></tr>}
              </tbody>
            </table>
          </div>

          <footer className="directory-pagination">
            <span>Showing <strong>{firstVisible}–{lastVisible}</strong> of <strong>{filteredCustomers.length.toLocaleString('en-IN')}</strong></span>
            <div>
              <button type="button" aria-label="Previous page" disabled={safePage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}><ChevronLeft size={16} /></button>
              <span>Page {safePage} of {pageCount}</span>
              <button type="button" aria-label="Next page" disabled={safePage >= pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}><ChevronRight size={16} /></button>
            </div>
          </footer>
        </section>
        <p className="customer-demo-disclaimer">Generated records are synthetic. Contact details entered for new profiles are shown only in this browser demo.</p>
      </div>
    </main>
  );
}