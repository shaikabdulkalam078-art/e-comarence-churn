import { useOutletContext } from 'react-router-dom';

export default function MarketInsights() {
  const { customer } = useOutletContext();

  const insightCards = [
    { label: 'Purchase Frequency', value: customer.purchaseFrequency },
    { label: 'Customer Activity', value: customer.customerActivity },
    { label: 'Spending Pattern', value: customer.churnRisk === 'Low' ? 'Low' : customer.churnRisk === 'Medium' ? 'Medium' : 'High' },
    { label: 'Preferred Category', value: customer.preferredCategory },
    { label: 'Last Visit', value: customer.lastVisitDate },
  ];

  const message = `Your shopping activity shows that you frequently visit the market and prefer ${customer.preferredCategory.toLowerCase()} products.`;

  return (
    <div className="market-page-shell insights-page-shell">
      <div className="market-page-header">
        <div>
          <span className="market-kicker">My insights</span>
          <h1>Customer Insights</h1>
        </div>
      </div>

      <div className="insight-grid">
        {insightCards.map((card) => (
          <div key={card.label} className="insight-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <div className="market-panel insight-message-panel">
        <h2>Shopping summary</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
