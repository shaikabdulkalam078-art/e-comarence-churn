import { ArrowUpRight, BrainCircuit, ChartNoAxesCombined, CircleHelp, Layers3, Settings, ShieldAlert, UserRoundSearch } from 'lucide-react';

const pageDetails = {
  'Customer Prediction': { icon: UserRoundSearch, eyebrow: 'PREDICTION WORKSPACE', description: 'Score a customer profile and understand the signals behind their churn risk.', metric: '4,820', metricLabel: 'customers currently flagged as high risk' },
  'Customer Analytics': { icon: ChartNoAxesCombined, eyebrow: 'CUSTOMER INTELLIGENCE', description: 'Explore retention patterns, purchase behavior, and customer lifetime value.', metric: '50,000', metricLabel: 'customer profiles available for analysis' },
  Segmentation: { icon: Layers3, eyebrow: 'AUDIENCE GROUPS', description: 'Understand the customer groups shaping your retention strategy.', metric: '4', metricLabel: 'behavior-based customer segments' },
  'At-Risk Customers': { icon: ShieldAlert, eyebrow: 'RETENTION PRIORITY', description: 'Review customers with the highest predicted likelihood of leaving.', metric: '4,820', metricLabel: 'customers need a retention touchpoint' },
  'Model Performance': { icon: BrainCircuit, eyebrow: 'MODEL MONITORING', description: 'Track model quality and keep churn predictions trustworthy.', metric: '94.2%', metricLabel: 'current model accuracy' },
  Settings: { icon: Settings, eyebrow: 'WORKSPACE PREFERENCES', description: 'Manage your workspace profile and notification preferences.', metric: 'IST (UTC+5:30)', metricLabel: 'workspace time zone' },
};

export default function PlaceholderPage({ pageTitle, onNavigate }) {
  const details = pageDetails[pageTitle];
  const Icon = details.icon;

  return (
    <div className="placeholder-content">
      <div className="eyebrow"><span className="live-pulse" /> {details.eyebrow}</div>
      <section className="placeholder-panel">
        <div className="placeholder-icon"><Icon size={23} /></div>
        <div className="placeholder-copy">
          <span className="placeholder-kicker">{pageTitle}</span>
          <h2>Workspace ready for your next question.</h2>
          <p>{details.description}</p>
          <div className="placeholder-metric"><strong>{details.metric}</strong><span>{details.metricLabel}</span></div>
          <div className="placeholder-note"><CircleHelp size={16} /><span>This section is a UI preview. Connect your analytics workflow here when ready.</span></div>
        </div>
        <div className="placeholder-side-mark"><Icon size={86} strokeWidth={1} /><span>CHURNIQ / INTELLIGENCE</span></div>
      </section>
      <button className="text-button placeholder-back" onClick={() => onNavigate('Dashboard')}>Back to dashboard <ArrowUpRight size={15} /></button>
    </div>
  );
}