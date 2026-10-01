import { ArrowRight, IndianRupee, ShieldAlert, UserRoundSearch, UsersRound } from 'lucide-react';

const icons = {
  loyal: UsersRound,
  value: IndianRupee,
  risk: ShieldAlert,
  lost: UserRoundSearch,
};

export default function SegmentCard({ segment, onClick }) {
  const Icon = icons[segment.icon];

  return (
    <article
      className={`segment-card segment-${segment.tone}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <span className="segment-icon"><Icon size={18} strokeWidth={1.9} /></span>
      <div className="segment-name">{segment.name}</div>
      <div className="segment-count"><strong>{segment.count}</strong><span>customers</span></div>
      <div className="segment-card-action"><span>View segment</span><ArrowRight size={12} /></div>
    </article>
  );
}