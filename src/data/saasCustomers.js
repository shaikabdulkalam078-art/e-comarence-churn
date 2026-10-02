const companyNames = ['TechNova Solutions', 'CloudEdge Systems', 'DataSphere Labs', 'BrightStack Technologies', 'NimbusWorks', 'Vertex Labs', 'OrbitCore', 'SignalIQ', 'OmniMetrics', 'BluePeak Software'];
const firstNames = ['Rahul', 'Priya', 'Ananya', 'Rohit', 'Neha', 'Karan', 'Ishita', 'Aman', 'Sana', 'Vivek'];
const lastNames = ['Sharma', 'Reddy', 'Patel', 'Kumar', 'Nair', 'Gupta', 'Menon', 'Saxena', 'Joshi', 'Iyer'];
const locations = ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Coimbatore'];
const plans = ['Free', 'Basic', 'Professional', 'Premium', 'Enterprise'];
const planUsage = { Free: { monthlyRevenue: 0, loginFrequency: 'Low', featureUsage: 'Low', supportTickets: 3 }, Basic: { monthlyRevenue: 1299, loginFrequency: 'Medium', featureUsage: 'Medium', supportTickets: 5 }, Professional: { monthlyRevenue: 2499, loginFrequency: 'High', featureUsage: 'High', supportTickets: 7 }, Premium: { monthlyRevenue: 4999, loginFrequency: 'High', featureUsage: 'Very High', supportTickets: 8 }, Enterprise: { monthlyRevenue: 8999, loginFrequency: 'Very High', featureUsage: 'Very High', supportTickets: 10 } };
const actions = ['Upgrade offer', 'Discount', 'Personalized onboarding', 'Customer success call', 'Feature education'];

function createCustomer(index) {
  const customerNumber = 100001 + index;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index + 2) % lastNames.length];
  const companyName = companyNames[index % companyNames.length];
  const plan = plans[index % plans.length];
  const revenue = planUsage[plan].monthlyRevenue;
  const loginFrequency = planUsage[plan].loginFrequency;
  const featureUsage = planUsage[plan].featureUsage;
  const usageIndex = index % 100;
  const supportTickets = (planUsage[plan].supportTickets + (index % 6)) % 12;
  const daysSinceActive = (index * 17 + 5) % 180;
  const lastActiveDate = new Date(Date.now() - daysSinceActive * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const subscriptionStartDate = new Date(2022 + (index % 4), (index * 3) % 12, (index % 27) + 1).toISOString().slice(0, 10);
  const churnProbability = Number(Math.min(0.94, Math.max(0.08, 0.1 + (daysSinceActive / 180) * 0.45 + ((usageIndex < 18) ? 0.18 : 0.05))).toFixed(2));
  const churnRisk = churnProbability < 0.35 ? 'Low' : churnProbability < 0.65 ? 'Medium' : 'High';
  const subscriptionStatus = churnRisk === 'High' ? 'At Risk' : 'Active';
  const recommendedAction = actions[index % actions.length];

  return {
    customerId: `SQ-${customerNumber}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    companyName,
    location: locations[(index * 3 + 5) % locations.length],
    plan,
    signupDate: new Date(2023 + (index % 3), (index * 7) % 12, (index % 28) + 1).toISOString().slice(0, 10),
    subscriptionStartDate,
    monthlyRevenue: revenue,
    totalRevenue: revenue * (8 + (index % 14)),
    loginFrequency,
    featureUsage,
    supportTickets,
    lastActiveDate,
    subscriptionStatus,
    churnProbability,
    churnRisk,
    recommendedAction,
  };
}

export const saasCustomers = Array.from({ length: 500 }, (_, index) => createCustomer(index));

export function getSaaSCustomerById(customerId) {
  const normalizedId = String(customerId || '').trim().toUpperCase();
  if (!/^SQ-\d{6}$/.test(normalizedId)) return null;
  const match = Number(normalizedId.replace('SQ-', ''));
  if (match < 100001 || match > 100500) return null;
  const item = saasCustomers[match - 100001];
  return item && item.customerId === normalizedId ? item : null;
}
