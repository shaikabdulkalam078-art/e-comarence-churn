import { useMemo, useState } from 'react';
import { ArrowRight, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { customers } from '../data/mockData.js';
import { downloadCsv } from '../utils/downloadCsv.js';

export default function AtRiskPage() {
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState('All');
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Highest Risk');
  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers
      .filter((customer) => (riskFilter === 'All' ? true : customer.risk === riskFilter))
      .filter((customer) => (segmentFilter === 'All' ? true : customer.segment === segmentFilter))
      .filter((customer) => {
        if (!query) return true;
        return [customer.name, customer.customerId, customer.location, customer.segment].join(' ').toLowerCase().includes(query);
      })
      .sort((a, b) => {
        if (sortBy === 'Highest Risk') return b.churnProbability - a.churnProbability;
        if (sortBy === 'Lowest Risk') return a.churnProbability - b.churnProbability;
        if (sortBy === 'Highest Customer Value') return b.totalRevenue - a.totalRevenue;
        return Number(b.daysSincePurchase) - Number(a.daysSincePurchase);
      });
  }, [riskFilter, segmentFilter, sortBy, search]);

  const revenueAtRisk = filteredCustomers.reduce((sum, customer) => sum + customer.totalRevenue * (customer.churnProbability / 100), 0);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> RETENTION PRIORITY</div>
          <h2>At-Risk Customers</h2>
          <p>Review customers with the highest predicted probability of churn.</p>
        </div>
      </div>

      <div className="stats-row risk-kpi-row">
        <div className="mini-stat danger">
          <span>High Risk</span>
          <strong>{customers.filter((customer) => customer.risk === 'High').length}</strong>
        </div>
        <div className="mini-stat warning">
          <span>Medium Risk</span>
          <strong>{customers.filter((customer) => customer.risk === 'Medium').length}</strong>
        </div>
        <div className="mini-stat accent">
          <span>Revenue at Risk</span>
          <strong>₹{(revenueAtRisk / 100000).toFixed(1)}L</strong>
        </div>
        <div className="mini-stat neutral">
          <span>Customers Requiring Attention</span>
          <strong>{filteredCustomers.length}</strong>
        </div>
      </div>

      <div className="filter-bar risk-filter-bar">
        <label className="search-filter">
          <Search size={15} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer or segment" />
        </label>
        <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>
          <option value="All">All risks</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={segmentFilter} onChange={(event) => setSegmentFilter(event.target.value)}>
          <option value="All">All segments</option>
          <option value="Loyal">Loyal</option>
          <option value="High Value">High Value</option>
          <option value="At Risk">At Risk</option>
        </select>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="Highest Risk">Highest Risk</option>
          <option value="Lowest Risk">Lowest Risk</option>
          <option value="Highest Customer Value">Highest Customer Value</option>
          <option value="Most Recent Purchase">Most Recent Purchase</option>
        </select>
        <button type="button" className="primary-button small-button" onClick={() => downloadCsv('at-risk-customers.csv', filteredCustomers.map((customer) => ({
          'Customer ID': customer.customerId,
          Name: customer.name,
          Segment: customer.segment,
          'Last Purchase': customer.lastPurchase,
          Orders: customer.totalOrders,
          Revenue: customer.totalRevenue,
          'Churn Probability': `${customer.churnProbability}%`,
          Risk: customer.risk,
          'Recommended Action': customer.recommendedAction,
        })))}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="detail-card table-wrap">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Segment</th>
                <th>Last Purchase</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Churn Probability</th>
                <th>Risk</th>
                <th>Recommended Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.segment}</td>
                  <td>{customer.lastPurchase}</td>
                  <td>{customer.totalOrders}</td>
                  <td>₹{(customer.totalRevenue / 1000).toFixed(0)}K</td>
                  <td>{customer.churnProbability}%</td>
                  <td><span className={`risk-badge risk-${customer.risk.toLowerCase()}`}>{customer.risk}</span></td>
                  <td>{customer.recommendedAction}</td>
                  <td><button type="button" className="text-button compact" onClick={() => navigate(`/customer/${customer.customerId}`)}>View Customer <ArrowRight size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
