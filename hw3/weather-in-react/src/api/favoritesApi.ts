import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Adjust this to match your backend URL

interface Favorite {
  zipCode: string;
  location: string;
}

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/favorites`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addFavorite = async (zipCode: string, location: string): Promise<Favorite> => {
  try {
    const response = await axios.post(`${BASE_URL}/favorites`, { zipCode, location });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const deleteFavorite = async (zipCode: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/favorites/${zipCode}`);
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw error;
  }
};
