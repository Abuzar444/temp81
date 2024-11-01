import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  DISPLAY,
  REMOVE,
  LOADING,
} from './actions';

function reducer(state, action) {
  const { type, payload } = action;
  if (type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(payload.id);
    return { ...state, cart: newCart };
  }

  if (type === INCREASE) {
    const newCart = new Map(state.cart);

    const item = newCart.get(payload.id);
    const newItem = { ...item, amount: item.amount++ };
    newCart.set(payload.id, newItem);

    return { ...state, cart: newCart };
  }

  if (type === DECREASE) {
    const newCart = new Map(state.cart);

    const item = newCart.get(payload.id);

    if (item.amount < 1) {
      newCart.delete(payload.id);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: --item.amount };
    newCart.set(payload.id, newItem);

    return { ...state, cart: newCart };
  }

  if (type === LOADING) {
    return { ...state, loading: true };
  }

  if (type === DISPLAY) {
    const newCart = new Map(payload.cart.map((item) => [item.id, item]));
    return {
      ...state,
      cart: newCart,
      loading: false,
    };
  }
  throw new Error(`no matching action type: ${type}`);
}

export default reducer;
