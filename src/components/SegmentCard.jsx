import { IndianRupee, ShieldAlert, UserRoundSearch, UsersRound } from 'lucide-react';

const icons = {
  loyal: UsersRound,
  value: IndianRupee,
  risk: ShieldAlert,
  lost: UserRoundSearch,
};

export default function SegmentCard({ segment }) {
  const Icon = icons[segment.icon];

  return (
    <article className={`segment-card segment-${segment.tone}`}>
      <span className="segment-icon"><Icon size={18} strokeWidth={1.9} /></span>
      <div className="segment-name">{segment.name}</div>
      <div className="segment-count"><strong>{segment.count}</strong><span>customers</span></div>
    </article>
  );
}