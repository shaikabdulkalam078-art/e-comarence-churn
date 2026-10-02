import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setSelectedIndustry } from '../utils/industryUtils.js';

export default function IndustryCard({ industry, icon: Icon, title, description, route }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    setSelectedIndustry(industry);
    navigate(route);
  };

  return (
    <article className="industry-card">
      <div className="industry-card-top">
        <span className="industry-icon-wrap">
          <Icon size={22} />
        </span>
        <span className="industry-card-tag">Business</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" className="industry-card-button" onClick={handleExplore}>
        Explore Demo
        <ArrowRight size={16} />
      </button>
    </article>
  );
}
