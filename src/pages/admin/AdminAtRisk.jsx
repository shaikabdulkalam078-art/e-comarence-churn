import { Link } from 'react-router-dom';
import { formatCurrency, getAtRiskCustomers } from '../../utils/customerUtils.js';

export default function AdminAtRisk() {
  const atRiskCustomers = getAtRiskCustomers();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Retention</p>
          <h2>At-Risk Customers</h2>
        </div>
      </div>

      <div className="admin-panel admin-table-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Last Purchase</th>
                <th>Total Orders</th>
                <th>Total Spending</th>
                <th>Churn Probability</th>
                <th>Churn Risk</th>
                <th>Suggested Action</th>
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.length ? atRiskCustomers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.daysSinceLastPurchase} days ago</td>
                  <td>{customer.totalOrders}</td>
                  <td>{formatCurrency(customer.totalSpending)}</td>
                  <td>{Math.round(customer.churnProbability * 100)}%</td>
                  <td>
                    <span className={`admin-risk-pill ${String(customer.churnRisk).toLowerCase()}`}>
                      {customer.churnRisk}
                    </span>
                  </td>
                  <td>
                    {customer.churnRisk === 'High'
                      ? 'Send a personalized discount offer.'
                      : 'Send a targeted re-engagement message.'}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="admin-empty-row">No at-risk customers in the registered cohort.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-inline-actions">
        <Link to="/admin/customers" className="admin-primary-button">View customer list</Link>
      </div>
    </div>
  );
}
