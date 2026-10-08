import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Customer Behavior',
    description: 'Understand how customers shop and interact with your market.',
  },
  {
    title: 'Purchase Insights',
    description: 'Discover spending patterns, frequently purchased categories, and customer preferences.',
  },
  {
    title: 'Churn Intelligence',
    description: 'Identify customers who may stop visiting or purchasing.',
  },
  {
    title: 'Smart Retention',
    description: 'Create personalized offers and strategies to bring customers back.',
  },
];

export default function Home() {
  return (
    <main className="landing-page-shell">
      <header className="landing-header">
        <div className="landing-brand" aria-label="ChurnIQ home">
          <span className="landing-mark">C</span>
          <div>
            <strong>ChurnIQ</strong>
            <small>Customer Intelligence</small>
          </div>
        </div>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#customer-intelligence">Customer Intelligence</a>
          <a href="#insights">Insights</a>
        </nav>

        <Link to="/market" className="landing-cta">Enter Market</Link>
      </header>

      <section className="landing-hero" id="overview">
        <div className="landing-hero-copy">
          <span className="landing-kicker">CUSTOMER INTELLIGENCE · MARKET</span>
          <h1>
            Know Your Customers.<br />
            Grow Your Market.
          </h1>
          <p>
            Understand customer behavior, discover buying patterns, identify customers at risk of leaving,
            and create smarter retention strategies.
          </p>

          <div className="landing-actions">
            <Link to="/market" className="primary-button">
              Explore Market
              <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="secondary-button">
              See How It Works <ChevronDown size={15} />
            </a>
          </div>
        </div>

        <div className="market-visual" aria-label="Market intelligence summary">
          <div className="market-visual-card market-visual-main">
            <div className="market-visual-head">
              <span className="market-badge">LIVE MARKET</span>
              <span className="market-pill">+12.4%</span>
            </div>
            <div className="market-visual-grid">
              <div className="market-stat-box">
                <small>Customer health</small>
                <strong>84%</strong>
              </div>
              <div className="market-stat-box">
                <small>Retention</small>
                <strong>73%</strong>
              </div>
            </div>
            <div className="market-bars" aria-hidden="true">
              <span style={{ height: '30%' }} />
              <span style={{ height: '52%' }} />
              <span style={{ height: '64%' }} />
              <span style={{ height: '78%' }} />
              <span style={{ height: '92%' }} />
              <span style={{ height: '80%' }} />
            </div>
          </div>

          <div className="market-visual-card market-mini-card market-mini-top">
            <small>Top categories</small>
            <strong>Groceries</strong>
            <span>42% repeat buyers</span>
          </div>

          <div className="market-visual-card market-mini-card market-mini-bottom">
            <small>At-risk segment</small>
            <strong>1,240</strong>
            <span>Customer engagement dip</span>
          </div>
        </div>
      </section>

      <section className="landing-features" id="how-it-works">
        <div className="section-heading">
          <span className="landing-kicker small">Built for Modern Markets</span>
          <h2>Built for Modern Markets</h2>
        </div>
        <p className="section-intro">
          ChurnIQ helps markets understand who their customers are, how they shop, what they prefer,
          and when they may stop returning.
        </p>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-number">0{features.indexOf(feature) + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="entry-section" id="customer-intelligence">
        <div className="section-heading align-center">
          <span className="landing-kicker small">Market access</span>
          <h2>Enter Your Market</h2>
        </div>

        <div className="entry-grid">
          <div className="entry-card">
            <span className="entry-tag">NEW CUSTOMER</span>
            <h3>Create your ChurnIQ Customer ID and start your customer profile.</h3>
            <Link to="/market" className="entry-button">New Customer</Link>
          </div>

          <div className="entry-card">
            <span className="entry-tag">REGULAR CUSTOMER</span>
            <h3>Already have a Customer ID? Continue to your account.</h3>
            <Link to="/market" className="entry-button secondary">Regular Customer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
