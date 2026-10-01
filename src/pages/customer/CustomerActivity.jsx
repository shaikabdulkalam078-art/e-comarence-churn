import { Activity, CalendarDays, IndianRupee, ShoppingBag } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomerPageHeading from '../../components/CustomerPageHeading.jsx';
import CustomerSummaryCard from '../../components/CustomerSummaryCard.jsx';
import { formatCompactCurrency, formatCurrency, formatCustomerDate } from '../../utils/customerUtils.js';

export default function CustomerActivity() {
  const { customer } = useOutletContext();

  return (
    <div className="customer-page-content">
      <CustomerPageHeading
        eyebrow="YOUR SHOPPING"
        title="My Activity"
        description="A closer look at your orders and purchase history."
      />

      <section className="customer-summary-grid" aria-label="Your purchase activity">
        <CustomerSummaryCard icon={ShoppingBag} label="Total Orders" value={customer.totalOrders} note="Orders placed" />
        <CustomerSummaryCard icon={IndianRupee} label="Total Spending" value={formatCurrency(customer.totalSpending)} note="Lifetime order value" tone="teal" />
        <CustomerSummaryCard icon={IndianRupee} label="Average Order Value" value={formatCurrency(customer.averageOrderValue)} note="Average per order" tone="gold" />
        <CustomerSummaryCard icon={CalendarDays} label="Last Purchase" value={`${customer.daysSinceLastPurchase} days ago`} note={formatCustomerDate(customer.lastPurchaseDate)} tone="coral" />
      </section>

      <div className="customer-frequency-strip"><Activity size={16} /><span>Purchase Frequency</span><strong>{customer.purchaseFrequency}</strong><small>Based on your order history</small></div>

      <section className="customer-content-panel customer-order-chart-panel">
        <div className="customer-panel-title-row">
          <div><h2>Spending by month</h2><p>Sample spending activity across the last six months</p></div>
          <span className="customer-panel-icon"><CalendarDays size={17} /></span>
        </div>
        <div className="customer-activity-chart customer-order-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customer.spendingActivity} margin={{ top: 10, right: 10, left: 2, bottom: 0 }}>
              <CartesianGrid stroke="#edf1f4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8290a0', fontSize: 10 }} />
              <YAxis width={50} axisLine={false} tickLine={false} tick={{ fill: '#8290a0', fontSize: 9 }} tickFormatter={formatCompactCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Sample spending']} />
              <Bar dataKey="amount" fill="#527bc5" radius={[4, 4, 0, 0]} maxBarSize={38} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="customer-content-panel customer-order-table-panel">
        <div className="customer-panel-title-row">
          <div><h2>Recent orders</h2><p>Recent items from your synthetic customer record</p></div>
          <span className="customer-order-count">{customer.totalOrders} total orders</span>
        </div>
        <div className="customer-table-scroll">
          <table className="customer-orders-table">
            <thead><tr><th>Date</th><th>Product</th><th>Category</th><th>Amount</th></tr></thead>
            <tbody>
              {customer.recentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{formatCustomerDate(order.date)}</td>
                  <td><strong>{order.product}</strong></td>
                  <td>{order.category}</td>
                  <td><strong>{formatCurrency(order.amount)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="customer-demo-disclaimer">All purchases shown are synthetic demonstration records.</p>
    </div>
  );
}