export default function RiskBadge({ level }) {
  return <span className={`risk-badge risk-${level.toLowerCase()}`}><span />{level}</span>;
}