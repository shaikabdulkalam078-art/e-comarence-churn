import { Activity, CalendarDays, MapPin, Phone, ShieldAlert, ShoppingBag, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  formatCompactCurrency,
  formatCurrency,
  formatCustomerDate,
  getCustomerById,
  getCustomerRegistrationMeta,
} from '../../utils/customerUtils.js';

export default function AdminCustomerDetails() {
  const { customerId } = useParams();
  const customer = getCustomerById(customerId);

  if (!customer) {
    return (
      <div className="admin-page">
        <div className="admin-panel admin-empty-state-panel">
          <h2>Customer not found</h2>
          <p>The requested customer record does not exist in the current market dataset.</p>
          <Link to="/admin/customers" className="admin-primary-button">Back to customers</Link>
        </div>
      </div>
    );
  }

  const registrationMeta = getCustomerRegistrationMeta(customer.customerId);
  const registrationDate = registrationMeta?.registeredAt ? formatCustomerDate(registrationMeta.registeredAt.slice(0, 10)) : 'Not available';

  const recommendedAction = customer.churnRisk === 'High'
    ? 'Customer has low recent activity. Consider sending a personalized offer.'
    : customer.churnRisk === 'Medium'
      ? 'Customer is showing moderate churn risk. Reinforce retention messaging.'
      : 'Customer is active. Continue personalized engagement.';

  return (
    <div className="admin-page">
      <div className="admin-page-header details-header">
        <div>
          <p className="admin-kicker">Customer Profile</p>
          <h2>{customer.name}</h2>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/customers" className="admin-secondary-button">Back to list</Link>
        </div>
      </div>

      <div className="admin-panel admin-profile-summary">
        <div className="admin-profile-header">
          <div className="admin-avatar large">{customer.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <div>
            <h3>{customer.customerId}</h3>
            <p>{customer.email}</p>
          </div>
        </div>

        <div className="admin-detail-grid">
          <div><span>Customer ID</span><strong>{customer.customerId}</strong></div>
          <div><span>Name</span><strong>{customer.name}</strong></div>
          <div><span>Email</span><strong>{customer.email}</strong></div>
          <div><span>Phone</span><strong>{customer.phone}</strong></div>
          <div><span>Location</span><strong>{customer.location}</strong></div>
          <div><span>Age</span><strong>{customer.age}</strong></div>
          <div><span>Gender</span><strong>{customer.gender}</strong></div>
          <div><span>Signup Date</span><strong>{formatCustomerDate(customer.signupDate)}</strong></div>
          <div><span>Preferred Category</span><strong>{customer.preferredCategory}</strong></div>
          <div><span>Registered On</span><strong>{registrationDate}</strong></div>
        </div>
      </div>

      <div className="admin-summary-grid detail-grid">
        <div className="admin-summary-card blue">
          <div className="admin-summary-head"><span>Total Orders</span><div className="admin-summary-icon"><ShoppingBag size={16} /></div></div>
          <strong>{customer.totalOrders}</strong>
          <small>Orders placed</small>
        </div>
        <div className="admin-summary-card green">
          <div className="admin-summary-head"><span>Total Spending</span><div className="admin-summary-icon"><CalendarDays size={16} /></div></div>
          <strong>{formatCurrency(customer.totalSpending)}</strong>
          <small>Lifetime value</small>
        </div>
        <div className="admin-summary-card teal">
          <div className="admin-summary-head"><span>Average Order Value</span><div className="admin-summary-icon"><Activity size={16} /></div></div>
          <strong>{formatCurrency(customer.averageOrderValue)}</strong>
          <small>Per order</small>
        </div>
        <div className="admin-summary-card amber">
          <div className="admin-summary-head"><span>Last Purchase</span><div className="admin-summary-icon"><MapPin size={16} /></div></div>
          <strong>{customer.daysSinceLastPurchase} days</strong>
          <small>{formatCustomerDate(customer.lastPurchaseDate)}</small>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Churn Information</h3>
              <p>Risk and probability</p>
            </div>
          </div>
          <div className="admin-pair-list">
            <div><span>Churn Probability</span><strong>{customer.churnProbability * 100}%</strong></div>
            <div><span>Churn Risk</span><strong className={`admin-risk-text ${String(customer.churnRisk).toLowerCase()}`}>{customer.churnRisk}</strong></div>
            <div><span>Customer Activity</span><strong>{customer.customerActivity}</strong></div>
            <div><span>Purchase Frequency</span><strong>{customer.purchaseFrequency}</strong></div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h3>Recommended Action</h3>
              <p>Retention guidance</p>
            </div>
          </div>
          <div className="admin-callout">
            <ShieldAlert size={18} />
            <p>{recommendedAction}</p>
          </div>
        </div>
      </div>

      <div className="admin-panel admin-table-panel">
        <div className="admin-panel-head">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest purchases</p>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {(customer.recentOrders || []).map((order) => (
                <tr key={order.orderId}>
                  <td>{formatCustomerDate(order.date)}</td>
                  <td>{order.product}</td>
                  <td>{order.category}</td>
                  <td>{formatCurrency(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
