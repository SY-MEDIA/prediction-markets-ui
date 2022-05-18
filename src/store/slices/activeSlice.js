import { createSlice } from '@reduxjs/toolkit';
import { setActiveMarket } from 'store/thunks/setActiveMarket';

export const activeSlice = createSlice({
  name: 'active',
  initialState: {
    address: null,
    status: 'not selected', // selected, loaded,
    stateVars: {},
    category: null,
    params: {},
    recentEvents: [],
    dailyCandles: []
  },
  reducers: {
    setActiveMarketAddress: (state, action) => {
      state.address = action.payload;
      state.status = 'loading';
    },
    updateStateForActualMarket: (state, action) => {
      const { diff, address } = action.payload;

      if (state.address === address) {
        state.stateVars = { ...state.stateVars, ...diff }
      }
    },
    addRecentEvent: (state, action) => {
      state.recentEvents.push(action.payload);
    }
  },
  extraReducers: {
    // [loadMarkets.pending]: (state, action) => {
    //   state.status = 'loading';
    // },
    [setActiveMarket.fulfilled]: (state, action) => {
      const { params, stateVars, category, recentEvents, dailyCandles } = action.payload;

      state.params = params;
      state.stateVars = stateVars;
      state.category = category;
      state.recentEvents = recentEvents;
      state.dailyCandles = dailyCandles;
      state.status = 'loaded';
    },
    [setActiveMarket.rejected]: (state, action) => {
      state.status = 'error';
    },
  }
});

export const {
  setActiveMarketAddress,
  updateStateForActualMarket,
  addRecentEvent
} = activeSlice.actions;

export default activeSlice.reducer;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.value)`

export const selectActiveMarketStatus = state => state.active.status;
export const selectActiveMarketParams = state => state.active.params || {};
export const selectActiveMarketStateVars = state => state.active.stateVars || {};
export const selectActiveCategory = state => state.active.category || 'No category';
export const selectActiveAddress = state => state.active.address;
export const selectActiveRecentEvents = state => state.active.recentEvents;
export const selectActiveDailyCandles = state => state.active.dailyCandles;