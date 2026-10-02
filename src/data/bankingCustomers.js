const firstNames = ['Aditi', 'Rohit', 'Neha', 'Vikas', 'Anjali', 'Kunal', 'Pooja', 'Aditya', 'Isha', 'Saurabh'];
const lastNames = ['Khan', 'Sharma', 'Patel', 'Reddy', 'Iyer', 'Nair', 'Das', 'Saxena', 'Joshi', 'Mehta'];
const locations = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const accountTypes = ['Savings', 'Current', 'Premium', 'Salary'];
const loanStatuses = ['No Loan', 'Active Loan', 'Paid Off', 'Under Review'];
const actions = ['Personalized banking offer', 'Fee waiver', 'Credit card offer', 'Loan offer', 'Relationship manager contact'];

function createCustomer(index) {
  const customerNumber = 100001 + index;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index + 3) % lastNames.length];
  const accountType = accountTypes[index % accountTypes.length];
  const accountAge = 1 + (index % 18);
  const monthlyTransactions = 10 + ((index * 13) % 180);
  const averageTransactionValue = 1200 + ((index * 233) % 16000);
  const digitalUsage = 25 + ((index * 7) % 65);
  const daysSinceTransaction = (index * 19 + 11) % 170;
  const lastTransactionDate = new Date(Date.now() - daysSinceTransaction * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const churnProbability = Number(Math.min(0.95, Math.max(0.06, 0.09 + (daysSinceTransaction / 170) * 0.46 + (digitalUsage < 40 ? 0.18 : 0.04))).toFixed(2));
  const churnRisk = churnProbability < 0.35 ? 'Low' : churnProbability < 0.65 ? 'Medium' : 'High';
  const customerActivity = digitalUsage > 70 ? 'High' : digitalUsage > 40 ? 'Medium' : 'Low';

  return {
    customerId: `BQ-${customerNumber}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    location: locations[(index * 5 + 1) % locations.length],
    accountType,
    accountAge,
    monthlyTransactions,
    averageTransactionValue,
    digitalUsage,
    lastTransactionDate,
    loanStatus: loanStatuses[index % loanStatuses.length],
    creditCardUsage: index % 3 === 0 ? 'High' : index % 3 === 1 ? 'Medium' : 'Low',
    supportInteractions: (index % 8) + 1,
    customerActivity,
    churnProbability,
    churnRisk,
    recommendedAction: actions[index % actions.length],
  };
}

export const bankingCustomers = Array.from({ length: 500 }, (_, index) => createCustomer(index));

export function getBankingCustomerById(customerId) {
  const normalizedId = String(customerId || '').trim().toUpperCase();
  if (!/^BQ-\d{6}$/.test(normalizedId)) return null;
  const match = Number(normalizedId.replace('BQ-', ''));
  if (match < 100001 || match > 100500) return null;
  const item = bankingCustomers[match - 100001];
  return item && item.customerId === normalizedId ? item : null;
}
