import axios from 'axios';

const premiumApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default premiumApi;
