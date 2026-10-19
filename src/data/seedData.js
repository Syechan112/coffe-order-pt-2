// BrewFlow Seed Data - Initial state for demo
export const SCHEMA_VERSION = 'BREWFLOW_SCHEMA_V1';

export const categories = [
  { id: 'espresso', name: 'Espresso Based', icon: 'coffee' },
  { id: 'manual-brew', name: 'Manual Brew', icon: 'droplets' },
  { id: 'non-coffee', name: 'Non-Coffee', icon: 'cup-soda' },
  { id: 'pastry', name: 'Pastry', icon: 'croissant' },
];

export const products = [
  // Espresso Based
  {
    id: 'prod-001',
    name: 'Espresso Single Origin',
    description: 'Double shot espresso dari biji kopi pilihan Gayo, Aceh',
    price: 28000,
    categoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: null,
    },
  },
  {
    id: 'prod-002',
    name: 'Cappuccino',
    description: 'Espresso dengan steamed milk dan foam lembut',
    price: 35000,
    categoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: ['Fresh Milk', 'Oat Milk (+5rb)', 'Soy Milk (+5rb)'],
    },
  },
  {
    id: 'prod-003',
    name: 'Café Latte',
    description: 'Espresso dengan steamed milk, rasio lebih creamy',
    price: 38000,
    categoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: ['Fresh Milk', 'Oat Milk (+5rb)', 'Soy Milk (+5rb)'],
    },
  },
  {
    id: 'prod-004',
    name: 'Americano',
    description: 'Espresso dengan air panas, rasa bold dan clean',
    price: 32000,
    categoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: null,
    },
  },
  {
    id: 'prod-005',
    name: 'Mocha',
    description: 'Espresso dengan coklat Belgia dan steamed milk',
    price: 42000,
    categoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: ['Fresh Milk', 'Oat Milk (+5rb)', 'Soy Milk (+5rb)'],
    },
  },
  // Manual Brew
  {
    id: 'prod-006',
    name: 'V60 Pour Over',
    description: 'Single origin Gayo dengan metode V60, clean dan bright',
    price: 45000,
    categoryId: 'manual-brew',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot'],
      sugarLevel: ['0%'],
      milk: null,
    },
  },
  {
    id: 'prod-007',
    name: 'Cold Brew',
    description: 'Cold brew 18 jam, smooth dan low acidity',
    price: 40000,
    categoryId: 'manual-brew',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Iced'],
      sugarLevel: ['0%', '25%', '50%'],
      milk: null,
    },
  },
  {
    id: 'prod-008',
    name: 'Aeropress',
    description: 'Full immersion brew, body rich dan balanced',
    price: 42000,
    categoryId: 'manual-brew',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot'],
      sugarLevel: ['0%'],
      milk: null,
    },
  },
  // Non-Coffee
  {
    id: 'prod-009',
    name: 'Matcha Latte',
    description: 'Premium Japanese matcha dengan steamed milk',
    price: 40000,
    categoryId: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: ['Fresh Milk', 'Oat Milk (+5rb)'],
    },
  },
  {
    id: 'prod-010',
    name: 'Chocolate',
    description: 'Coklat premium dengan steamed milk',
    price: 38000,
    categoryId: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['25%', '50%', '75%', '100%'],
      milk: ['Fresh Milk', 'Oat Milk (+5rb)'],
    },
  },
  {
    id: 'prod-011',
    name: 'Lemon Tea',
    description: 'Fresh brewed tea dengan lemon slice',
    price: 28000,
    categoryId: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    available: true,
    customization: {
      temperature: ['Hot', 'Iced'],
      sugarLevel: ['0%', '25%', '50%', '75%', '100%'],
      milk: null,
    },
  },
  // Pastry
  {
    id: 'prod-012',
    name: 'Butter Croissant',
    description: 'Croissant butter premium, flaky dan buttery',
    price: 28000,
    categoryId: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    available: true,
    customization: null,
  },
  {
    id: 'prod-013',
    name: 'Banana Bread',
    description: 'Homemade banana bread dengan topping almond slice',
    price: 32000,
    categoryId: 'pastry',
    image: 'https://images.unsplash.com/photo-1606101273945-e9eba91c79fe?w=400&h=300&fit=crop',
    available: true,
    customization: null,
  },
  {
    id: 'prod-014',
    name: 'Cheesecake Slice',
    description: 'New York style cheesecake dengan berry compote',
    price: 45000,
    categoryId: 'pastry',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
    available: true,
    customization: null,
  },
  {
    id: 'prod-015',
    name: 'Tiramisu',
    description: 'Classic Italian tiramisu dengan mascarpone',
    price: 48000,
    categoryId: 'pastry',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    available: true,
    customization: null,
  },
];

