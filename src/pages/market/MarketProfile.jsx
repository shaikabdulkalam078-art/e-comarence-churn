import { PencilLine } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { formatCustomerDate } from '../../utils/customerUtils.js';

export default function MarketProfile() {
  const { customer } = useOutletContext();

  return (
    <div className="market-page-shell profile-page-shell">
      <div className="market-page-header">
        <div>
          <span className="market-kicker">My profile</span>
          <h1>Customer Profile</h1>
        </div>
        <button type="button" className="panel-button">Edit Profile</button>
      </div>

      <div className="market-panel profile-panel">
        <div className="profile-identity">
          <div className="profile-avatar-circle">{customer.name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase()}</div>
          <div>
            <h2>{customer.name}</h2>
            <p>{customer.customerId}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div><span>Customer Name</span><strong>{customer.name}</strong></div>
          <div><span>Customer ID</span><strong>{customer.customerId}</strong></div>
          <div><span>Email</span><strong>{customer.email}</strong></div>
          <div><span>Phone</span><strong>{customer.phone}</strong></div>
          <div><span>Location</span><strong>{customer.location}</strong></div>
          <div><span>Age</span><strong>{customer.age}</strong></div>
          <div><span>Signup Date</span><strong>{formatCustomerDate(customer.signupDate)}</strong></div>
          <div><span>Preferred Category</span><strong>{customer.preferredCategory}</strong></div>
        </div>
      </div>

      <div className="profile-edit-box">
        <PencilLine size={16} />
        <span>Edit Profile</span>
      </div>
    </div>
  );
}
