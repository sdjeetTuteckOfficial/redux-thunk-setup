import axios from 'axios';

export const commonApi = {
  get: async (url, params) => {
    const response = await axios.get(url, { params });
    return response.data;
  },
  post: async (url, data) => {
    const response = await axios.post(url, data);
    return response.data;
  },
  put: async (url, data) => {
    const response = await axios.put(url, data);
    return response.data;
  },
  patch: async (url, data) => {
    const response = await axios.patch(url, data);
    return response.data;
  },
};
