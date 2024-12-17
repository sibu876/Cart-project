import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { username, email, password } = action.payload;
      const user = { username, email, password };
      localStorage.setItem('user', JSON.stringify(user));
     
    },
    logOut: (state) => {
      
      state.user = null;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        state.user = storedUser; 
      } else {
        throw new Error('Invalid email or password');
      }
    },
    forgotPassword: (state, action) => {
      const { email, password} = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      console.log('stored Email' , storedUser ? storedUser.email: ' no uer found')
      console.log('enaterd email' , email)
      
      if (storedUser && storedUser.email.trim().toLowerCase() === email.trim().toLowerCase()) {
        
          
          storedUser.password = password;
          localStorage.setItem('user', JSON.stringify(storedUser));
          state.user=storedUser;
         
        }
        else{
          console.log('error');
        }
  }

  },
});

export const { signup, logOut, login, forgotPassword } = authSlice.actions;
export default authSlice.reducer;
