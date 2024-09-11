import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const addDisaster = async (disaster, token) => {
  return axios.post(`${API_URL}/disasters`, disaster, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getDisasters = async () => {
  return axios.get(`${API_URL}/disasters`);
};

export const fetchDisasters = async (location, category) => {
  return axios.get(`${API_URL}/fetch_disasters`, {
    params: { location, category }
  });
};
