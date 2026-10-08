import { useOutletContext } from 'react-router-dom';
import { formatCurrency, formatCustomerDate } from '../../utils/customerUtils.js';

export default function MarketActivity() {
  const { customer } = useOutletContext();

  const spendBars = [58, 72, 64, 84, 92, 80, 76];

  return (
    <div className="market-page-shell activity-page-shell">
      <div className="market-page-header">
        <div>
          <span className="market-kicker">My activity</span>
          <h1>Market Activity</h1>
        </div>
      </div>

      <div className="market-summary-grid compact-grid">
        <div className="market-summary-card">
          <span>Total Visits</span>
          <strong>{customer.totalVisits}</strong>
        </div>
        <div className="market-summary-card">
          <span>Total Orders</span>
          <strong>{customer.totalOrders}</strong>
        </div>
        <div className="market-summary-card">
          <span>Total Spending</span>
          <strong>{formatCurrency(customer.totalSpending)}</strong>
        </div>
        <div className="market-summary-card">
          <span>Average Order Value</span>
          <strong>{formatCurrency(customer.averageOrderValue)}</strong>
        </div>
      </div>

      <div className="market-panel-grid activity-grid">
        <div className="market-panel">
          <div className="panel-head">
            <div>
              <span className="market-kicker">Purchase history</span>
              <h2>Recent Purchases</h2>
            </div>
          </div>

          <div className="market-table-wrap">
            <table className="market-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {customer.recentPurchases.map((purchase) => (
                  <tr key={`${purchase.date}-${purchase.product}`}>
                    <td>{formatCustomerDate(purchase.date)}</td>
                    <td>{purchase.product}</td>
                    <td>{purchase.category}</td>
                    <td>{formatCurrency(purchase.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="market-panel">
          <div className="panel-head">
            <div>
              <span className="market-kicker">Monthly spend</span>
              <h2>Visit Activity</h2>
            </div>
          </div>

          <div className="mini-activity-bars compact-bars" aria-label="Monthly spending chart">
            {spendBars.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>

          <div className="info-metrics">
            <div><span>Purchase Frequency</span><strong>{customer.purchaseFrequency}</strong></div>
            <div><span>Last Visit</span><strong>{customer.lastVisitDate}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
