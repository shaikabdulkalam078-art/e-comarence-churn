import { useEffect, useState } from 'react';
import { defaultSettings } from '../data/mockData.js';

const storageKey = 'churniq-settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const persisted = localStorage.getItem(storageKey);
    return persisted ? JSON.parse(persisted) : defaultSettings;
  });
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const isDark = settings.dashboardPreferences.theme === 'dark' || (settings.dashboardPreferences.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [settings.dashboardPreferences.theme]);

  const updateNotification = (key, value) => {
    setSettings((current) => ({ ...current, notifications: { ...current.notifications, [key]: value } }));
  };

  const updateThreshold = (key, value) => {
    setSettings((current) => ({ ...current, thresholds: { ...current.thresholds, [key]: Number(value) } }));
  };

  const saveSettings = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setSavedMessage('Settings saved successfully');
    window.setTimeout(() => setSavedMessage(''), 1800);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
    setSavedMessage('Settings reset');
  };

  return (
    <div className="page-shell settings-page">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> WORKSPACE PREFERENCES</div>
          <h2>Settings</h2>
          <p>Configure your workspace profile, notifications, and risk thresholds.</p>
        </div>
      </div>

      {savedMessage && <div className="toast-banner">{savedMessage}</div>}

      <div className="settings-grid">
        <div className="detail-card">
          <h3>Profile</h3>
          <div className="form-grid compact-form">
            <label className="field"><span>Name</span><input value={settings.profile.name} onChange={(event) => setSettings((current) => ({ ...current, profile: { ...current.profile, name: event.target.value } }))} /></label>
            <label className="field"><span>Email</span><input value={settings.profile.email} onChange={(event) => setSettings((current) => ({ ...current, profile: { ...current.profile, email: event.target.value } }))} /></label>
            <label className="field"><span>Role</span><input value={settings.profile.role} onChange={(event) => setSettings((current) => ({ ...current, profile: { ...current.profile, role: event.target.value } }))} /></label>
          </div>
        </div>

        <div className="detail-card">
          <h3>Notifications</h3>
          <div className="toggle-list">
            <label className="toggle-row"><span>Email Alerts</span><input type="checkbox" checked={settings.notifications.emailAlerts} onChange={(event) => updateNotification('emailAlerts', event.target.checked)} /></label>
            <label className="toggle-row"><span>High Risk Customer Alerts</span><input type="checkbox" checked={settings.notifications.highRiskAlerts} onChange={(event) => updateNotification('highRiskAlerts', event.target.checked)} /></label>
            <label className="toggle-row"><span>Weekly Reports</span><input type="checkbox" checked={settings.notifications.weeklyReports} onChange={(event) => updateNotification('weeklyReports', event.target.checked)} /></label>
          </div>
        </div>

        <div className="detail-card">
          <h3>Dashboard Preferences</h3>
          <div className="form-grid compact-form">
            <label className="field"><span>Theme</span>
              <select value={settings.dashboardPreferences.theme} onChange={(event) => setSettings((current) => ({ ...current, dashboardPreferences: { ...current.dashboardPreferences, theme: event.target.value } }))}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>
            <label className="field"><span>Date Range</span>
              <select value={settings.dashboardPreferences.dateRange} onChange={(event) => setSettings((current) => ({ ...current, dashboardPreferences: { ...current.dashboardPreferences, dateRange: event.target.value } }))}>
                <option value="6m">Last 6 Months</option>
                <option value="12m">Last 12 Months</option>
                <option value="ytd">This Year</option>
              </select>
            </label>
          </div>
        </div>

        <div className="detail-card">
          <h3>Risk Thresholds</h3>
          <div className="risk-thresholds">
            <label><span>Low Risk</span><input type="number" value={settings.thresholds.low} onChange={(event) => updateThreshold('low', event.target.value)} /></label>
            <label><span>Medium Risk</span><input type="number" value={settings.thresholds.medium} onChange={(event) => updateThreshold('medium', event.target.value)} /></label>
            <label><span>High Risk</span><input type="number" value={settings.thresholds.high} onChange={(event) => updateThreshold('high', event.target.value)} /></label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button type="button" className="primary-button" onClick={saveSettings}>Save Settings</button>
        <button type="button" className="secondary-button" onClick={resetSettings}>Reset Settings</button>
      </div>
    </div>
  );
}
