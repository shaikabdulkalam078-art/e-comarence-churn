const firstNames = [
  'Aarav', 'Aanya', 'Aditya', 'Akash', 'Amaya', 'Ananya', 'Aniket', 'Anita', 'Arjun', 'Bhavya',
  'Charan', 'Chitra', 'Deeksha', 'Dev', 'Diya', 'Esha', 'Gaurav', 'Ishita', 'Jai', 'Jhanvi',
  'Kabir', 'Kavya', 'Kiran', 'Krisha', 'Lakshmi', 'Mansi', 'Meera', 'Mihir', 'Naina', 'Neel',
  'Nikhil', 'Nisha', 'Om', 'Pallavi', 'Parth', 'Prisha', 'Rahul', 'Rhea', 'Rohan', 'Saanvi',
  'Sakshi', 'Sara', 'Shaurya', 'Shreya', 'Simran', 'Tanvi', 'Tejas', 'Uday', 'Vaibhav', 'Vansh',
  'Vihaan', 'Yash', 'Zoya', 'Aadya', 'Amit', 'Anaya', 'Anjali', 'Armaan', 'Bhavna', 'Chetan',
  'Deepak', 'Divya', 'Farah', 'Gaurika', 'Hitesh', 'Ira', 'Jatin', 'Karan', 'Kriti', 'Madhav',
  'Manya', 'Nandita', 'Nihar', 'Pooja', 'Priya', 'Riddhi', 'Sarthak', 'Shivam', 'Sneha', 'Varun'
];

const lastNames = [
  'Agarwal', 'Bhatia', 'Chopra', 'Das', 'Desai', 'Ghosh', 'Iyer', 'Jain', 'Joshi', 'Kapoor',
  'Kulkarni', 'Menon', 'Mishra', 'Nair', 'Patel', 'Rao', 'Reddy', 'Saxena', 'Sharma', 'Singh'
];

const locations = [
  'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Chennai', 'Delhi', 'Kolkata', 'Jaipur',
  'Ahmedabad', 'Coimbatore', 'Lucknow', 'Nagpur', 'Visakhapatnam', 'Mysuru', 'Indore', 'Noida'
];

const categories = [
  'Groceries', 'Fruits & Vegetables', 'Dairy', 'Beverages', 'Snacks', 'Personal Care',
  'Home & Kitchen', 'Electronics', 'Fashion', 'Footwear', 'Stationery', 'Household Items',
  'Bakery', 'Frozen Foods'
];

const productsByCategory = {
  Groceries: ['Organic Rice', 'Toothpaste Pack', 'Spice Combo', 'Whole Wheat Flour', 'Cereal Mix'],
  'Fruits & Vegetables': ['Mango Box', 'Banana Bunch', 'Leafy Greens', 'Tomato Pack', 'Seasonal Fruit Basket'],
  Dairy: ['Milk Pack', 'Paneer Cubes', 'Yogurt Cups', 'Butter Block', 'Cheese Slice'],
  Beverages: ['Cold Coffee', 'Energy Drink', 'Herbal Tea', 'Coconut Water', 'Fruit Soda'],
  Snacks: ['Trail Mix', 'Masala Chips', 'Granola Bar', 'Nuts Pack', 'Cookies Box'],
  'Personal Care': ['Shampoo Bottle', 'Soap Pack', 'Face Wash', 'Hand Cream', 'Toiletry Kit'],
  'Home & Kitchen': ['Kitchen Towel Set', 'Storage Jar', 'Cookware Set', 'Cleaning Kit', 'Dining Set'],
  Electronics: ['Power Bank', 'Smart Speaker', 'Bluetooth Earbuds', 'USB Cable', 'Portable Lamp'],
  Fashion: ['Cotton Kurta', 'Printed Shirt', 'Silk Saree', 'Denim Jacket', 'Casual Dress'],
  Footwear: ['Running Shoes', 'Slip-ons', 'Formal Sandals', 'Walking Sneakers', 'Comfort Flats'],
  Stationery: ['Notebook Set', 'Desk Organizer', 'Ball Pen Pack', 'Sketch Book', 'Planner'],
  'Household Items': ['Laundry Detergent', 'Air Freshener', 'Cleaning Sponge', 'Paper Towel', 'Storage Basket'],
  Bakery: ['Breads', 'Muffin Pack', 'Pastry Box', 'Cake Slice', 'Brownie Box'],
  'Frozen Foods': ['Frozen Veggies', 'Ice Cream Tub', 'Frozen Paratha', 'Chicken Nuggets', 'Frozen Fruits']
};

