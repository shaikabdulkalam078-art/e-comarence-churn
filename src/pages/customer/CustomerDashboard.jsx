import { Activity, ArrowRight, CalendarDays, IndianRupee, ShoppingBag } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomerPageHeading from '../../components/CustomerPageHeading.jsx';
import CustomerSummaryCard from '../../components/CustomerSummaryCard.jsx';
import { formatCompactCurrency, formatCurrency, formatCustomerDate } from '../../utils/customerUtils.js';

function activityLabel(activity) {
  if (activity === 'Inactive') return 'Ready when you are';
  if (activity === 'Occasional') return 'Your account is here whenever you need it';
  return 'Your account is active';
}

export default function CustomerDashboard() {
  const { customer } = useOutletContext();
  const latestOrder = customer.recentOrders[0];

  return (
    <div className="customer-page-content">
      <CustomerPageHeading
        eyebrow={`CUSTOMER ID: ${customer.customerId}`}
        title={`Welcome back, ${customer.name.split(' ')[0]}`}
        description="Here is a simple overview of your shopping activity."
      />

      <section className="customer-summary-grid" aria-label="Your account summary">
        <CustomerSummaryCard icon={ShoppingBag} label="Total Orders" value={customer.totalOrders} note="Orders placed" />
        <CustomerSummaryCard icon={IndianRupee} label="Total Spending" value={formatCurrency(customer.totalSpending)} note="Lifetime order value" tone="teal" />
        <CustomerSummaryCard icon={IndianRupee} label="Average Order Value" value={formatCurrency(customer.averageOrderValue)} note="Average per order" tone="gold" />
        <CustomerSummaryCard icon={Activity} label="Customer Activity" value={customer.customerActivity} note={activityLabel(customer.customerActivity)} tone="coral" />
      </section>

      <section className="customer-dashboard-columns">
        <article className="customer-content-panel customer-activity-chart-panel">
          <div className="customer-panel-title-row">
            <div><h2>Spending activity</h2><p>Your sample monthly order activity</p></div>
            <span className={`customer-status-pill status-${customer.customerActivity.toLowerCase()}`}>
              <span /> {customer.customerActivity} Customer
            </span>
          </div>
          <div className="customer-activity-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customer.spendingActivity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="customerActivityArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#3768cb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3768cb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf1f4" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8290a0', fontSize: 10 }} />
                <YAxis width={50} axisLine={false} tickLine={false} tick={{ fill: '#8290a0', fontSize: 9 }} tickFormatter={formatCompactCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Sample spending']} />
                <Area type="monotone" dataKey="amount" stroke="#3768cb" strokeWidth={2.5} fill="url(#customerActivityArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="customer-content-panel customer-latest-order-panel">
          <div className="customer-panel-title-row">
            <div><h2>Latest order</h2><p>A recent item from your activity</p></div>
            <span className="customer-panel-icon"><ShoppingBag size={17} /></span>
          </div>
          <div className="latest-order-date"><CalendarDays size={14} /> {formatCustomerDate(latestOrder.date)}</div>
          <strong className="latest-order-product">{latestOrder.product}</strong>
          <span className="latest-order-category">{latestOrder.category}</span>
          <strong className="latest-order-amount">{formatCurrency(latestOrder.amount)}</strong>
          <Link className="customer-inline-link" to="/customer/activity">View all activity <ArrowRight size={15} /></Link>
        </article>
      </section>

      <section className="customer-shortcuts" aria-label="Your account">
        <Link to="/customer/profile"><span>My Profile</span><small>Review your account details</small><ArrowRight size={16} /></Link>
        <Link to="/customer/insights"><span>My Insights</span><small>Explore your shopping patterns</small><ArrowRight size={16} /></Link>
        <Link to="/customer/offers"><span>Recommended Offers</span><small>See offers picked for you</small><ArrowRight size={16} /></Link>
      </section>

      <p className="customer-demo-disclaimer">This customer account uses synthetic demonstration data.</p>
    </div>
  );
}