// All dashboard values are local portfolio sample data; no API or database is used.
export const kpis = [
  {
    label: 'Total Customers',
    value: '50,000',
    note: 'Active customer base',
    tone: 'positive',
    icon: 'customers',
  },
  {
    label: 'Churn Rate',
    value: '18.7%',
    note: 'Compared with last month',
    tone: 'positive',
    icon: 'churn',
  },
  {
    label: 'High Risk Customers',
    value: '4,820',
    note: 'Customers requiring attention',
    tone: 'warning',
    icon: 'risk',
  },
  {
    label: 'Revenue at Risk',
    value: '₹2.4 Cr',
    note: 'Estimated revenue exposure',
    tone: 'critical',
    icon: 'revenue',
  },
];

export const monthlyChurn = [
  { month: 'April', churn: 14 },
  { month: 'May', churn: 15 },
  { month: 'June', churn: 16 },
  { month: 'July', churn: 17 },
  { month: 'August', churn: 18 },
  { month: 'September', churn: 18.7 },
];

export const riskDistribution = [
  { name: 'Low Risk', value: 55, color: '#218777' },
  { name: 'Medium Risk', value: 25, color: '#e4a844' },
  { name: 'High Risk', value: 20, color: '#d96d57' },
];

export const customerSegments = [
  { name: 'Loyal Customers', count: '12,500', tone: 'loyal', icon: 'loyal' },
  { name: 'High Value', count: '8,200', tone: 'value', icon: 'value' },
  { name: 'At Risk', count: '4,820', tone: 'risk', icon: 'risk' },
  { name: 'Lost Customers', count: '3,100', tone: 'lost', icon: 'lost' },
];

export const customers = [
  { id: 'CUST-1024', name: 'Rahul Sharma', initials: 'RS', lastPurchase: '95 days ago', orders: 8, value: '₹24,500', probability: 87, risk: 'High' },
  { id: 'CUST-1087', name: 'Priya Menon', initials: 'PM', lastPurchase: '72 days ago', orders: 4, value: '₹18,900', probability: 81, risk: 'High' },
  { id: 'CUST-1142', name: 'Arjun Kapoor', initials: 'AK', lastPurchase: '61 days ago', orders: 6, value: '₹32,750', probability: 76, risk: 'High' },
  { id: 'CUST-1206', name: 'Sneha Iyer', initials: 'SI', lastPurchase: '44 days ago', orders: 11, value: '₹46,200', probability: 62, risk: 'Medium' },
  { id: 'CUST-1289', name: 'Vikram Desai', initials: 'VD', lastPurchase: '37 days ago', orders: 5, value: '₹21,400', probability: 48, risk: 'Medium' },
  { id: 'CUST-1315', name: 'Ananya Rao', initials: 'AR', lastPurchase: '12 days ago', orders: 16, value: '₹68,900', probability: 24, risk: 'Low' },
];

export const pages = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Customer Prediction', icon: 'prediction' },
  { label: 'Customer Analytics', icon: 'analytics' },
  { label: 'Segmentation', icon: 'segments' },
  { label: 'At-Risk Customers', icon: 'risk' },
  { label: 'Model Performance', icon: 'model' },
  { label: 'Settings', icon: 'settings' },
];