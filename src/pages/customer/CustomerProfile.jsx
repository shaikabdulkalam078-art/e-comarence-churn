import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import CustomerPageHeading from '../../components/CustomerPageHeading.jsx';
import { formatCustomerDate } from '../../utils/customerUtils.js';

const editableFields = [
  { label: 'Full name', name: 'name', type: 'text' },
  { label: 'Email address', name: 'email', type: 'email' },
  { label: 'Phone number', name: 'phone', type: 'tel' },
  { label: 'Location', name: 'location', type: 'text' },
];

export default function CustomerProfile() {
  const { customer, updateCustomer } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(() => ({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    location: customer.location,
  }));

  const saveProfile = (event) => {
    event.preventDefault();
    updateCustomer(form);
    setIsEditing(false);
    setSaved(true);
  };

  const cancelEdit = () => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, location: customer.location });
    setIsEditing(false);
  };

  return (
    <div className="customer-page-content">
      <CustomerPageHeading
        eyebrow="YOUR ACCOUNT"
        title="My Profile"
        description="Your ChurnIQ profile details and shopping preferences."
        action={!isEditing && (
          <button className="customer-secondary-button" type="button" onClick={() => { setSaved(false); setIsEditing(true); }}>
            <Pencil size={15} /> Edit Profile
          </button>
        )}
      />

      {saved && <p className="customer-save-message" role="status"><Check size={15} /> Profile changes saved on this device.</p>}

      {isEditing ? (
        <form className="customer-content-panel customer-profile-edit-form" onSubmit={saveProfile}>
          {editableFields.map(({ label, name, type }) => (
            <label className="customer-form-field" key={name}>
              <span>{label}</span>
              <input
                type={type}
                value={form[name]}
                required
                onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))}
              />
            </label>
          ))}
          <div className="customer-form-actions">
            <button className="customer-secondary-button" type="button" onClick={cancelEdit}><X size={15} /> Cancel</button>
            <button className="customer-action-button" type="submit"><Check size={15} /> Save changes</button>
          </div>
        </form>
      ) : (
        <section className="customer-content-panel customer-profile-panel" aria-label="Customer profile details">
          <div className="customer-profile-card-heading">
            <span className="customer-large-avatar">{customer.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</span>
            <div><h2>{customer.name}</h2><span>{customer.customerId}</span></div>
          </div>
          <div className="customer-profile-details">
            <div><span>Email address</span><strong>{customer.email}</strong></div>
            <div><span>Phone number</span><strong>{customer.phone}</strong></div>
            <div><span>Location</span><strong>{customer.location}</strong></div>
            <div><span>Age</span><strong>{customer.age}</strong></div>
            <div><span>Gender</span><strong>{customer.gender}</strong></div>
            <div><span>Signup date</span><strong>{formatCustomerDate(customer.signupDate)}</strong></div>
            <div><span>Preferred category</span><strong>{customer.preferredCategory}</strong></div>
          </div>
          <p className="customer-demo-disclaimer">Changes are saved locally for this demo customer only.</p>
        </section>
      )}
    </div>
  );
}