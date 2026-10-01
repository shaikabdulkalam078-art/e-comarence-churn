const firstNames = [
  'Aarav', 'Aanya', 'Aarohi', 'Aditya', 'Akash', 'Amara', 'Anaya', 'Anika', 'Arjun', 'Avni',
  'Bhavya', 'Charvi', 'Dev', 'Diya', 'Esha', 'Gauri', 'Ishaan', 'Ishita', 'Jai', 'Jhanvi',
  'Kabir', 'Kavya', 'Kiran', 'Lakshmi', 'Madhav', 'Maya', 'Meera', 'Mihir', 'Naina', 'Neel',
  'Nikhil', 'Nisha', 'Pallavi', 'Parth', 'Prisha', 'Raghav', 'Rhea', 'Rohan', 'Saanvi', 'Samar',
  'Sara', 'Shaurya', 'Shreya', 'Tanvi', 'Tara', 'Uday', 'Vedant', 'Vihaan', 'Yash', 'Zoya',
];

const lastNames = [
  'Agarwal', 'Balan', 'Bhat', 'Chandra', 'Das', 'Desai', 'Ghosh', 'Iyer', 'Jain', 'Joshi',
  'Kapoor', 'Kulkarni', 'Menon', 'Mishra', 'Nair', 'Patel', 'Rao', 'Reddy', 'Shah', 'Sharma',
];

const locations = [
  'Bengaluru', 'Hyderabad', 'Chennai', 'Coimbatore', 'Mumbai', 'Pune', 'Delhi', 'Kolkata',
  'Vijayawada', 'Visakhapatnam', 'Kochi', 'Mysuru', 'Jaipur', 'Ahmedabad', 'Indore', 'Nagpur',
  'Lucknow', 'Thiruvananthapuram', 'Surat', 'Bhubaneswar',
];

const categories = [
  'Electronics', 'Fashion', 'Beauty', 'Grocery', 'Home & Kitchen', 'Sports', 'Books',
  'Accessories', 'Footwear', 'Mobile Accessories',
];

const productsByCategory = {
  Electronics: ['Wireless Headphones', 'Smart Speaker', 'Fitness Watch', 'Bluetooth Keyboard'],
  Fashion: ['Cotton Kurta', 'Everyday Shirt', 'Linen Trousers', 'Printed Scarf'],
  Beauty: ['Face Moisturizer', 'Herbal Shampoo', 'Daily Sunscreen', 'Skin Care Set'],
  Grocery: ['Pantry Essentials Box', 'Organic Tea Pack', 'Snack Variety Box', 'Breakfast Staples'],
  'Home & Kitchen': ['Ceramic Dinner Set', 'Storage Organizer', 'Cotton Bedsheet', 'Steel Cookware'],
  Sports: ['Yoga Mat', 'Training Bottle', 'Running Shorts', 'Resistance Band Set'],
  Books: ['Fiction Collection', 'Creative Thinking', 'Travel Journal', 'Learning Workbook'],
  Accessories: ['Everyday Backpack', 'Classic Wallet', 'Canvas Tote', 'Travel Pouch'],
  Footwear: ['Everyday Sneakers', 'Walking Sandals', 'Canvas Slip-ons', 'Training Shoes'],
  'Mobile Accessories': ['Protective Phone Case', 'USB-C Charger', 'Power Bank', 'Charging Cable Set'],
};

const offersByCategory = {
  Electronics: [
    { title: '15% OFF', description: 'Save on selected electronics and smart accessories.', discount: '15%' },
    { title: '₹300 OFF', description: 'Take ₹300 off your next electronics order.', discount: '₹300' },
  ],
  Fashion: [
    { title: '20% OFF', description: 'Enjoy 20% off your next fashion pick.', discount: '20%' },
    { title: '₹250 OFF', description: 'Refresh your wardrobe and save ₹250.', discount: '₹250' },
  ],
  Beauty: [
    { title: '15% OFF', description: 'Save on your next beauty and personal care order.', discount: '15%' },
    { title: 'FREE DELIVERY', description: 'Get free delivery on your next beauty order.', discount: 'Free delivery' },
  ],
  Grocery: [
    { title: '₹150 OFF', description: 'Save ₹150 on your next pantry restock.', discount: '₹150' },
    { title: 'FREE DELIVERY', description: 'Get free delivery on your next grocery order.', discount: 'Free delivery' },
  ],
  'Home & Kitchen': [
    { title: '20% OFF', description: 'Save on a selected home and kitchen favorite.', discount: '20%' },
    { title: '₹400 OFF', description: 'Take ₹400 off your next home essentials order.', discount: '₹400' },
  ],
  Sports: [
    { title: '15% OFF', description: 'Get moving with 15% off selected sports gear.', discount: '15%' },
    { title: '₹250 OFF', description: 'Save ₹250 on your next fitness purchase.', discount: '₹250' },
  ],
  Books: [
    { title: '20% OFF', description: 'Get 20% off your next reading list.', discount: '20%' },
    { title: '₹100 OFF', description: 'Save ₹100 on your next book order.', discount: '₹100' },
  ],
  Accessories: [
    { title: '15% OFF', description: 'Add a little extra and save on accessories.', discount: '15%' },
    { title: '₹200 OFF', description: 'Take ₹200 off your next accessories order.', discount: '₹200' },
  ],
  Footwear: [
    { title: '20% OFF', description: 'Step out with 20% off selected footwear.', discount: '20%' },
    { title: '₹300 OFF', description: 'Save ₹300 on your next footwear purchase.', discount: '₹300' },
  ],
  'Mobile Accessories': [
    { title: '15% OFF', description: 'Save on useful accessories for your device.', discount: '15%' },
    { title: '₹200 OFF', description: 'Take ₹200 off your next mobile accessories order.', discount: '₹200' },
  ],
};

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const baseDate = Date.UTC(2026, 8, 30);

