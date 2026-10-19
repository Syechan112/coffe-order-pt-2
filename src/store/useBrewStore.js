
import { create } from 'zustand';
import { generateOrderId, getSeedState } from '../data/seedData';
import {
  processTransition,
  ORDER_STATES,
  PAYMENT_STATES,
} from '../services/orderTransitions';
import {
  loadState,
  saveState,
  subscribeToStorage,
} from '../services/demoStorageService';

const initialSeed = getSeedState();

const useBrewStore = create((set, get) => ({
  orders: initialSeed.orders,
  orderCounter: initialSeed.orderCounter,
  products: initialSeed.products,
  categories: initialSeed.categories,
  tables: initialSeed.tables,
  schemaVersion: initialSeed.schemaVersion,
  lastUpdated: initialSeed.lastUpdated,
  activeRole: 'role-customer',
  cart: [],
  selectedTableId: null,
  selectedProduct: null,
  lastOrderId: null,
  notification: null,

  loadFromStorage: () =>
    set(() => {
      const persisted = loadState();

      return {
        orders: persisted.orders?.length ? persisted.orders : initialSeed.orders,
        orderCounter: persisted.orderCounter || initialSeed.orderCounter,
        products: persisted.products?.length ? persisted.products : initialSeed.products,
        categories: persisted.categories?.length ? persisted.categories : initialSeed.categories,
        tables: persisted.tables?.length ? persisted.tables : initialSeed.tables,
        schemaVersion: persisted.schemaVersion || initialSeed.schemaVersion,
        lastUpdated: persisted.lastUpdated || initialSeed.lastUpdated,
        lastOrderId: persisted.lastOrderId ?? null,
        cart: persisted.cart ?? [],
        selectedTableId: persisted.selectedTableId ?? null,
      };
    }),

  syncFromExternal: (externalState) =>
    set({
      orders: externalState.orders ?? get().orders,
      orderCounter: externalState.orderCounter ?? get().orderCounter,
      products: externalState.products ?? get().products,
      categories: externalState.categories ?? get().categories,
      tables: externalState.tables ?? get().tables,
      lastUpdated: externalState.lastUpdated ?? get().lastUpdated,
      lastOrderId: externalState.lastOrderId ?? get().lastOrderId,
    }),

  resetDemo: () => {
    const seed = getSeedState();
    localStorage.removeItem('brewflow_state');
    set(seed);
  },

  setActiveRole: (role) => set({ activeRole: role }),

  addToCart: (product, customization = null, quantity = 1, addOnPrice = 0) => {
    const priceAtPurchase = product.price + addOnPrice;
    const item = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      snapshotName: product.name,
      priceAtPurchase,
      quantity,
      customization,
      subtotal: priceAtPurchase * quantity,
      notes: '',
    };

    set((state) => {
      const cart = [...state.cart, item];
      saveState({ ...state, cart });
      return { cart };
    });
  },

  updateCartItem: (itemId, quantity) =>
    set((state) => {
      const cart = state.cart.map((item) =>
        item.id === itemId
          ? {
            ...item,
            quantity,
            subtotal: item.priceAtPurchase * quantity,
          }
          : item
      );
      saveState({ ...state, cart });
      return { cart };
    }),

  removeCartItem: (itemId) =>
    set((state) => {
      const cart = state.cart.filter((item) => item.id !== itemId);
      saveState({ ...state, cart });
      return { cart };
    }),

  clearCart: () =>
    set((state) => {
      saveState({ ...state, cart: [] });
      return { cart: [] };
    }),

  clearTrackedOrder: () =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== state.lastOrderId),
      lastOrderId: null,
      cart: [],
    })),

  addProduct: (product) => {
    set((state) => {
      const products = [...state.products, product];
      saveState({ ...state, products });
      return { products };
    });
  },

  generateTables: (count, zone = 'Indoor', prefix = 'T') => {
    set((state) => {
      let counter = 1;
      const newTables = Array.from({ length: count }, () => {
        while (state.tables.some((t) => t.id === `${prefix}-${String(counter).padStart(2, '0')}`)) {
          counter += 1;
        }
        const id = `${prefix}-${String(counter).padStart(2, '0')}`;
        counter += 1;
        return {
          id,
          name: `Meja ${id}`,
          capacity: 4,
          zone,
        };
      });
      const tables = [...state.tables, ...newTables];
      saveState({ ...state, tables });
      return { tables };
    });
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  setCartTable: (tableId) => {
    set((state) => {
      const selectedTableId = tableId || null;
      saveState({ ...state, selectedTableId });
      return { selectedTableId };
    });
  },

  createOrder: (orderData) => {
    const counter = get().orderCounter + 1;

    const order = {
      id: generateOrderId(),
      orderNumber: counter,
      type: orderData.type,
      table: orderData.type === 'dine-in' ? orderData.table : null,
      items: orderData.items.map((item) => ({
        productId: item.productId,
        snapshotName: item.snapshotName,
        priceAtPurchase: item.priceAtPurchase,
        quantity: item.quantity,
        customization: item.customization,
        subtotal: item.priceAtPurchase * item.quantity,
      })),
      totalAmount: orderData.items.reduce(
        (sum, item) => sum + item.priceAtPurchase * item.quantity,
        0
      ),
      status: ORDER_STATES.PENDING_CONFIRMATION,
      paymentStatus:
        orderData.paymentMethod === 'cash'
          ? PAYMENT_STATES.PAID
          : PAYMENT_STATES.PENDING,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes || '',
      createdAt: new Date().toISOString(),
      confirmedAt: null,
      preparingAt: null,
      readyAt: null,
      completedAt: null,
      rejectedAt: null,
    };

    set((state) => {
      const orders = [order, ...state.orders];
      const lastUpdated = new Date().toISOString();

      saveState({
        orders,
        orderCounter: counter,
        products: state.products,
        categories: state.categories,
        tables: state.tables,
        schemaVersion: state.schemaVersion,
        lastOrderId: order.id,
        lastUpdated,
        cart: [],
      });

      return {
        orders,
        orderCounter: counter,
        lastOrderId: order.id,
        lastUpdated,
        cart: [],
      };
    });

    get().setNotification(
      `Pesanan #${order.orderNumber} berhasil diterima!`,
      'success'
    );

    return order;
  },

  transitionOrder: (orderId, nextStatus, options = {}) => {
    const order = get().orders.find((item) => item.id === orderId);

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    const result = processTransition(order, nextStatus, options);

    if (!result.success) return result;

    set((state) => {
      const orders = state.orders.map((item) =>
        item.id === orderId ? result.newState : item
      );
      const lastUpdated = new Date().toISOString();

      saveState({
        orders,
        orderCounter: state.orderCounter,
        products: state.products,
        categories: state.categories,
        tables: state.tables,
        schemaVersion: state.schemaVersion,
        lastUpdated,
      });

      return { orders, lastUpdated };
    });

    return result;
  },

  confirmOrder: (orderId) =>
    get().transitionOrder(orderId, ORDER_STATES.CONFIRMED, {
      paymentStatus: PAYMENT_STATES.PAID,
    }),

  startPreparing: (orderId) =>
    get().transitionOrder(orderId, ORDER_STATES.PREPARING),

  markReady: (orderId) =>
    get().transitionOrder(orderId, ORDER_STATES.READY),

  completeOrder: (orderId) =>
    get().transitionOrder(orderId, ORDER_STATES.COMPLETED),

  rejectOrder: (orderId, reason) =>
    get().transitionOrder(orderId, ORDER_STATES.REJECTED, {
      rejectionReason: reason,
    }),

  setNotification: (message, type = 'info', duration = 4000) => {
    set({
      notification: {
        message,
        type,
        id: Date.now(),
      },
    });

    if (duration > 0) {
      window.setTimeout(() => get().clearNotification(), duration);
    }
  },

  clearNotification: () => set({ notification: null }),
}));

const unsub = subscribeToStorage((externalState) => {
  useBrewStore.getState().syncFromExternal(externalState);
});

useBrewStore._storageUnsub = unsub;

export default useBrewStore;
