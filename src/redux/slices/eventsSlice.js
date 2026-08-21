import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Strings from '../../assets/strings';
import API from '../../network/NetworkService';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getEventsListing();
      if (response?.success === false) {
        return rejectWithValue(
          response.message || Strings.errors.eventsFetchFailed,
        );
      }
      return response?.data?.events || [];
    } catch (error) {
      return rejectWithValue(
        error?.message ||
          error?.data?.message ||
          Strings.errors.eventsFetchFailed,
      );
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectEvents = state => state.events.items;
export const selectEventsLoading = state => state.events.loading;
export const selectEventById = (state, eventDateId) =>
  state.events.items.find(event => event.event_date_id === eventDateId);

export default eventsSlice.reducer;
