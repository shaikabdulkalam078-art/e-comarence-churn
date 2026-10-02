const firstNames = ['Kunal', 'Aarohi', 'Ravi', 'Sanjana', 'Aditya', 'Mehul', 'Anita', 'Shivam', 'Nandini', 'Rohan'];
const lastNames = ['Patel', 'Reddy', 'Sharma', 'Nair', 'Kumar', 'Iyer', 'Malhotra', 'Singh', 'Pillai', 'Joshi'];
const locations = ['Bengaluru', 'Hyderabad', 'Delhi', 'Chennai', 'Mumbai', 'Pune', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const plans = ['Basic', 'Standard', 'Premium', 'Unlimited', 'Family'];
const contractTypes = ['Monthly', 'Annual', 'Prepaid', 'Postpaid'];
const actions = ['Extra Data Offer', 'Recharge Discount', 'Plan Upgrade', 'Free Add-on', 'Customer Support Follow-up'];

function createCustomer(index) {
  const customerNumber = 100001 + index;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index + 2) % lastNames.length];
  const plan = plans[index % plans.length];
  const monthlyBill = 199 + ((index * 89) % 1750);
  const dataUsage = 1 + ((index * 64) % 100);
  const callMinutes = 50 + ((index * 71) % 520);
  const smsUsage = 10 + ((index * 9) % 120);
  const rechargeFrequency = 1 + (index % 12);
  const daysSinceRecharge = (index * 23 + 8) % 120;
  const lastRechargeDate = new Date(Date.now() - daysSinceRecharge * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const networkComplaints = (index % 5) + (daysSinceRecharge > 35 ? 1 : 0);
  const supportTickets = (index % 7) + (networkComplaints > 2 ? 2 : 0);
  const churnProbability = Number(Math.min(0.97, Math.max(0.07, 0.08 + (daysSinceRecharge / 120) * 0.42 + (networkComplaints / 10) * 0.22)).toFixed(2));
  const churnRisk = churnProbability < 0.35 ? 'Low' : churnProbability < 0.65 ? 'Medium' : 'High';
  const customerActivity = rechargeFrequency >= 8 ? 'High' : rechargeFrequency >= 4 ? 'Medium' : 'Low';

  return {
    customerId: `TQ-${customerNumber}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    location: locations[(index * 4 + 6) % locations.length],
    plan,
    monthlyBill,
    dataUsage,
    callMinutes,
    smsUsage,
    rechargeFrequency,
    lastRechargeDate,
    networkComplaints,
    supportTickets,
    contractType: contractTypes[index % contractTypes.length],
    customerActivity,
    churnProbability,
    churnRisk,
    recommendedAction: actions[index % actions.length],
  };
}

export const telecomCustomers = Array.from({ length: 500 }, (_, index) => createCustomer(index));

export function getTelecomCustomerById(customerId) {
  const normalizedId = String(customerId || '').trim().toUpperCase();
  if (!/^TQ-\d{6}$/.test(normalizedId)) return null;
  const match = Number(normalizedId.replace('TQ-', ''));
  if (match < 100001 || match > 100500) return null;
  const item = telecomCustomers[match - 100001];
  return item && item.customerId === normalizedId ? item : null;
}
