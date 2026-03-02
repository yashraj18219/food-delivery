const CART_KEY = "cart_items";

const getStored = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    // ignore
  }
  return [];
};

const save = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  if (listener) listener();
};

let listener = null;
export const setCartListener = (fn) => {
  listener = fn;
};

export const getCart = () => getStored();

export const addItem = (payload) => {
  const items = getStored();
  const existing = items.find((i) => i.id === payload.id);
  if (existing) {
    save(
      items.map((i) =>
        i.id === payload.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  } else {
    save([...items, { ...payload, quantity: 1 }]);
  }
};

export const removeItem = (id) => {
  const items = getStored();
  const item = items.find((i) => i.id === id);
  if (!item) return;
  if (item.quantity === 1) {
    save(items.filter((i) => i.id !== id));
  } else {
    save(
      items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  }
};

export const clearCart = () => save([]);
