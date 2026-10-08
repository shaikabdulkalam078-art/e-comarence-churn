import { ArrowRight, ChevronDown, Copy, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateNextCustomerId, isValidCustomerId, setCurrentCustomerId } from '../../utils/customerUtils.js';

const featureCards = [
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

export default function MarketLanding() {
  const navigate = useNavigate();
  const [generatedId, setGeneratedId] = useState('');
  const [regularId, setRegularId] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNewCustomer = () => {
    const nextId = generateNextCustomerId();
    if (!nextId) {
      setError('All customer IDs for this market dataset have been assigned.');
      return;
    }

    setGeneratedId(nextId);
    setError('');
  };

  const handleRegularCustomer = () => {
    const trimmedId = regularId.trim().toUpperCase();
    if (!isValidCustomerId(trimmedId)) {
      setError('Customer ID not found. Please enter a valid Market Customer ID.');
      return;
    }

    setCurrentCustomerId(trimmedId);
    navigate('/market/dashboard');
  };

  const copyId = async () => {
    if (!generatedId) return;
    try {
      await navigator.clipboard.writeText(generatedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
      setError('Unable to copy automatically. Please select and copy your Customer ID.');
    }
  };

  return (
    <main className="market-landing-page">
      <header className="market-entry-header">
        <Link to="/" className="landing-brand" aria-label="ChurnIQ home">
          <span className="landing-mark">C</span>
          <div>
            <strong>ChurnIQ</strong>
            <small>Customer Intelligence</small>
          </div>
        </Link>

        <nav className={`landing-nav${menuOpen ? ' is-open' : ''}`} aria-label="Market navigation">
          <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#customer-intelligence" onClick={() => setMenuOpen(false)}>Customer Intelligence</a>
          <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
        </nav>

        <button type="button" className="landing-cta" aria-label="Enter Market" onClick={() => document.getElementById('market-entry')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>Enter Market</span> <ArrowRight size={15} />
        </button>
        <button
          type="button"
          className="landing-menu-toggle"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <section className="landing-hero market-hero" id="overview">
        <div className="landing-hero-copy">
          <span className="landing-kicker">CUSTOMER INTELLIGENCE · MARKET</span>
          <h1>Know Your Customers.<br /><em>Grow Your Market.</em></h1>
          <p>
            Understand shopping behavior, identify customers at risk, and build smarter retention strategies.
          </p>

          <div className="landing-actions">
            <button type="button" className="primary-button" onClick={() => document.getElementById('market-entry')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Market
              <ArrowRight size={16} />
            </button>
            <a href="#how-it-works" className="secondary-button">
              See How It Works <ChevronDown size={15} />
            </a>
          </div>
        </div>

        <div className="market-visual" aria-label="Market analytics visual">
          <div className="market-visual-card market-visual-main">
            <div className="market-visual-head">
              <span className="market-badge">MARKET</span>
              <span className="market-pill">+18.2%</span>
            </div>
            <div className="market-visual-grid">
              <div className="market-stat-box">
                <small>Visits</small>
                <strong>42.8K</strong>
              </div>
              <div className="market-stat-box">
                <small>Retention</small>
                <strong>76%</strong>
              </div>
            </div>
            <div className="market-bars" aria-hidden="true">
              <span style={{ height: '38%' }} />
              <span style={{ height: '44%' }} />
              <span style={{ height: '52%' }} />
              <span style={{ height: '68%' }} />
              <span style={{ height: '82%' }} />
              <span style={{ height: '94%' }} />
            </div>
          </div>

          <div className="market-visual-card market-mini-card market-mini-top">
            <small>Top category</small>
            <strong>Groceries</strong>
            <span>4.8k orders this week</span>
          </div>

          <div className="market-visual-card market-mini-card market-mini-bottom">
            <small>At-risk</small>
            <strong>1,240</strong>
            <span>Need re-engagement</span>
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
          {featureCards.map((item, index) => (
            <article key={item.title} className="feature-card">
              <div className="feature-number">0{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="entry-section" id="customer-intelligence">
        <div className="section-heading align-center">
          <span className="landing-kicker small">Market access</span>
          <h2>Enter Your Market</h2>
        </div>

        <div className="entry-grid" id="market-entry">
          <div className="entry-card">
            <span className="entry-tag">NEW CUSTOMER</span>
            <h3>Create your ChurnIQ Customer ID and start your customer profile.</h3>

            {!generatedId ? (
              <button type="button" className="entry-button" onClick={handleNewCustomer}>
                Create Customer ID <ArrowRight size={16} />
              </button>
            ) : (
              <div className="generated-id-box">
                <span>YOUR MARKET CUSTOMER ID</span>
                <strong aria-live="polite">{generatedId}</strong>
                <div className="generated-actions">
                  <button type="button" className="mini-button" onClick={copyId}>
                    <Copy size={14} />
                    {copied ? 'Copied' : 'Copy ID'}
                  </button>
                  <button type="button" className="mini-button solid" onClick={() => { setCurrentCustomerId(generatedId); navigate('/market/dashboard'); }}>
                    Continue to Dashboard <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="entry-card">
            <span className="entry-tag">REGULAR CUSTOMER</span>
            <h3>Already have a Customer ID? Continue to your account.</h3>

            <form
              className="regular-customer-form"
              onSubmit={(event) => {
                event.preventDefault();
                handleRegularCustomer();
              }}
            >
              <label htmlFor="marketCustomerId">Enter your Customer ID</label>
              <input
                id="marketCustomerId"
                type="text"
                value={regularId}
                onChange={(event) => {
                  setRegularId(event.target.value);
                  setError('');
                }}
                placeholder="MK-100001"
                aria-label="Enter your Customer ID"
                aria-invalid={error.startsWith('Customer ID not found')}
                aria-describedby={error ? 'market-entry-error' : undefined}
                autoComplete="off"
              />
              <button type="submit" className="entry-button secondary">
                Continue <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {error && <div className="market-error" id="market-entry-error" role="alert">{error}</div>}
      </section>

      <footer className="landing-footer" id="insights">
        <span><Sparkles size={14} /> ChurnIQ</span>
        <small>Customer Intelligence</small>
      </footer>
    </main>
  );
}
