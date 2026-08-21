import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents } from './eventsSlice';

const initialState = { ids: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      // Supports a persisted state created before this slice used `ids`.
      if (!Array.isArray(state.ids)) state.ids = [];
      const index = state.ids.indexOf(id);
      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      if (!Array.isArray(state.ids)) state.ids = [];
      const favoriteIds = action.payload
        .filter(event => event.isFavorite === 1)
        .map(event => String(event.event_date_id ?? event.id));
      favoriteIds.forEach(id => {
        if (!state.ids.includes(id)) state.ids.push(id);
      });
    });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavoriteIds = state => state.favorites?.ids || [];
export const selectIsFavorite = (state, id) =>
  selectFavoriteIds(state).includes(id);

export default favoritesSlice.reducer;
