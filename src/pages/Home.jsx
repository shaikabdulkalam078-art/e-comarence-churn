import { Building2, Landmark, ShoppingBag, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import IndustryCard from '../components/IndustryCard.jsx';

const cards = [
  {
    industry: 'ecommerce',
    title: 'E-Commerce',
    description: 'Analyze shopping behavior and improve customer retention.',
    route: '/ecommerce',
    icon: ShoppingBag,
  },
  {
    industry: 'saas',
    title: 'Company / SaaS',
    description: 'Understand subscription usage and customer engagement.',
    route: '/saas',
    icon: Building2,
  },
  {
    industry: 'banking',
    title: 'Banking',
    description: 'Analyze customer transactions and banking engagement.',
    route: '/banking',
    icon: Landmark,
  },
  {
    industry: 'telecom',
    title: 'Telecom',
    description: 'Understand usage patterns and identify churn risk early.',
    route: '/telecom',
    icon: Wifi,
  },
];

export default function Home() {
  return (
    <main className="industry-home-page">
      <header className="industry-home-header">
        <div className="industry-home-brand" aria-label="ChurnIQ home">
          <span className="industry-home-mark">C</span>
          <div>
            <strong>ChurnIQ</strong>
            <small>Customer Intelligence</small>
          </div>
        </div>

        <div className="industry-home-actions">
          <Link to="/admin" className="industry-mini-link">Admin Dashboard</Link>
          <Link to="/directory" className="industry-mini-link">Customer Directory</Link>
        </div>
      </header>

      <section className="industry-home-content">
        <div className="industry-hero">
          <span className="industry-kicker">Customer intelligence platform</span>
          <h1>Customer Intelligence for Every Business</h1>
          <p>Understand your customers, identify churn risk, and build better retention strategies with ChurnIQ.</p>
        </div>

        <div className="industry-selection-block">
          <div className="industry-selection-header">
            <h2>Choose Your Business</h2>
          </div>
          <div className="industry-card-grid">
            {cards.map((card) => (
              <IndustryCard
                key={card.industry}
                industry={card.industry}
                title={card.title}
                description={card.description}
                route={card.route}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
