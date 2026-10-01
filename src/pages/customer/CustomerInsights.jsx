import { Activity, ChartNoAxesColumnIncreasing, Clock3, ShoppingBasket } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import CustomerPageHeading from '../../components/CustomerPageHeading.jsx';
import { formatCustomerDate } from '../../utils/customerUtils.js';

function lastPurchaseLabel(days) {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function CustomerInsights() {
  const { customer } = useOutletContext();
  const explanation = customer.customerActivity === 'Active'
    ? 'Your recent activity shows that you are an active customer.'
    : customer.customerActivity === 'Occasional'
      ? 'You shop from time to time. Your account is ready whenever you find something you like.'
      : 'It has been a while since your last purchase. Your account and preferences are still here for you.';
  const insights = [
    { label: 'Purchase Frequency', value: customer.purchaseFrequency, note: 'Based on your order history', icon: ShoppingBasket },
    { label: 'Customer Activity', value: customer.customerActivity, note: 'Based on recent purchases', icon: Activity },
    { label: 'Spending Pattern', value: customer.spendingPattern, note: 'Based on average order value', icon: ChartNoAxesColumnIncreasing },
    { label: 'Preferred Category', value: customer.preferredCategory, note: 'Your most visited category', icon: ShoppingBasket },
    { label: 'Last Purchase', value: lastPurchaseLabel(customer.daysSinceLastPurchase), note: formatCustomerDate(customer.lastPurchaseDate), icon: Clock3 },
  ];

  return (
    <div className="customer-page-content">
      <CustomerPageHeading
        eyebrow="YOUR SHOPPING PATTERNS"
        title="My Insights"
        description="Simple summaries based on your sample shopping activity."
      />

      <section className="customer-insights-list" aria-label="Your shopping insights">
        {insights.map(({ label, value, note, icon: Icon }) => (
          <article className="customer-insight-tile" key={label}>
            <span className="customer-insight-tile-icon"><Icon size={18} /></span>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="customer-friendly-insight">
        <span className={`customer-status-pill status-${customer.customerActivity.toLowerCase()}`}><span /> {customer.customerActivity} Customer</span>
        <h2>A note about your activity</h2>
        <p>{explanation}</p>
        <small>Based on your last purchase on {formatCustomerDate(customer.lastPurchaseDate)}.</small>
      </section>
      <p className="customer-demo-disclaimer">These friendly summaries are generated from synthetic demo data.</p>
    </div>
  );
}