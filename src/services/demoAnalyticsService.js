import { PAYMENT_STATES, ORDER_STATES } from './orderTransitions';

export function calculateAnalytics(orders) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return emptyAnalytics();
  }

  const completed = orders.filter(
    (o) => o.status === ORDER_STATES.COMPLETED && o.paymentStatus === PAYMENT_STATES.PAID
  );

  const totalRevenue = completed.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = completed.length;
  const totalItems = completed.reduce((sum, o) => sum + (o.items?.reduce((a, i) => a + i.quantity, 0) || 0), 0);
  const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top selling products
  const productSales = {};
  completed.forEach((o) => {
    o.items?.forEach((i) => {
      const key = i.snapshotName || i.productId;
      productSales[key] = (productSales[key] || 0) + i.quantity;
    });
  });
  const topProducts = Object.entries(productSales)
    .map(([name, qty]) => ({ name, quantity: qty }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Revenue by order type
  const byType = {};
  completed.forEach((o) => {
    byType[o.type] = (byType[o.type] || 0) + (o.totalAmount || 0);
  });

  // Payment method distribution
  const byPayment = {};
  completed.forEach((o) => {
    byPayment[o.paymentMethod] = (byPayment[o.paymentMethod] || 0) + 1;
  });

  // Hourly distribution (last 12 hours)
  const now = new Date();
  const hourly = Array.from({ length: 12 }, (_) => ({ hour: 0, revenue: 0 }));
  for (let i = 0; i < 12; i++) {
    hourly[i].hour = now.getHours() - (11 - i);
  }
  completed.forEach((o) => {
    const d = new Date(o.createdAt);
    const diff = now.getHours() - d.getHours();
    const idx = 11 - diff;
    if (idx >= 0 && idx < 12) {
      hourly[idx].revenue += o.totalAmount || 0;
    }
  });

  // Average preparation time (completed orders only)
  const prepTimes = completed
    .filter((o) => o.readyAt && o.preparingAt)
    .map((o) => (new Date(o.readyAt) - new Date(o.preparingAt)) / 1000);
  const avgPrepTime =
    prepTimes.length > 0 ? Math.round(prepTimes.reduce((a, b) => a + b, 0) / prepTimes.length) : 0;

  return {
    totalRevenue,
    totalOrders,
    totalItems,
    aov: Math.round(aov),
    topProducts,
    revenueByType: byType,
    paymentMethodDistribution: byPayment,
    hourlyData: hourly,
    avgPrepTime,
    pendingOrders: orders.filter((o) => o.status === ORDER_STATES.PENDING_CONFIRMATION).length,
    activeOrders: orders.filter(
      (o) =>
        o.status === ORDER_STATES.CONFIRMED ||
        o.status === ORDER_STATES.PREPARING ||
        o.status === ORDER_STATES.READY
    ).length,
    rejectedOrders: orders.filter((o) => o.status === ORDER_STATES.REJECTED).length,
  };
}

function emptyAnalytics() {
  return {
    totalRevenue: 0,
    totalOrders: 0,
    totalItems: 0,
    aov: 0,
    topProducts: [],
    revenueByType: {},
    paymentMethodDistribution: {},
    hourlyData: Array.from({ length: 12 }, () => ({ hour: 0, revenue: 0 })),
    avgPrepTime: 0,
    pendingOrders: 0,
    activeOrders: 0,
    rejectedOrders: 0,
  };
}

export default { calculateAnalytics };
