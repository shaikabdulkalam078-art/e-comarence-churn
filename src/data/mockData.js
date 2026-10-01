export const pages = [
  { label: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
  { label: 'Customer Prediction', to: '/prediction', icon: 'prediction' },
  { label: 'Customer Analytics', to: '/analytics', icon: 'analytics' },
  { label: 'Segmentation', to: '/segmentation', icon: 'segments' },
  { label: 'At-Risk Customers', to: '/at-risk', icon: 'risk' },
  { label: 'Model Performance', to: '/model-performance', icon: 'model' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Total Customers', value: '50,000', note: 'Active customer base', tone: 'positive', icon: 'customers' },
  { label: 'Churn Rate', value: '18.7%', note: 'Compared with last month', tone: 'positive', icon: 'churn' },
  { label: 'High Risk Customers', value: '4,820', note: 'Customers requiring attention', tone: 'warning', icon: 'risk' },
  { label: 'Revenue at Risk', value: '₹2.4 Cr', note: 'Estimated revenue exposure', tone: 'critical', icon: 'revenue' },
];

export const monthlyChurn = [
  { month: 'Apr', churn: 14 },
  { month: 'May', churn: 15 },
  { month: 'Jun', churn: 16 },
  { month: 'Jul', churn: 17 },
  { month: 'Aug', churn: 18 },
  { month: 'Sep', churn: 18.7 },
];

export const trendingData = {
  '6m': [
    { month: 'Apr', value: 14 },
    { month: 'May', value: 15 },
    { month: 'Jun', value: 16 },
    { month: 'Jul', value: 17 },
    { month: 'Aug', value: 18 },
    { month: 'Sep', value: 18.7 },
  ],
  '12m': [
    { month: 'Jan', value: 11.2 },
    { month: 'Feb', value: 11.8 },
    { month: 'Mar', value: 12.5 },
    { month: 'Apr', value: 14 },
    { month: 'May', value: 15 },
    { month: 'Jun', value: 16 },
    { month: 'Jul', value: 17 },
    { month: 'Aug', value: 18 },
    { month: 'Sep', value: 18.7 },
    { month: 'Oct', value: 18.1 },
    { month: 'Nov', value: 17.8 },
    { month: 'Dec', value: 17.5 },
  ],
  'ytd': [
    { month: 'Jan', value: 12.3 },
    { month: 'Feb', value: 12.8 },
    { month: 'Mar', value: 13.1 },
    { month: 'Apr', value: 14 },
    { month: 'May', value: 15 },
    { month: 'Jun', value: 16 },
    { month: 'Jul', value: 17 },
    { month: 'Aug', value: 18 },
    { month: 'Sep', value: 18.7 },
  ],
};

export const riskDistribution = [
  { name: 'Low Risk', value: 55, count: 27500, color: '#218777' },
  { name: 'Medium Risk', value: 25, count: 12500, color: '#e4a844' },
  { name: 'High Risk', value: 20, count: 10000, color: '#d96d57' },
];

export const customerSegments = [
  { name: 'Loyal Customers', count: '12,500', tone: 'loyal', icon: 'loyal' },
  { name: 'High Value', count: '8,200', tone: 'value', icon: 'value' },
  { name: 'At Risk', count: '4,820', tone: 'risk', icon: 'risk' },
  { name: 'Lost Customers', count: '3,100', tone: 'lost', icon: 'lost' },
];

export const segmentOverview = [
  { segment: 'Loyal', customers: 12500, revenue: 9800000, orders: 22, churnRate: 7.4 },
  { segment: 'High Value', customers: 8200, revenue: 15300000, orders: 18, churnRate: 12.8 },
  { segment: 'At Risk', customers: 4820, revenue: 6400000, orders: 9, churnRate: 31.2 },
  { segment: 'Lost', customers: 3100, revenue: 3900000, orders: 5, churnRate: 72.1 },
  { segment: 'New Customers', customers: 5100, revenue: 2400000, orders: 4, churnRate: 18.4 },
  { segment: 'Occasional Buyers', customers: 18700, revenue: 9100000, orders: 6, churnRate: 22.7 },
];

export const defaultNotifications = [
  { id: 1, title: '5 customers entered high-risk status.', detail: 'Fresh churn signals detected in the last 24 hours.', time: '5 min ago', type: 'warning' },
  { id: 2, title: 'Revenue at risk increased by ₹12.4L.', detail: 'The highest-risk segments are trending down.', time: '1 hour ago', type: 'success' },
  { id: 3, title: 'Model performance report is ready.', detail: 'Random Forest performance snapshot has been refreshed.', time: '3 hours ago', type: 'success' },
  { id: 4, title: 'Weekly churn report generated.', detail: 'Retention summary is available for your team.', time: 'Yesterday', type: 'warning' },
];

export const modelMetrics = [
  { name: 'Logistic Regression', accuracy: 86.7, precision: 84.5, recall: 82.1, f1: 83.3, rocAuc: 88.4, version: 'v1.9', trained: '2026-09-02', dataset: '1.4M records' },
  { name: 'Random Forest', accuracy: 91.4, precision: 89.7, recall: 86.9, f1: 88.3, rocAuc: 93.1, version: 'v2.4', trained: '2026-09-25', dataset: '1.6M records' },
  { name: 'Support Vector Machine', accuracy: 88.9, precision: 87.4, recall: 83.8, f1: 85.5, rocAuc: 90.6, version: 'v1.7', trained: '2026-08-28', dataset: '1.3M records' },
];

export const defaultSettings = {
  profile: { name: 'Arjun Shah', email: 'arjun@churniq.ai', role: 'Head of Retention' },
  notifications: { emailAlerts: true, highRiskAlerts: true, weeklyReports: false },
  dashboardPreferences: { theme: 'light', dateRange: '6m' },
  thresholds: { low: 39, medium: 69, high: 100 },
};

const customerNames = [
  'Rahul Sharma','Priya Reddy','Arjun Kumar','Sneha Rao','Vikram Iyer','Ananya Nair','Karan Mehta','Meera Sethi','Rohan Kapoor','Ishita Singh',
  'Amit Verma','Neha Desai','Siddharth Pillai','Pooja Shah','Harsh Malhotra','Nisha Gupta','Abhishek Joshi','Divya Banerjee','Rohit Menon','Simran Kaur',
  'Aditya Nair','Tanvi Bhatia','Manav Chawla','Kavya Sinha','Yash Jain','Sara Ali','Aakash Srivastava','Swati Arora','Dev Patel','Aditi Rao',
  'Nitin Kapoor','Mitali Tiwari','Ritesh Kumar','Supriya Das','Vivek Sharma','Shreya Reddy','Gaurav Mehra','Anjali Walia','Deepak Sen','Monica Das',
  'Sagar Malik','Tejaswini Rao','Krishna Nair','Pallavi Roy','Varun Singh','Lina George','Ashok Kumar','Shruti Jain','Farhan Siddiqui','Bhavna Khanna'
];

const segmentPool = ['Loyal', 'High Value', 'At Risk', 'Occasional Buyers', 'New Customers', 'Lost'];
const cityPool = ['Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Chennai', 'Jaipur', 'Kolkata'];
const genderPool = ['Male', 'Female'];

export const customers = customerNames.map((name, index) => {
  const age = 22 + ((index * 7) % 38);
  const totalOrders = 4 + ((index * 3) % 28);
  const revenue = 12000 + ((index * 2875) % 125000);
  const riskRoll = (index % 5);
  const churnProbability = index < 12 ? 72 + ((index * 6) % 23) : index < 24 ? 43 + ((index * 5) % 34) : index < 38 ? 21 + ((index * 4) % 26) : 15 + ((index * 3) % 22);
  const segment = segmentPool[index % segmentPool.length];
  const risk = churnProbability > 69 ? 'High' : churnProbability > 39 ? 'Medium' : 'Low';
  const daysSincePurchase = index % 10 === 0 ? 2 : index % 6 === 0 ? 7 : index % 4 === 0 ? 14 : 21 + (index % 18);
  const lastPurchase = `${daysSincePurchase} days ago`;

  return {
    customerId: `CUS-${10000 + index}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
    phone: `+91 ${90000 + index * 273}`.slice(0, 14),
    age,
    gender: genderPool[index % genderPool.length],
    location: cityPool[index % cityPool.length],
    customerSince: `202${index % 4 + 1}-0${(index % 9) + 1}-12`,
    segment,
    lastPurchase,
    totalOrders,
    totalRevenue: revenue,
    totalRevenueLabel: `₹${(revenue / 100000).toFixed(2)}L`,
    averageOrderValue: Math.round(revenue / totalOrders),
    daysSincePurchase,
    returns: 1 + (index % 6),
    supportTickets: (index % 4),
    monthlySpend: 2100 + ((index * 379) % 8600),
    churnProbability,
    risk,
    customerValue: `₹${(revenue / 1000).toFixed(0)}K`,
    initials: name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(),
    orderIds: [`ORD-${1000 + index}`, `ORD-${1100 + index}`],
    orderCount: totalOrders,
    returnRate: ((1 + (index % 6)) / (totalOrders || 1) * 100).toFixed(1),
    recommendedAction: risk === 'High' ? 'Send personalized retention offer' : risk === 'Medium' ? 'Share loyalty discount' : 'Continue proactive engagement',
    riskFactors: ['Long time since last purchase', 'Low purchase frequency', 'High return rate']
  };
});

export const recentAtRiskCustomers = customers
  .filter((customer) => customer.risk === 'High')
  .slice(0, 6)
  .map((customer) => ({
    ...customer,
    customerValue: customer.customerValue,
    risk: customer.risk,
    probability: customer.churnProbability,
  }));

export const analyticsData = {
  customerGrowth: [
    { month: 'Jan', customers: 42000 },
    { month: 'Feb', customers: 43600 },
    { month: 'Mar', customers: 44200 },
    { month: 'Apr', customers: 45800 },
    { month: 'May', customers: 46900 },
    { month: 'Jun', customers: 47500 },
    { month: 'Jul', customers: 48100 },
    { month: 'Aug', customers: 48900 },
    { month: 'Sep', customers: 50000 },
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 78 },
    { month: 'Feb', revenue: 81 },
    { month: 'Mar', revenue: 84 },
    { month: 'Apr', revenue: 88 },
    { month: 'May', revenue: 92 },
    { month: 'Jun', revenue: 96 },
    { month: 'Jul', revenue: 101 },
    { month: 'Aug', revenue: 108 },
    { month: 'Sep', revenue: 116 },
  ],
  orderFrequency: [
    { bucket: '1-3', value: 22 },
    { bucket: '4-6', value: 34 },
    { bucket: '7-9', value: 18 },
    { bucket: '10+', value: 26 },
  ],
  lifetimeValue: [
    { segment: 'Loyal', value: 42 },
    { segment: 'High Value', value: 30 },
    { segment: 'At Risk', value: 18 },
    { segment: 'Occasional', value: 10 },
  ],
  churnByTenure: [
    { tenure: '0-6m', value: 12 },
    { tenure: '6-12m', value: 18 },
    { tenure: '1-2y', value: 24 },
    { tenure: '2-4y', value: 31 },
    { tenure: '4y+', value: 40 },
  ],
};

export const modelPerformance = {
  rocCurve: [
    { fpr: 0, tpr: 0 },
    { fpr: 0.1, tpr: 0.55 },
    { fpr: 0.2, tpr: 0.78 },
    { fpr: 0.45, tpr: 0.9 },
    { fpr: 0.7, tpr: 0.96 },
    { fpr: 1, tpr: 1 },
  ],
  precisionRecall: [
    { threshold: '0.3', precision: 90, recall: 95 },
    { threshold: '0.5', precision: 88, recall: 82 },
    { threshold: '0.7', precision: 79, recall: 73 },
    { threshold: '0.9', precision: 58, recall: 51 },
  ],
  confusionMatrix: {
    truePositive: 6870,
    falsePositive: 612,
    falseNegative: 541,
    trueNegative: 16350,
  },
};
