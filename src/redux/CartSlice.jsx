import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    
    decreaseQuatity: (state,action) =>{
      const item =action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem && existingItem.quantity >1){
        existingItem.quantity -=1;
        existingItem.total = existingItem.quantity * existingItem.price;

      } 
    }
   
  },
});

export const { addtoCart, removeFromCart, clearCart, decreaseQuatity} = CartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.total, 0).toFixed(2);

export default CartSlice.reducer;
