import { useMemo, useState } from 'react';
import { Activity, BadgeAlert, Gauge, RefreshCw } from 'lucide-react';

const formDefaults = {
  customerId: 'CUS-10021',
  age: 32,
  gender: 'Female',
  tenure: 18,
  monthlySpend: 7200,
  totalOrders: 11,
  averageOrderValue: 680,
  daysSinceLastPurchase: 42,
  numberOfReturns: 3,
  supportTickets: 1,
  discountUsage: 68,
  paymentMethod: 'UPI',
  preferredCategory: 'Accessories',
  loginFrequency: 4,
};

function riskDescription(probability) {
  if (probability <= 39) return { label: 'Low Risk', color: 'low' };
  if (probability <= 69) return { label: 'Medium Risk', color: 'medium' };
  return { label: 'High Risk', color: 'high' };
}

export default function PredictionPage() {
  const [values, setValues] = useState(formDefaults);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const probability = useMemo(() => {
    if (!result) return 0;
    return Number(result.churnProbability);
  }, [result]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: name === 'gender' || name === 'paymentMethod' || name === 'preferredCategory' ? value : Number(value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      const score = Math.min(
        97,
        Math.max(
          12,
          values.daysSinceLastPurchase * 0.8 +
            values.numberOfReturns * 4.2 +
            values.supportTickets * 8 +
            (values.discountUsage > 70 ? 7 : 2) +
            (values.loginFrequency < 3 ? 10 : 0) +
            (values.totalOrders < 6 ? 18 : 0),
        ),
      );

      const churnProbability = Number(score.toFixed(1));
      const risk = riskDescription(churnProbability);

      setResult({
        churnProbability,
        risk,
        factors: [
          values.daysSinceLastPurchase > 30 ? 'Long time since last purchase' : 'Recent purchase activity',
          values.totalOrders < 6 ? 'Low purchase frequency' : 'Healthy order cadence',
          values.numberOfReturns > 2 ? 'High return rate' : 'Low return activity',
        ],
        action: churnProbability > 69 ? 'Send personalized retention offer' : churnProbability > 39 ? 'Provide loyalty discount' : 'Continue proactive engagement',
      });
      setLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setValues(formDefaults);
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> CUSTOMER HEALTH MODEL</div>
          <h2>Customer Churn Prediction</h2>
          <p>Predict the probability that a customer will churn.</p>
        </div>
      </div>

      <div className="prediction-grid">
        <form className="detail-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            {[
              ['customerId', 'Customer ID'],
              ['age', 'Age'],
              ['gender', 'Gender'],
              ['tenure', 'Tenure'],
              ['monthlySpend', 'Monthly Spend'],
              ['totalOrders', 'Total Orders'],
              ['averageOrderValue', 'Average Order Value'],
              ['daysSinceLastPurchase', 'Days Since Last Purchase'],
              ['numberOfReturns', 'Number of Returns'],
              ['supportTickets', 'Support Tickets'],
              ['discountUsage', 'Discount Usage'],
              ['paymentMethod', 'Payment Method'],
              ['preferredCategory', 'Preferred Category'],
              ['loginFrequency', 'Login Frequency'],
            ].map(([name, label]) => (
              <label key={name} className="field">
                <span>{label}</span>
                {name === 'gender' ? (
                  <select name={name} value={values[name]} onChange={handleChange}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                ) : name === 'paymentMethod' ? (
                  <select name={name} value={values[name]} onChange={handleChange}>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                ) : name === 'preferredCategory' ? (
                  <select name={name} value={values[name]} onChange={handleChange}>
                    <option value="Accessories">Accessories</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home">Home</option>
                  </select>
                ) : (
                  <input type="number" name={name} value={values[name]} onChange={handleChange} />
                )}
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? <><RefreshCw size={16} className="spin" /> Predicting...</> : <>Predict Churn <Activity size={16} /></>}
            </button>
            <button type="button" className="secondary-button" onClick={resetForm}>Reset Form</button>
          </div>
        </form>

        <div className="detail-card result-card">
          {result ? (
            <>
              <div className="inspection-card">
                <span className="eyebrow muted">PREDICTION RESULT</span>
                <div className="result-row">
                  <div>
                    <div className="score-label">Churn Probability</div>
                    <div className="score-number">{result.churnProbability.toFixed(1)}%</div>
                  </div>
                  <span className={`risk-badge risk-${result.risk.color}`}>{result.risk.label}</span>
                </div>
              </div>

              <div className="gauge-wrap">
                <div className="gauge-track">
                  <div className="gauge-fill" style={{ width: `${probability}%` }} />
                </div>
                <div className="gauge-labels">
                  <span>0%</span>
                  <span>{probability.toFixed(0)}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="info-panel">
                <h3>Key Risk Factors</h3>
                <ul>
                  {result.factors.map((factor) => <li key={factor}>{factor}</li>)}
                </ul>
              </div>

              <div className="info-panel">
                <h3>Recommended Action</h3>
                <p>{result.action}</p>
              </div>
            </>
          ) : (
            <div className="empty-state-box">
              <BadgeAlert size={32} />
              <p>Complete the customer profile and run a prediction to view churn risk.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
