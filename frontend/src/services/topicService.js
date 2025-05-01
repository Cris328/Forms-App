import axios from 'axios';

const API_URL = 'http://localhost:5500/api/v1/topics';

export const fetchTopics = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
