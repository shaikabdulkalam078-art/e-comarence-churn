import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header({ pageTitle, searchValue, onSearchChange, onMenuClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-title-group">
        <button className="icon-button menu-button" aria-label="Open navigation" onClick={onMenuClick}>
          <Menu size={21} />
        </button>
        <div>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{pageTitle}</strong></div>
          <h1>{pageTitle}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="search-field">
          <Search size={17} />
          <input
            type="search"
            aria-label="Search customers"
            placeholder="Search customers..."
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="notification-wrap">
          <button
            className={`icon-button notification-button${showNotifications ? ' pressed' : ''}`}
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((visible) => !visible)}
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>
          {showNotifications && (
            <div className="notification-popover">
              <div className="popover-heading"><strong>Notifications</strong><span>2 new</span></div>
              <div className="notification-item"><span className="notification-symbol warning-symbol">!</span><div><strong>Risk threshold reached</strong><p>312 customers moved to high risk today.</p><small>24 min ago</small></div></div>
              <div className="notification-item"><span className="notification-symbol success-symbol">✓</span><div><strong>Model refresh complete</strong><p>Latest predictions are ready to review.</p><small>2 hours ago</small></div></div>
            </div>
          )}
        </div>

        <div className="profile-divider" />
        <button
          className="profile-button"
          aria-label="User profile menu"
          aria-expanded={showProfileMenu}
          onClick={() => setShowProfileMenu((visible) => !visible)}
        >
          <span className="profile-avatar">AS</span>
          <span className="profile-copy"><strong>Arjun Shah</strong><small>Admin</small></span>
          <ChevronDown size={15} />
        </button>
        {showProfileMenu && <div className="profile-menu"><button onClick={onLogout}>Sign out</button></div>}
      </div>
    </header>
  );
}