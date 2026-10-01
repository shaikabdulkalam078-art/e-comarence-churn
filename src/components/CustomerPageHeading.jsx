export default function CustomerPageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="customer-page-heading">
      <div>
        {eyebrow && <span className="customer-page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}