import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RiskBadge from './RiskBadge.jsx';

export default function CustomerTable({
  customers,
  onViewAll,
  onExport,
  title = 'Recently Identified At-Risk Customers',
  description = 'Customers with the highest predicted churn probability',
  onRowClick,
}) {
  return (
    <section className="customer-card">
      <div className="customer-card-header">
        <div>
          <div className="table-title-row"><h2>{title}</h2><span className="table-count">{customers.length}</span></div>
          <p>{description}</p>
        </div>
        {onViewAll && <button className="text-button" onClick={onViewAll}>View all <ArrowRight size={15} /></button>}
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
              <tr key={customer.customerId || customer.id} onClick={() => onRowClick?.(customer)} className={onRowClick ? 'clickable-row' : ''}>
                <td>
                  <span className="customer-id-cell">{customer.customerId || customer.id}</span>
                </td>
                <td>
                  <div className="customer-identity">
                    <span className="customer-avatar">{customer.initials || (customer.name || 'NA').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>
                    <strong>{customer.name}</strong>
                  </div>
                </td>
                <td>{customer.lastPurchase}</td>
                <td>{customer.totalOrders ?? customer.orders}</td>
                <td className="value-cell">{customer.customerValue || customer.value}</td>
                <td>
                  <div className="probability-cell">
                    <span className="probability-track"><span style={{ width: `${customer.churnProbability ?? customer.probability}%` }} /></span>
                    <strong>{customer.churnProbability ?? customer.probability}%</strong>
                  </div>
                </td>
                <td><RiskBadge level={customer.risk} /></td>
              </tr>
            ))}
            {customers.length === 0 && <tr><td colSpan="7" className="empty-table">No customers match your search.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>Showing <strong>{customers.length}</strong> high-risk profiles</span>
        {onExport && <button className="table-export" aria-label="Export customers" onClick={onExport} disabled={customers.length === 0}><ArrowUpRight size={15} /> Export list</button>}
      </div>
    </section>
  );
}