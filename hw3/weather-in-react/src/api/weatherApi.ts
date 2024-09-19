import axios from 'axios';

const API_KEY = '38719d51c1034abb95922102243008';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (zipCode: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: zipCode,
        days: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
