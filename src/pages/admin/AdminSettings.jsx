import { useState } from 'react';
import { clearRegisteredCustomers } from '../../utils/customerUtils.js';

export default function AdminSettings() {
  const [status, setStatus] = useState('');

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to reset market customer registrations?');
    if (!confirmed) return;

    clearRegisteredCustomers();
    setStatus('Market customer registrations have been reset successfully.');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">Settings</p>
          <h2>Admin Settings</h2>
        </div>
      </div>

      <div className="admin-panel admin-settings-panel">
        <h3>Market Data Controls</h3>
        <p>Reset the registered customer list without altering the original 1000 synthetic market customer dataset.</p>
        <button type="button" className="admin-danger-button" onClick={handleReset}>
          Reset Market Data
        </button>
        {status && <p className="admin-status-message">{status}</p>}
      </div>
    </div>
  );
}
