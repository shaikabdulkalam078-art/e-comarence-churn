import { Bell, ChevronDown, Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customers, defaultNotifications } from '../data/mockData.js';

export default function Header({ pageTitle, searchValue, onSearchChange, onMenuClick, onLogout }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      setResults([]);
      return;
    }

    const matches = customers.filter((customer) =>
      [customer.customerId, customer.name, customer.email, customer.segment, customer.risk, customer.location]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );

    setResults(matches.slice(0, 6));
  }, [searchValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setResults([]);
        onSearchChange('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  const handleResultClick = (customer) => {
    onSearchChange('');
    setResults([]);
    navigate(`/customer/${customer.customerId}`);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Log out of ChurnIQ?')) {
      onLogout();
    }
  };

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
        <div className="search-wrapper">
          <label className="search-field" aria-label="Global customer search">
            <Search size={17} />
            <input
              ref={inputRef}
              type="search"
              aria-label="Search customers"
              placeholder="Search customers, orders, segments..."
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </label>

          {searchValue && (
            <div className="search-results" role="listbox" aria-label="Search results">
              {results.length ? (
                results.map((customer) => (
                  <button key={customer.customerId} type="button" className="search-result-item" onClick={() => handleResultClick(customer)}>
                    <div>
                      <strong>{customer.name}</strong>
                      <small>{customer.customerId}</small>
                    </div>
                    <span>{customer.risk}</span>
                  </button>
                ))
              ) : (
                <div className="no-search-results">No matching customers found</div>
              )}
            </div>
          )}
        </div>

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
              <div className="popover-heading">
                <strong>Notifications</strong>
                <button type="button" className="text-button small-button" onClick={() => setShowNotifications(false)}>Mark all as read</button>
              </div>
              {defaultNotifications.map((item) => (
                <div key={item.id} className="notification-item">
                  <span className={`notification-symbol ${item.type === 'warning' ? 'warning-symbol' : 'success-symbol'}`}>
                    {item.type === 'warning' ? '!' : '✓'}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    <small>{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-divider" />
        <div className="profile-menu-wrap">
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

          {showProfileMenu && (
            <div className="profile-menu">
              <button type="button" onClick={() => navigate('/customer/CUS-10021')}>Profile</button>
              <button type="button" onClick={() => navigate('/settings')}>Account Settings</button>
              <button type="button" onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}