function dateDaysAgo(days) {
  return new Date(baseDate - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function signupDateFor(index) {
  const year = 2022 + ((index * 7) % 5);
  const month = (index * 5) % 12;
  const day = 1 + ((index * 11) % 27);
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

function createCustomer(index) {
  const customerNumber = 100001 + index;
  const id = `CQ-${customerNumber}`;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length)];
  const name = `${firstName} ${lastName}`;
  const totalOrders = 1 + ((index * 37 + 13) % 40);
  const totalSpending = 1800 + ((index * 8837 + 4219) % 198200);
  const averageOrderValue = Number((totalSpending / totalOrders).toFixed(2));
  const daysSinceLastPurchase = (index * 47 + 11) % 181;
  const lastPurchaseDate = dateDaysAgo(daysSinceLastPurchase);
  const purchaseFrequency = totalOrders >= 22 ? 'High' : totalOrders >= 9 ? 'Medium' : 'Low';
  const customerActivity = daysSinceLastPurchase <= 30 ? 'Active' : daysSinceLastPurchase <= 90 ? 'Occasional' : 'Inactive';
  const frequencyRisk = purchaseFrequency === 'High' ? 0.12 : purchaseFrequency === 'Medium' ? 0.3 : 0.5;
  const churnProbability = Number(Math.min(
    0.96,
    Math.max(0.04, 0.08 + (daysSinceLastPurchase / 180) * 0.42 + frequencyRisk * 0.35 + ((index * 13) % 17) / 100),
  ).toFixed(2));
  const churnRisk = churnProbability < 0.35 ? 'Low' : churnProbability < 0.66 ? 'Medium' : 'High';
  const preferredCategory = categories[(index * 7 + Math.floor(index / 9)) % categories.length];
  const monthlyBaseline = Math.max(250, totalSpending / 12);
  const spendingPattern = averageOrderValue >= 5000 ? 'High' : averageOrderValue >= 1800 ? 'Medium' : 'Low';
  const recentOrders = Array.from({ length: 4 }, (_, orderIndex) => {
    const orderCategory = categories[(index + orderIndex * 3) % categories.length];
    const productChoices = productsByCategory[orderCategory];
    const orderDaysAgo = daysSinceLastPurchase + orderIndex * (5 + (index % 8));
    const amount = Math.max(149, Math.round(averageOrderValue * (0.55 + ((index * 3 + orderIndex * 17) % 100) / 100)));

    return {
      orderId: `ORD-${customerNumber}-${orderIndex + 1}`,
      date: dateDaysAgo(orderDaysAgo),
      product: productChoices[(index + orderIndex) % productChoices.length],
      category: orderCategory,
      amount,
    };
  });
  const categoryOffers = offersByCategory[preferredCategory];
  const recommendedOffers = [
    categoryOffers[index % categoryOffers.length],
    offersByCategory[categories[(index + 3) % categories.length]][(index >> 2) % 2],
    { title: 'FREE DELIVERY', description: 'Enjoy free delivery on your next order.', discount: 'Free delivery' },
  ];

  return {
    customerId: id,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    phone: `+91 00000 ${String(10001 + index).padStart(5, '0')}`,
    location: locations[(index * 11 + 3) % locations.length],
    age: 19 + ((index * 17 + 5) % 49),
    gender: index % 3 === 0 ? 'Female' : index % 3 === 1 ? 'Male' : 'Prefer not to say',
    signupDate: signupDateFor(index),
    totalOrders,
    totalSpending,
    averageOrderValue,
    lastPurchaseDate,
    daysSinceLastPurchase,
    purchaseFrequency,
    customerActivity,
    spendingPattern,
    preferredCategory,
    churnProbability,
    churnRisk,
    recentOrders,
    spendingActivity: months.map((month, monthIndex) => ({
      month,
      amount: Math.round(monthlyBaseline * (0.62 + ((index + monthIndex * 7) % 15) / 20)),
    })),
    recommendedOffers,
  };
}

export function generateCustomerDataset() {
  return Array.from({ length: 1000 }, (_, index) => createCustomer(index));
}

export const customers = generateCustomerDataset();