import { configureStore } from '@reduxjs/toolkit';
import myReducer from './slice'; // Import your slice reducer

const store = configureStore({
  reducer: {
    mySlice: myReducer, // Add your slice reducer to the root reducer
  },
});

export default store;
