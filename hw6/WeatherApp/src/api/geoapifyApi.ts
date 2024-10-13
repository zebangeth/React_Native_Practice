import axios from 'axios';

const GEOAPIFY_API_KEY = 'b5491c50de6e44a5b4e27fbbcb9eb1a0';

export const getZipCode = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/reverse', {
      params: {
        lat: latitude,
        lon: longitude,
        apiKey: GEOAPIFY_API_KEY,
        format: 'json',
      },
    });
    const data = response.data;
    if (data && data.results && data.results.length > 0) {
      const zipCode = data.results[0].postcode;
      return zipCode;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching ZIP code from Geoapify:', error);
    return null;
  }
};