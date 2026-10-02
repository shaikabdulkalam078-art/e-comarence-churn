const firstNames = [
  'Rahul', 'Priya', 'Arjun', 'Sneha', 'Karan', 'Ananya', 'Vikram', 'Nisha', 'Rohan', 'Meera',
  'Amit', 'Ishita', 'Rajat', 'Divya', 'Harsh', 'Neha', 'Manoj', 'Pooja', 'Siddharth', 'Tanvi',
  'Aditya', 'Shreya', 'Saurabh', 'Kavya', 'Nikhil', 'Aisha', 'Varun', 'Manya', 'Kabir', 'Ritika',
  'Yash', 'Ankita', 'Sarthak', 'Geeta', 'Vivek', 'Bhavna', 'Dev', 'Aditi', 'Sushant', 'Pallavi',
  'Nitin', 'Jiya', 'Akash', 'Rhea', 'Sahil', 'Mira', 'Tarun', 'Ira', 'Rudra', 'Disha'
];

const lastNames = [
  'Sharma', 'Patel', 'Reddy', 'Kumar', 'Singh', 'Iyer', 'Desai', 'Nair', 'Rao', 'Joshi',
  'Bhatia', 'Malhotra', 'Kapoor', 'Verma', 'Menon', 'Krishna', 'Saxena', 'Pillai', 'Ghosh', 'Chopra'
];

const locations = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const categories = ['Electronics', 'Fashion', 'Beauty', 'Home & Kitchen', 'Sports', 'Books', 'Accessories', 'Footwear', 'Grocery'];
const productsByCategory = {
  Electronics: ['Wireless Headphones', 'Smartwatch', 'Bluetooth Speaker', 'Fitness Band'],
  Fashion: ['Cotton Kurta', 'Denim Jacket', 'Printed Shirt', 'Laptop Sleeve'],
  Beauty: ['Face Serum', 'Sunscreen', 'Hair Oil', 'Makeup Kit'],
  'Home & Kitchen': ['Ceramic Set', 'Storage Box', 'Cookware Kit', 'Bedroom Set'],
  Sports: ['Yoga Mat', 'Workout Bottle', 'Running Shoes', 'Resistance Band'],
  Books: ['Fiction Volume', 'Travel Journal', 'Business Book', 'Learning Guide'],
  Accessories: ['Leather Wallet', 'Travel Bag', 'Smart Watch Strap', 'Power Bank'],
  Footwear: ['Sneakers', 'Comfort Sandals', 'Walking Shoes', 'Slip-ons'],
  Grocery: ['Organic Snack Box', 'Tea Collection', 'Breakfast Set', 'Spice Pack']
};

const offersByCategory = {
  Electronics: [{ title: '15% OFF', description: 'Save on a selected tech favorite.', discount: '15%' }, { title: '₹500 OFF', description: 'Take ₹500 off your next order.', discount: '₹500' }],
  Fashion: [{ title: '20% OFF', description: 'Refresh your wardrobe with 20% off.', discount: '20%' }, { title: '₹400 OFF', description: 'Enjoy a ₹400 saving on selected styles.', discount: '₹400' }],
  Beauty: [{ title: 'BUY 1 GET 1', description: 'Pair your routine and save more.', discount: 'BOGO' }, { title: 'FREE DELIVERY', description: 'Get free delivery on selected essentials.', discount: 'Free delivery' }],
  'Home & Kitchen': [{ title: '25% OFF', description: 'Upgrade your home with crisp savings.', discount: '25%' }, { title: '₹350 OFF', description: 'Save ₹350 on home essentials.', discount: '₹350' }],
  Sports: [{ title: '15% OFF', description: 'Train better with 15% off', discount: '15%' }, { title: '₹250 OFF', description: 'Save ₹250 on your next fitness purchase.', discount: '₹250' }],
  Books: [{ title: '20% OFF', description: 'Build your next reading list with savings.', discount: '20%' }, { title: '₹200 OFF', description: 'Save on selected learning titles.', discount: '₹200' }],
  Accessories: [{ title: '10% OFF', description: 'Style up with a simple discount.', discount: '10%' }, { title: '₹300 OFF', description: 'Take ₹300 off the next accessory order.', discount: '₹300' }],
  Footwear: [{ title: '20% OFF', description: 'Step out with comfort and savings.', discount: '20%' }, { title: '₹350 OFF', description: 'Save ₹350 on your next footwear order.', discount: '₹350' }],
  Grocery: [{ title: '₹200 OFF', description: 'Fresh picks, better savings.', discount: '₹200' }, { title: 'FREE DELIVERY', description: 'Enjoy free delivery on essentials.', discount: 'Free delivery' }]
};

