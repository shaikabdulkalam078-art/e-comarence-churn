import { IndianRupee, ShieldAlert, UsersRound, Activity } from 'lucide-react';

const icons = {
  customers: UsersRound,
  churn: Activity,
  risk: ShieldAlert,
  revenue: IndianRupee,
};

export default function KpiCard({ item }) {
  const Icon = icons[item.icon];

  return (
    <article className={`kpi-card tone-${item.tone}`}>
      <div className="kpi-card-top">
        <span className="kpi-label">{item.label}</span>
        <span className="kpi-icon"><Icon size={18} strokeWidth={1.9} /></span>
      </div>
      <div className="kpi-value">{item.value}</div>
      <p className="kpi-note">{item.note}</p>
    </article>
  );
}