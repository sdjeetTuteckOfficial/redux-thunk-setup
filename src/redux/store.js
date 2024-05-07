import { configureStore } from '@reduxjs/toolkit';
import myReducer from './slice';

const store = configureStore({
  reducer: {
    responseSlice: myReducer,
  },
});

export default store;
