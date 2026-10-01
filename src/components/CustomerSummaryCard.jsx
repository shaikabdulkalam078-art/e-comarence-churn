export default function CustomerSummaryCard({ icon: Icon, label, value, note, tone = 'blue' }) {
  return (
    <article className={`customer-summary-card tone-${tone}`}>
      <div className="customer-summary-heading"><span>{label}</span><span className="customer-summary-icon"><Icon size={17} /></span></div>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </article>
  );
}