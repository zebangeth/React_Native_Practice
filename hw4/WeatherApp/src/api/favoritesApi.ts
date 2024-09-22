import axios from 'axios';
import { Platform } from 'react-native';

const IOS_BASE_URL = 'http://localhost:3000';
const ANDROID_BASE_URL = 'http://10.0.2.2:3000';

interface Favorite {
  zipCode: string;
  location: string;
}

export const getFavorites = async (): Promise<Favorite[]> => {
  const BASE_URL = Platform.OS === 'ios' ? IOS_BASE_URL : ANDROID_BASE_URL;
  const response = await axios.get(`${BASE_URL}/favorites`);
  return response.data;
};

export const addFavorite = async (zipCode: string, location: string): Promise<Favorite> => {
  const BASE_URL = Platform.OS === 'ios' ? IOS_BASE_URL : ANDROID_BASE_URL;
  const response = await axios.post(`${BASE_URL}/favorites`, { zipCode, location });
  return response.data;
};

export const deleteFavorite = async (zipCode: string): Promise<void> => {
  const BASE_URL = Platform.OS === 'ios' ? IOS_BASE_URL : ANDROID_BASE_URL;
  await axios.delete(`${BASE_URL}/favorites/${zipCode}`);
};
