import {
  useContext,
  useReducer,
  useEffect,
  createContext,
  useState,
} from 'react';

import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  DISPLAY,
  REMOVE,
  LOADING,
} from './actions';

import cartItems from './data';

import reducer from './reducer';
import { getTotals } from './utils';
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(),
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }
  function removeItem(id) {
    dispatch({ type: REMOVE, payload: { id } });
  }
  function increaseAmount(id) {
    dispatch({ type: INCREASE, payload: { id } });
  }

  function decreaseAmount(id) {
    dispatch({ type: DECREASE, payload: { id } });
  }

  async function fetchData() {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(url);
      if (response.ok) {
        const cart = await response.json();
        dispatch({ type: DISPLAY, payload: { cart } });
        console.log(cart);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
