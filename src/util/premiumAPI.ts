import axios from 'axios';

const premiumApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application',
  },
});

export default premiumApi;
