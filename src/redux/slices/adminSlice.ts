import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminAuthState } from '../../Interfaces/slice';


const initialState: AdminAuthState = {
  admin: null,
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AdminAuthState>) {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    adminLogout(state) {
      state.admin = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, adminLogout } = authSlice.actions;
export default authSlice.reducer;
