import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../Interfaces/slice';


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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
