import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Strings from '../../assets/strings';
import API from '../../network/NetworkService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.login(email, password);
      const data = response?.data || response;

      if (response?.success === false || !data?.token) {
        return rejectWithValue(response?.message || Strings.errors.loginFailed);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.message || error?.data?.message || Strings.errors.loginFailed,
      );
    }
  },
);

const initialState = {
  isAuthenticated: false,
  name: '',
  email: '',
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInAsGuest: state => {
      state.isAuthenticated = true;
      state.name = Strings.guestName;
      state.email = '';
      state.token = null;
      state.user = null;
    },
    signOut: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user || {};
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = user;
        state.name = user.usr_fname || user.name || '';
        state.email = user.usr_email || user.email || '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { signInAsGuest, signOut } = authSlice.actions;
export const selectAuth = state => state.auth;

export default authSlice.reducer;