const offerTemplates = {
  Groceries: [
    { title: '20% OFF', description: 'Get 20% off on selected grocery essentials.', discount: '20%' },
    { title: '₹500 OFF', description: 'Save ₹500 on your next grocery basket.', discount: '₹500' },
    { title: 'FREE DELIVERY', description: 'Enjoy free delivery on your next grocery order.', discount: 'Free delivery' },
  ],
  'Fruits & Vegetables': [
    { title: 'BUY 1 GET 1', description: 'Buy 1 get 1 on selected fresh produce.', discount: 'Buy 1 Get 1' },
    { title: '₹300 OFF', description: 'Save ₹300 on your next fresh produce order.', discount: '₹300' },
    { title: 'WEEKEND OFFER', description: 'Weekend fresh picks at special savings.', discount: 'Weekend deal' },
  ],
  Dairy: [
    { title: '15% OFF', description: 'Enjoy 15% off on dairy essentials.', discount: '15%' },
    { title: '₹250 OFF', description: 'Save ₹250 on your next dairy purchase.', discount: '₹250' },
    { title: 'FAMILY PACK', description: 'Get special savings on family-sized dairy bundles.', discount: 'Family pack' },
  ],
  Beverages: [
    { title: '20% OFF', description: 'Refresh with 20% off on selected beverages.', discount: '20%' },
    { title: '₹200 OFF', description: 'Get ₹200 off on your next drinks order.', discount: '₹200' },
    { title: 'FREE DELIVERY', description: 'Free delivery on your next beverage order.', discount: 'Free delivery' },
  ],
  Snacks: [
    { title: '15% OFF', description: 'Save 15% on your favourite snacks.', discount: '15%' },
    { title: '₹200 OFF', description: 'Unlock ₹200 off on your next snack pack.', discount: '₹200' },
    { title: 'MIDDAY DEAL', description: 'Weekend snack combo at a special price.', discount: 'Midday deal' },
  ],
  'Personal Care': [
    { title: '20% OFF', description: 'Enjoy 20% off on personal care essentials.', discount: '20%' },
    { title: '₹400 OFF', description: 'Save ₹400 on your next wellness order.', discount: '₹400' },
    { title: 'BUNDLE SAVINGS', description: 'Bundle your essentials and save extra.', discount: 'Bundle deal' },
  ],
  'Home & Kitchen': [
    { title: '25% OFF', description: 'Refresh your home with 25% off selected essentials.', discount: '25%' },
    { title: '₹600 OFF', description: 'Save ₹600 on home upgrades.', discount: '₹600' },
    { title: 'HOME SPECIAL', description: 'Exclusive savings on home essentials this week.', discount: 'Home special' },
  ],
  Electronics: [
    { title: '10% OFF', description: 'Save 10% on electronic essentials.', discount: '10%' },
    { title: '₹750 OFF', description: 'Get ₹750 off on your next electronics purchase.', discount: '₹750' },
    { title: 'SMART DEAL', description: 'Exclusive savings on useful digital accessories.', discount: 'Smart deal' },
  ],
  Fashion: [
    { title: '25% OFF', description: 'Refresh your wardrobe with 25% off.', discount: '25%' },
    { title: '₹500 OFF', description: 'Save ₹500 on your next fashion buy.', discount: '₹500' },
    { title: 'STYLE FEST', description: 'Seasonal savings for your next styling update.', discount: 'Style fest' },
  ],
  Footwear: [
    { title: '20% OFF', description: 'Step into comfort with 20% off footwear.', discount: '20%' },
    { title: '₹350 OFF', description: 'Save ₹350 on your next footwear order.', discount: '₹350' },
    { title: 'WALK EASY', description: 'Comfort-ready savings for your daily routine.', discount: 'Walk easy' },
  ],
  Stationery: [
    { title: '15% OFF', description: 'Save 15% on office and study essentials.', discount: '15%' },
    { title: '₹200 OFF', description: 'Get ₹200 off on your next stationery haul.', discount: '₹200' },
    { title: 'BACK TO SCHOOL', description: 'Fresh savings on work and study supplies.', discount: 'Back to school' },
  ],
  'Household Items': [
    { title: '15% OFF', description: 'Save 15% on everyday household essentials.', discount: '15%' },
    { title: '₹350 OFF', description: 'Take ₹350 off your next household purchase.', discount: '₹350' },
    { title: 'HOME CARE', description: 'Keep your home stocked with special savings.', discount: 'Home care' },
  ],
  Bakery: [
    { title: '20% OFF', description: 'Treat yourself with 20% off bakery favorites.', discount: '20%' },
    { title: '₹150 OFF', description: 'Save ₹150 on your next bakery order.', discount: '₹150' },
    { title: 'BAKERY CLUB', description: 'Fresh breakfast and snack savings for you.', discount: 'Bakery club' },
  ],
  'Frozen Foods': [
    { title: '20% OFF', description: 'Grab 20% off on frozen favourites.', discount: '20%' },
    { title: '₹300 OFF', description: 'Save ₹300 on your next frozen foods cart.', discount: '₹300' },
    { title: 'FROZEN DEAL', description: 'Quick kitchen savings on favourite frozen items.', discount: 'Frozen deal' },
  ],
};

