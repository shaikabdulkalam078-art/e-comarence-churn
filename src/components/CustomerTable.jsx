import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RiskBadge from './RiskBadge.jsx';

export default function CustomerTable({ customers, onViewAll, onExport }) {
  return (
    <section className="customer-card">
      <div className="customer-card-header">
        <div>
          <div className="table-title-row"><h2>Recently Identified At-Risk Customers</h2><span className="table-count">{customers.length}</span></div>
          <p>Customers with the highest predicted churn probability</p>
        </div>
        <button className="text-button" onClick={onViewAll}>View all <ArrowRight size={15} /></button>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Last Purchase</th>
              <th>Total Orders</th>
              <th>Customer Value</th>
              <th>Churn Probability</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <span className="customer-id-cell">{customer.id}</span>
                </td>
                <td><div className="customer-identity"><span className="customer-avatar">{customer.initials}</span><strong>{customer.name}</strong></div></td>
                <td>{customer.lastPurchase}</td>
                <td>{customer.orders}</td>
                <td className="value-cell">{customer.value}</td>
                <td>
                  <div className="probability-cell"><span className="probability-track"><span style={{ width: `${customer.probability}%` }} /></span><strong>{customer.probability}%</strong></div>
                </td>
                <td><RiskBadge level={customer.risk} /></td>
              </tr>
            ))}
            {customers.length === 0 && <tr><td colSpan="7" className="empty-table">No customers match your search.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="table-footer"><span>Showing <strong>{customers.length}</strong> of 4,820 high-risk customers</span><button className="table-export" aria-label="Export customers" onClick={onExport} disabled={customers.length === 0}><ArrowUpRight size={15} /> Export list</button></div>
    </section>
  );
}