// Finite State Machine for all order and payment transitions.
// UI must call this service instead of mutating status directly.

export const ORDER_STATES = {
  PENDING_CONFIRMATION: 'pending_confirmation',
  AWAITING_PAYMENT: 'awaiting_payment',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

export const PAYMENT_STATES = {
  UNPAID: 'unpaid',
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

const validOrderTransitions = {
  [ORDER_STATES.PENDING_CONFIRMATION]: [ORDER_STATES.CONFIRMED, ORDER_STATES.REJECTED, ORDER_STATES.AWAITING_PAYMENT],
  [ORDER_STATES.AWAITING_PAYMENT]: [ORDER_STATES.PREPARING, ORDER_STATES.CONFIRMED, ORDER_STATES.REJECTED],
  [ORDER_STATES.CONFIRMED]: [ORDER_STATES.PREPARING, ORDER_STATES.AWAITING_PAYMENT, ORDER_STATES.REJECTED],
  [ORDER_STATES.PREPARING]: [ORDER_STATES.READY, ORDER_STATES.REJECTED],
  [ORDER_STATES.READY]: [ORDER_STATES.COMPLETED],
  [ORDER_STATES.COMPLETED]: [],
  [ORDER_STATES.REJECTED]: [],
};

const validPaymentTransitions = {
  [PAYMENT_STATES.UNPAID]: [PAYMENT_STATES.PENDING, PAYMENT_STATES.PAID, PAYMENT_STATES.FAILED],
  [PAYMENT_STATES.PENDING]: [PAYMENT_STATES.PAID, PAYMENT_STATES.FAILED],
  [PAYMENT_STATES.PAID]: [PAYMENT_STATES.REFUNDED],
  [PAYMENT_STATES.FAILED]: [PAYMENT_STATES.PENDING, PAYMENT_STATES.PAID],
  [PAYMENT_STATES.REFUNDED]: [],
};

export function canTransitionOrder(currentState, nextState) {
  return validOrderTransitions[currentState]?.includes(nextState) ?? false;
}

export function canTransitionPayment(currentState, nextState) {
  return validPaymentTransitions[currentState]?.includes(nextState) ?? false;
}

export function processTransition(order, nextStatus, options = {}) {
  const { paymentStatus, rejectionReason, now = new Date().toISOString() } = options;

  if (!order) {
    return { success: false, error: 'Pesanan tidak ditemukan.' };
  }

  if (!canTransitionOrder(order.status, nextStatus)) {
    return {
      success: false,
      error: `Transisi tidak valid: ${order.status} → ${nextStatus}`,
    };
  }

  const updatedOrder = { ...order, status: nextStatus, lastUpdated: now };

  // Capture timestamps for operational metrics.
  const timestampMap = {
    [ORDER_STATES.CONFIRMED]: 'confirmedAt',
    [ORDER_STATES.PREPARING]: 'preparingAt',
    [ORDER_STATES.READY]: 'readyAt',
    [ORDER_STATES.COMPLETED]: 'completedAt',
  };
  if (timestampMap[nextStatus]) updatedOrder[timestampMap[nextStatus]] = now;

  if (nextStatus === ORDER_STATES.REJECTED) {
    updatedOrder.rejectionReason = rejectionReason || 'Ditolak oleh kasir';
    updatedOrder.rejectedAt = now;
    if (order.paymentStatus === PAYMENT_STATES.PAID) {
      updatedOrder.paymentStatus = PAYMENT_STATES.REFUNDED;
    }
  }

  if (paymentStatus && paymentStatus !== order.paymentStatus) {
    if (!canTransitionPayment(order.paymentStatus, paymentStatus)) {
      return {
        success: false,
        error: `Transisi pembayaran tidak valid: ${order.paymentStatus} → ${paymentStatus}`,
      };
    }
    updatedOrder.paymentStatus = paymentStatus;
    updatedOrder.paidAt = paymentStatus === PAYMENT_STATES.PAID ? now : order.paidAt;
  }

  return { success: true, newState: updatedOrder };
}

export function confirmOrder(order, paymentMethod = 'cash') {
  const payment = paymentMethod === 'cash' ? PAYMENT_STATES.PAID : PAYMENT_STATES.PAID;
  return processTransition(order, ORDER_STATES.CONFIRMED, {
    paymentStatus: payment,
  });
}

export function startPreparing(order) {
  return processTransition(order, ORDER_STATES.PREPARING);
}

export function markReady(order) {
  return processTransition(order, ORDER_STATES.READY);
}

export function completeOrder(order) {
  return processTransition(order, ORDER_STATES.COMPLETED);
}

export function rejectOrder(order, reason) {
  return processTransition(order, ORDER_STATES.REJECTED, { rejectionReason: reason });
}