function dateDaysAgo(days) {
  const utc = Date.UTC(2026, 8, 30);
  return new Date(utc - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function signupDateFor(index) {
  const year = 2022 + (index % 5);
  const month = 1 + ((index * 7) % 12);
  const day = 4 + ((index * 11) % 23);
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10);
}

export const marketCustomers = Array.from({ length: 1000 }, (_, index) => {
  const customerNumber = 100001 + index;
  const customerId = `MK-${customerNumber}`;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const location = locations[(index * 7 + 3) % locations.length];
  const age = 20 + ((index * 13 + 7) % 38);
  const preferredCategory = categories[(index * 5 + 2) % categories.length];
  const totalVisits = 6 + ((index * 17 + 11) % 38);
  const totalOrders = 3 + ((index * 19 + 13) % 24);
  const totalSpending = 1800 + ((index * 3389 + 4211) % 58000);
  const averageOrderValue = Math.round(totalSpending / totalOrders);
  const daysSinceLastPurchase = (index * 7 + 12) % 180;
  const lastVisitDate = dateDaysAgo(daysSinceLastPurchase);
  const purchaseFrequency = totalOrders >= 18 ? 'High' : totalOrders >= 9 ? 'Medium' : 'Low';
  const customerActivity = daysSinceLastPurchase <= 19 ? 'Active' : daysSinceLastPurchase <= 55 ? 'Regular' : 'Inactive';
  const churnProbability = Number(Math.min(
    0.92,
    Math.max(0.08, 0.11 + (daysSinceLastPurchase / 180) * 0.45 + (purchaseFrequency === 'Low' ? 0.18 : purchaseFrequency === 'Medium' ? 0.10 : 0.04) + ((index % 11) / 180)),
  ).toFixed(2));
  const churnRisk = churnProbability < 0.32 ? 'Low' : churnProbability < 0.6 ? 'Medium' : 'High';
  const recentPurchases = Array.from({ length: 5 }, (_, purchaseIndex) => {
    const purchaseDaysAgo = 2 + purchaseIndex * (4 + (index % 6));
    const productChoices = productsByCategory[preferredCategory] || productsByCategory.Groceries;
    const product = productChoices[(index + purchaseIndex * 2) % productChoices.length];
    const amount = 180 + ((index * 68 + purchaseIndex * 43) % 3600);

    return {
      date: dateDaysAgo(Math.min(daysSinceLastPurchase + purchaseIndex + 2, 120)),
      product,
      category: preferredCategory,
      amount,
    };
  });

  const recommendedOffers = [
    offerTemplates[preferredCategory][index % offerTemplates[preferredCategory].length],
    offerTemplates[categories[(index + 2) % categories.length]][(index + 1) % 3],
    { title: 'FREE DELIVERY', description: 'Enjoy free delivery on your next market order.', discount: 'Free delivery' },
  ];

  return {
    customerId,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${customerNumber}@example.com`,
    phone: `+91 ${90000 + index * 317}`.slice(0, 14),
    location,
    age,
    signupDate: signupDateFor(index),
    totalVisits,
    totalOrders,
    totalSpending,
    averageOrderValue,
    lastVisitDate,
    daysSinceLastPurchase,
    purchaseFrequency,
    customerActivity,
    preferredCategory,
    churnProbability,
    churnRisk,
    recentPurchases,
    recommendedOffers,
  };
});

export function getMarketCustomerById(customerId) {
  const normalized = typeof customerId === 'string' ? customerId.trim().toUpperCase() : '';
  const match = /^MK-(\d{6})$/.exec(normalized);
  if (!match) return null;

  const customerNumber = Number(match[1]);
  const firstCustomerNumber = 100001;
  const lastCustomerNumber = 101000;

  if (customerNumber < firstCustomerNumber || customerNumber > lastCustomerNumber) return null;

  const index = customerNumber - firstCustomerNumber;
  const customer = marketCustomers[index];
  return customer?.customerId === normalized ? customer : null;
}
