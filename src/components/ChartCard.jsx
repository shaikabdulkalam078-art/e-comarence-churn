import { MoreHorizontal } from 'lucide-react';

export default function ChartCard({ title, subtitle, className = '', children, action = true }) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action && <button className="icon-button chart-menu" aria-label={`${title} options`}><MoreHorizontal size={20} /></button>}
      </div>
      {children}
    </section>
  );
}