export const tables = [
  { id: 'A-01', name: 'Meja A-01', capacity: 4, zone: 'Indoor' },
  { id: 'A-02', name: 'Meja A-02', capacity: 4, zone: 'Indoor' },
  { id: 'A-03', name: 'Meja A-03', capacity: 2, zone: 'Indoor' },
  { id: 'B-01', name: 'Meja B-01', capacity: 6, zone: 'Outdoor' },
  { id: 'B-02', name: 'Meja B-02', capacity: 4, zone: 'Outdoor' },
  { id: 'B-03', name: 'Meja B-03', capacity: 2, zone: 'Outdoor' },
  { id: 'C-01', name: 'Meja C-01', capacity: 8, zone: 'VIP Room' },
  { id: 'C-02', name: 'Meja C-02', capacity: 6, zone: 'VIP Room' },
];

// Helper to generate order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}${random}`;
};

// Initial demo orders for showcasing the system
export const initialOrders = [
  {
    id: 'ORD-DEMO001',
    orderNumber: 1,
    type: 'dine-in',
    table: 'A-01',
    items: [
      {
        productId: 'prod-002',
        snapshotName: 'Cappuccino',
        priceAtPurchase: 35000,
        quantity: 2,
        customization: { temperature: 'Hot', sugarLevel: '50%', milk: 'Fresh Milk' },
        subtotal: 70000,
      },
      {
        productId: 'prod-012',
        snapshotName: 'Butter Croissant',
        priceAtPurchase: 28000,
        quantity: 1,
        customization: null,
        subtotal: 28000,
      },
    ],
    totalAmount: 98000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    notes: '',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    confirmedAt: new Date(Date.now() - 3600000 * 2 + 60000).toISOString(),
    preparingAt: new Date(Date.now() - 3600000 * 2 + 120000).toISOString(),
    readyAt: new Date(Date.now() - 3600000 * 2 + 300000).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 2 + 420000).toISOString(),
  },
  {
    id: 'ORD-DEMO002',
    orderNumber: 2,
    type: 'takeaway',
    table: null,
    items: [
      {
        productId: 'prod-003',
        snapshotName: 'Café Latte',
        priceAtPurchase: 38000,
        quantity: 1,
        customization: { temperature: 'Iced', sugarLevel: '25%', milk: 'Oat Milk (+5rb)' },
        subtotal: 43000,
      },
      {
        productId: 'prod-007',
        snapshotName: 'Cold Brew',
        priceAtPurchase: 40000,
        quantity: 1,
        customization: { temperature: 'Iced', sugarLevel: '0%' },
        subtotal: 40000,
      },
    ],
    totalAmount: 83000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'qris',
    notes: 'Less ice please',
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    confirmedAt: new Date(Date.now() - 3600000 * 1.5 + 30000).toISOString(),
    preparingAt: new Date(Date.now() - 3600000 * 1.5 + 90000).toISOString(),
    readyAt: new Date(Date.now() - 3600000 * 1.5 + 240000).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 1.5 + 360000).toISOString(),
  },
  {
    id: 'ORD-DEMO003',
    orderNumber: 3,
    type: 'dine-in',
    table: 'B-02',
    items: [
      {
        productId: 'prod-005',
        snapshotName: 'Mocha',
        priceAtPurchase: 42000,
        quantity: 2,
        customization: { temperature: 'Hot', sugarLevel: '75%', milk: 'Fresh Milk' },
        subtotal: 84000,
      },
      {
        productId: 'prod-014',
        snapshotName: 'Cheesecake Slice',
        priceAtPurchase: 45000,
        quantity: 1,
        customization: null,
        subtotal: 45000,
      },
    ],
    totalAmount: 129000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'ewallet',
    notes: '',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    confirmedAt: new Date(Date.now() - 3600000 + 45000).toISOString(),
    preparingAt: new Date(Date.now() - 3600000 + 120000).toISOString(),
    readyAt: new Date(Date.now() - 3600000 + 300000).toISOString(),
    completedAt: new Date(Date.now() - 3600000 + 420000).toISOString(),
  },
];

export const getSeedState = () => ({
  schemaVersion: SCHEMA_VERSION,
  orders: initialOrders,
  orderCounter: 3,
  products,
  categories,
  tables,
  lastUpdated: new Date().toISOString(),
});
