import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User  } from '../../Interfaces/slice';


const initialState: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      
    },
    setUser(state, action: PayloadAction<User>) { 
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, logout,setUser } = authSlice.actions;
export default authSlice.reducer;
