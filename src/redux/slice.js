// slice.js
import { createSlice } from '@reduxjs/toolkit';
import { commonApi } from './api';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const responseSlice = createSlice({
  name: 'responseSlice',
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
  responseSlice.actions;

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

    const dataObject = responses.reduce((acc, response, index) => {
      console.log(requests);
      const { key } = requests[index];
      acc[key] = response; // Assign the response to the key
      return acc;
    }, {});

    dispatch(fetchDataSuccess(dataObject));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default responseSlice.reducer;