function generateRecentOrders(index, totalOrders, avgOrderValue) {
  const orders = [];
  for (let i = 0; i < 4; i += 1) {
    const category = categories[(index + i * 3) % categories.length];
    const product = productsByCategory[category][(index + i) % productsByCategory[category].length];
    const daysAgo = 7 + i * (3 + (index % 5));
    const amount = Math.max(250, Math.round(avgOrderValue * (0.65 + ((index + i) % 7) / 12)));
    orders.push({
      orderId: `ORD-${100001 + index}-${i + 1}`,
      date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      product,
      category,
      amount,
    });
  }
  return orders;
}

function createCustomer(index) {
  const customerNumber = 100001 + index;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const totalOrders = 4 + ((index * 19 + 13) % 72);
  const totalSpending = 4000 + ((index * 3671 + 1840) % 248000);
  const averageOrderValue = Number((totalSpending / totalOrders).toFixed(2));
  const lastPurchaseDaysAgo = (index * 17 + 11) % 180;
  const lastPurchaseDate = new Date(Date.now() - lastPurchaseDaysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const preferredCategory = categories[(index * 5 + 2) % categories.length];
  const purchaseFrequency = totalOrders >= 36 ? 'High' : totalOrders >= 18 ? 'Medium' : 'Low';
  const customerActivity = lastPurchaseDaysAgo <= 30 ? 'Active' : lastPurchaseDaysAgo <= 90 ? 'Occasional' : 'Inactive';
  const churnProbability = Number(Math.min(0.94, Math.max(0.08, 0.12 + (lastPurchaseDaysAgo / 180) * 0.35 + (purchaseFrequency === 'Low' ? 0.2 : purchaseFrequency === 'Medium' ? 0.1 : 0.05))).toFixed(2));
  const churnRisk = churnProbability < 0.35 ? 'Low' : churnProbability < 0.65 ? 'Medium' : 'High';
  const recentOrders = generateRecentOrders(index, totalOrders, averageOrderValue);
  const categoryOffers = offersByCategory[preferredCategory];

  return {
    customerId: `CQ-${customerNumber}`,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    phone: `+91 987${String((index * 7 + 13) % 100000).padStart(5, '0')}`,
    location: locations[(index * 7 + 3) % locations.length],
    age: 21 + ((index * 11 + 5) % 37),
    gender: index % 3 === 0 ? 'Female' : index % 3 === 1 ? 'Male' : 'Prefer not to say',
    signupDate: new Date(2022 + (index % 3), (index * 5) % 12, (index % 28) + 1).toISOString().slice(0, 10),
    totalOrders,
    totalSpending,
    averageOrderValue,
    lastPurchaseDate,
    daysSinceLastPurchase: lastPurchaseDaysAgo,
    purchaseFrequency,
    customerActivity,
    spendingPattern: averageOrderValue >= 5000 ? 'High' : averageOrderValue >= 2000 ? 'Medium' : 'Low',
    preferredCategory,
    churnProbability,
    churnRisk,
    recentOrders,
    spendingActivity: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, monthIndex) => ({
      month,
      amount: Math.round((totalSpending / 6) * (0.6 + ((index + monthIndex) % 7) / 12)),
    })),
    recommendedOffers: [
      categoryOffers[index % categoryOffers.length],
      offersByCategory[categories[(index + 2) % categories.length]][(index + 1) % 2],
      { title: 'FREE DELIVERY', description: 'Enjoy free delivery on selected items.', discount: 'Free delivery' }
    ]
  };
}

export const ecommerceCustomers = Array.from({ length: 1000 }, (_, index) => createCustomer(index));

export function getEcommerceCustomerById(customerId) {
  const normalizedId = String(customerId || '').trim().toUpperCase();
  if (!/^CQ-\d{6}$/.test(normalizedId)) return null;
  const match = Number(normalizedId.replace('CQ-', ''));
  if (match < 100001 || match > 101000) return null;
  const item = ecommerceCustomers[match - 100001];
  return item && item.customerId === normalizedId ? item : null;
}
