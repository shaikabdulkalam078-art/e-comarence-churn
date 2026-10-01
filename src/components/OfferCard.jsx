import { BadgePercent, Check } from 'lucide-react';

export default function OfferCard({ offer, index }) {
  return (
    <article className={`customer-offer-card offer-tone-${index % 3}`}>
      <div className="customer-offer-topline">
        <span className="customer-offer-icon"><BadgePercent size={18} /></span>
        <span className="customer-offer-demo">DEMO OFFER</span>
      </div>
      <span className="customer-offer-discount">{offer.discount}</span>
      <h2>{offer.title}</h2>
      <p>{offer.description}</p>
      <span className="customer-offer-note"><Check size={14} /> Personalized for your shopping activity</span>
    </article>
  );
}