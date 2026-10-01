import { Sparkles } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import OfferCard from '../../components/OfferCard.jsx';
import CustomerPageHeading from '../../components/CustomerPageHeading.jsx';

export default function CustomerOffers() {
  const { customer } = useOutletContext();

  return (
    <div className="customer-page-content">
      <CustomerPageHeading
        eyebrow="PICKED FOR YOU"
        title="Recommended For You"
        description={`A few demo recommendations inspired by your interest in ${customer.preferredCategory.toLowerCase()}.`}
      />

      <div className="customer-offers-note"><Sparkles size={16} /> Offers are personalized based on your shopping activity.</div>
      <section className="customer-offer-grid" aria-label="Recommended demo offers">
        {customer.recommendedOffers.map((offer, index) => (
          <OfferCard key={`${offer.title}-${index}`} offer={offer} index={index} />
        ))}
      </section>
      <p className="customer-demo-disclaimer">Demo recommendations only. Offers cannot be redeemed and no messages are sent.</p>
    </div>
  );
}