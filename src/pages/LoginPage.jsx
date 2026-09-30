import { useState } from 'react';
import { ArrowRight, Gauge, LockKeyhole, Phone, UserRound } from 'lucide-react';

export default function LoginPage({ onContinue }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-label="ChurnIQ sign in">
        <div className="login-form-side">
          <a className="login-brand" href="#home" aria-label="ChurnIQ home">
            <span className="login-brand-mark"><Gauge size={21} strokeWidth={2.3} /></span>
            <span><strong>Churn<span>IQ</span></strong><small>E-Commerce Intelligence</small></span>
          </a>

          <div className="login-form-content">
            <span className="login-overline">RETENTION INTELLIGENCE / DEMO</span>
            <h1>Keep your best customers close.</h1>
            <p className="login-intro">Spot churn signals early and focus your next retention move.</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="login-name">Your name</label>
              <div className="login-input-wrap">
                <UserRound size={17} aria-hidden="true" />
                <input
                  id="login-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <label htmlFor="login-phone">Mobile number</label>
              <div className="login-input-wrap phone-input-wrap">
                <Phone size={17} aria-hidden="true" />
                <span className="country-code">+91</span>
                <span className="phone-divider" />
                <input
                  id="login-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  pattern="(?:[0-9]{5} ?[0-9]{5})"
                  maxLength={11}
                  title="Enter a 10-digit Indian mobile number."
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/[^0-9 ]/g, ''))}
                  required
                />
              </div>

              <button className="login-submit" type="submit">Open demo dashboard <ArrowRight size={17} /></button>
            </form>

            <div className="login-privacy"><LockKeyhole size={14} /><span>Demo access only. Your details are not stored.</span></div>
          </div>

          <div className="login-legal">© 2026 ChurnIQ <span>·</span> Customer intelligence</div>
        </div>

        <aside className="login-showcase" aria-label="Dashboard preview">
          <div className="showcase-topline"><span className="showcase-dot" /> CUSTOMER HEALTH / OVERVIEW</div>
          <div className="showcase-copy">
            <span className="showcase-eyebrow">THE CUSTOMER PICTURE, CLEARER</span>
            <h2>Turn quiet signals into your next best action.</h2>
            <p>See risk, value, and engagement patterns in one focused workspace.</p>
          </div>

          <div className="preview-panel">
            <div className="preview-panel-heading"><span>Monthly churn trend</span><span>LAST 6 MONTHS</span></div>
            <div className="preview-chart" aria-hidden="true">
              <span style={{ height: '34%' }} /><span style={{ height: '43%' }} /><span style={{ height: '53%' }} />
              <span style={{ height: '64%' }} /><span style={{ height: '76%' }} /><span style={{ height: '84%' }} />
              <span className="preview-chart-line" />
            </div>
            <div className="preview-months"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div>
            <div className="preview-stats">
              <div><span>CHURN RATE</span><strong>18.7%</strong><small>Current month</small></div>
              <div><span>HIGH RISK</span><strong>4,820</strong><small>Customers to review</small></div>
            </div>
          </div>
          <div className="showcase-footer"><span>CHURNIQ</span><span>MOCK DATA / 2026</span></div>
        </aside>
      </section>
    </main>
  );
}