import { ArrowLeft, ArrowRight, Check, Copy, UserPlus, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getIndustryMeta, setSelectedIndustry } from '../../utils/industryUtils.js';
import { generateNextIndustryCustomerId, isValidIndustryCustomerId, setCurrentIndustryCustomer } from '../../utils/registrationUtils.js';

export default function IndustryLandingPage({ industry }) {
  const navigate = useNavigate();
  const meta = getIndustryMeta(industry);
  const [mode, setMode] = useState('new');
  const [registration, setRegistration] = useState({ name: '', email: '', phone: '' });
  const [customerId, setCustomerId] = useState('');
  const [generatedId, setGeneratedId] = useState(() => localStorage.getItem(meta.generatedStorageKey) || '');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedIndustry(industry);
  }, [industry]);

  const handleGenerate = () => {
    const name = registration.name.trim();
    if (!name) {
      setError('Please enter your full name to generate a customer ID.');
      return;
    }

    const newId = generateNextIndustryCustomerId(industry);
    if (!newId) {
      setError('All demo customer IDs for this industry have been assigned.');
      return;
    }
    setGeneratedId(newId);
    setError('');
    setCopied(false);
  };

  const handleContinueGenerated = () => {
    if (!generatedId) {
      setError('Generate a customer ID before continuing.');
      return;
    }
    if (!setCurrentIndustryCustomer(industry, generatedId)) {
      setError('The generated customer ID could not be validated.');
      return;
    }
    navigate(`${meta.route}/dashboard`);
  };

  const handleRegularCustomerSubmit = (event) => {
    event.preventDefault();
    if (!customerId.trim()) {
      setError('Please enter a customer ID to continue.');
      return;
    }

    const normalized = customerId.trim().toUpperCase();
    if (!isValidIndustryCustomerId(industry, normalized)) {
      setError(`The ID does not belong to ${meta.label}. Please enter a valid ${meta.customerPrefix}-xxxxx ID.`);
      return;
    }

    setCurrentIndustryCustomer(industry, normalized);
    navigate(`${meta.route}/dashboard`);
  };

  const copyGeneratedId = async () => {
    try {
      await navigator.clipboard.writeText(generatedId);
      setCopied(true);
    } catch {
      const temporary = document.createElement('textarea');
      temporary.value = generatedId;
      temporary.style.position = 'fixed';
      temporary.style.opacity = '0';
      document.body.appendChild(temporary);
      temporary.select();
      setCopied(document.execCommand('copy'));
      temporary.remove();
    }
  };

  return (
    <main className="industry-landing-page">
      <header className="industry-landing-header">
        <Link to="/" className="industry-back-link"><ArrowLeft size={15} /> Back to Industries</Link>
      </header>

      <section className="industry-landing-card">
        <div className="industry-landing-top">
          <span className="industry-landing-kicker">Industry Demo</span>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>

        <div className="industry-landing-switcher">
          <button type="button" className={mode === 'new' ? 'active' : ''} onClick={() => setMode('new')}>
            <UserPlus size={16} /> New Customer
          </button>
          <button type="button" className={mode === 'existing' ? 'active' : ''} onClick={() => setMode('existing')}>
            <UserRound size={16} /> Regular Customer
          </button>
        </div>

        {mode === 'new' ? (
          <div className="industry-form-block">
            <label className="industry-form-label">
              <span>Full name</span>
              <input type="text" value={registration.name} onChange={(event) => setRegistration((current) => ({ ...current, name: event.target.value }))} placeholder="Enter your name" />
            </label>
            <label className="industry-form-label">
              <span>Email</span>
              <input type="email" value={registration.email} onChange={(event) => setRegistration((current) => ({ ...current, email: event.target.value }))} placeholder="you@example.com" />
            </label>
            <label className="industry-form-label">
              <span>Phone</span>
              <input type="tel" value={registration.phone} onChange={(event) => setRegistration((current) => ({ ...current, phone: event.target.value }))} placeholder="+91 98765 43210" />
            </label>

            {generatedId ? (
              <div className="generated-industry-id-box">
                <span>Your generated ID</span>
                <div className="generated-id-inline">
                  <strong>{generatedId}</strong>
                  <button type="button" onClick={copyGeneratedId}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : null}

            {error ? <p className="industry-error">{error}</p> : null}

            <div className="industry-action-row">
              <button type="button" className="industry-primary-button" onClick={handleGenerate}>
                Generate Customer ID
              </button>
              <button type="button" className="industry-secondary-button" onClick={handleContinueGenerated}>
                Open Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <form className="industry-form-block" onSubmit={handleRegularCustomerSubmit}>
            <label className="industry-form-label">
              <span>Customer ID</span>
              <input type="text" value={customerId} onChange={(event) => setCustomerId(event.target.value)} placeholder={`Example: ${meta.customerPrefix}-100001`} />
            </label>
            {error ? <p className="industry-error">{error}</p> : null}
            <button type="submit" className="industry-primary-button full-width">
              Validate & Open Dashboard <ArrowRight size={16} />
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
