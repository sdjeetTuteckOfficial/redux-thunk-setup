// slice.js
import { createSlice } from '@reduxjs/toolkit';
import { commonApi } from './api';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  mySlice.actions;

export const fetchMyData = (requests) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const responses = await Promise.all(
      requests.map(async (req) => {
        const { url, method, data, token } = req;
        switch (method) {
          case 'GET':
            return await commonApi.get(url, data, token);
          case 'POST':
            return await commonApi.post(url, data, token);
          case 'PUT':
            return await commonApi.put(url, { ...data, token });
          case 'PATCH':
            return await commonApi.patch(url, { ...data, token });
          default:
            throw new Error('Unsupported method');
        }
      })
    );
    dispatch(fetchDataSuccess(responses));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
export default mySlice.reducer;
