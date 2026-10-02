import { useState } from 'react';
import { ArrowRight, Check, Copy, Gauge, UserPlus, UserRound, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { customers } from '../data/customers.js';
import {
  generateNextCustomerId,
  getGeneratedCustomerId,
  getCustomerProfile,
  saveCustomerProfile,
  setCurrentCustomerId,
} from '../utils/customerUtils.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [generatedId, setGeneratedId] = useState(getGeneratedCustomerId);
  const [registration, setRegistration] = useState(() => {
    const savedProfile = getCustomerProfile(getGeneratedCustomerId());
    return {
      name: savedProfile?.name || '',
      phone: savedProfile?.phone || '',
      email: savedProfile?.email || '',
      location: savedProfile?.location || '',
    };
  });
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCustomerId = (event) => {
    event?.preventDefault();
    const name = registration.name.trim();
    const phone = registration.phone.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!name) {
      setGenerationError('Please enter your name.');
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setGenerationError('Enter a valid phone number with 10 to 15 digits.');
      return;
    }

    const newId = generateNextCustomerId();
    if (!newId) {
      setGenerationError('All demo customer IDs have been assigned.');
      return;
    }

    saveCustomerProfile(newId, {
      ...registration,
      name,
      phone,
    });
    setGeneratedId(newId);
    setGenerationError('');
    setCopied(false);
  };

  const copyCustomerId = async () => {
    try {
      await navigator.clipboard.writeText(generatedId);
      setCopied(true);
    } catch {
      const temporaryInput = document.createElement('textarea');
      temporaryInput.value = generatedId;
      temporaryInput.style.position = 'fixed';
      temporaryInput.style.opacity = '0';
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      setCopied(document.execCommand('copy'));
      temporaryInput.remove();
    }
  };

  const continueWithCustomerId = (event) => {
    event.preventDefault();
    const customer = setCurrentCustomerId(customerId);
    if (!customer) {
      setError(customerId.trim()
        ? 'Customer ID not found. Please enter a valid ChurnIQ Customer ID.'
        : 'Please enter your Customer ID.');
      return;
    }

    navigate('/customer');
  };

  const continueWithGeneratedId = () => {
    if (setCurrentCustomerId(generatedId)) navigate('/customer');
  };

  return (
    <main className="welcome-page">
      <header className="welcome-header">
        <a className="welcome-brand" href="/" aria-label="ChurnIQ home">
          <span className="welcome-brand-mark"><Gauge size={20} strokeWidth={2.3} /></span>
          <span className="welcome-brand-copy"><strong>ChurnIQ</strong><small>Customer Intelligence</small></span>
        </a>
        <div className="welcome-header-actions">
          <span className="welcome-platform">Customer Intelligence Platform</span>
          <Link className="welcome-directory-link" to="/admin">Admin Dashboard</Link>
          <Link className="welcome-directory-link" to="/directory"><UsersRound size={15} /> Customer Directory <strong>{customers.length.toLocaleString('en-IN')}</strong></Link>
        </div>
      </header>

      <div className="welcome-content">
        <section className="welcome-hero">
          <span className="welcome-kicker"><span /> CUSTOMER PORTAL</span>
          <h1>Welcome to ChurnIQ</h1>
          <p className="welcome-subtitle">Smart customer intelligence for better customer relationships.</p>
          <p className="welcome-description">Access your customer profile using your ChurnIQ Customer ID.</p>
        </section>

        <section className="customer-entry-grid" aria-label="Choose how to continue">
          <article className="customer-entry-card new-customer-card">
            <div className="entry-card-heading">
              <span className="entry-card-icon"><UserPlus size={21} /></span>
              <div><span className="entry-card-label">GET STARTED</span><h2>New Customer</h2></div>
            </div>
            <p className="entry-card-description">New to ChurnIQ? Create your unique Customer ID and start your customer journey.</p>
            <div className="entry-card-action">
              {!generatedId ? (
                <form className="new-customer-registration-form" onSubmit={generateCustomerId}>
                  <span className="entry-field-label">Create your customer profile</span>
                  <div className="registration-input-grid">
                    <label className="registration-field" htmlFor="new-customer-name">
                      <span>Full name</span>
                      <input id="new-customer-name" type="text" autoComplete="name" placeholder="Your name" value={registration.name} onChange={(event) => setRegistration((current) => ({ ...current, name: event.target.value }))} required />
                    </label>
                    <label className="registration-field" htmlFor="new-customer-phone">
                      <span>Mobile number</span>
                      <input id="new-customer-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={registration.phone} onChange={(event) => setRegistration((current) => ({ ...current, phone: event.target.value }))} required />
                    </label>
                    <label className="registration-field" htmlFor="new-customer-email">
                      <span>Email <small>Optional</small></span>
                      <input id="new-customer-email" type="email" autoComplete="email" placeholder="you@example.com" value={registration.email} onChange={(event) => setRegistration((current) => ({ ...current, email: event.target.value }))} />
                    </label>
                    <label className="registration-field" htmlFor="new-customer-location">
                      <span>City <small>Optional</small></span>
                      <input id="new-customer-location" type="text" autoComplete="address-level2" placeholder="Your city" value={registration.location} onChange={(event) => setRegistration((current) => ({ ...current, location: event.target.value }))} />
                    </label>
                  </div>
                  {generationError && <p className="customer-id-error" role="alert">{generationError}</p>}
                  <button className="entry-primary-button" type="submit">
                    Generate New ID <ArrowRight size={17} />
                  </button>
                </form>
              ) : (
                <div className="generated-id-content" aria-live="polite">
                  <span className="generated-id-label">Your ChurnIQ Customer ID</span>
                  <div className="generated-id-box">
                    <strong>{generatedId}</strong>
                    <button className="copy-id-button" type="button" onClick={copyCustomerId} aria-label="Copy Customer ID">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copied ? 'Customer ID copied!' : 'Copy ID'}</span>
                    </button>
                  </div>
                  <p className="generated-id-success" role="status">Your ChurnIQ Customer ID has been created successfully.</p>
                  <p className="generated-customer-summary">{getCustomerProfile(generatedId)?.name} <span>·</span> {getCustomerProfile(generatedId)?.phone}</p>
                  <p className="generated-id-note">Please save this ID. You will use it to access your profile later.</p>
                  <button className="entry-primary-button" type="button" onClick={continueWithGeneratedId}>
                    Continue to Customer Dashboard <ArrowRight size={17} />
                  </button>
                  <button className="entry-text-button" type="button" onClick={generateCustomerId}>Generate another ID</button>
                </div>
              )}
              {generationError && <p className="customer-id-error" role="alert">{generationError}</p>}
            </div>
          </article>

          <article className="customer-entry-card regular-customer-card">
            <div className="entry-card-heading">
              <span className="entry-card-icon regular-entry-icon"><UserRound size={21} /></span>
              <div><span className="entry-card-label">WELCOME BACK</span><h2>Regular Customer</h2></div>
            </div>
            <p className="entry-card-description">Already have a ChurnIQ Customer ID? Enter your ID to continue.</p>
            <form className="entry-card-action regular-customer-form" onSubmit={continueWithCustomerId}>
              <label className="entry-field-label" htmlFor="customer-id">Customer ID</label>
              <input
                id="customer-id"
                className="customer-id-input"
                type="text"
                autoComplete="off"
                placeholder="Example: CQ-100001"
                value={customerId}
                onChange={(event) => {
                  setCustomerId(event.target.value);
                  setError('');
                }}
                aria-describedby={error ? 'customer-id-error' : undefined}
                aria-invalid={Boolean(error)}
              />
              {error && <p className="customer-id-error" id="customer-id-error" role="alert">{error}</p>}
              <button className="entry-primary-button" type="submit">
                Continue <ArrowRight size={17} />
              </button>
            </form>
          </article>
        </section>

        <p className="welcome-footnote"><span /> Your profile details are saved in this browser for this demo.</p>
      </div>
    </main>
  );
}