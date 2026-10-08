import { useOutletContext } from 'react-router-dom';

export default function MarketOffers() {
  const { customer } = useOutletContext();

  return (
    <div className="market-page-shell offers-page-shell">
      <div className="market-page-header">
        <div>
          <span className="market-kicker">Recommendations</span>
          <h1>Recommended For You</h1>
        </div>
      </div>

      <div className="offer-grid">
        {customer.recommendedOffers.map((offer, index) => (
          <article key={`${offer.title}-${index}`} className="offer-card">
            <span className="offer-badge">{offer.discount}</span>
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
          </article>
        ))}
      </div>

      <p className="offer-note">Offers are personalized based on your shopping activity.</p>
      <p className="offer-note subtle">These are demo offers only. No real messages, emails, or payments are processed.</p>
    </div>
  );
}
