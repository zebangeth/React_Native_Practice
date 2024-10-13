import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Favorite {
  zipCode: string;
  location: string;
  backgroundImageUri?: string;
  invertTextColor?: boolean;
}

interface FavoritesContextProps {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => Promise<void>;
  removeFavorite: (zipCode: string) => Promise<void>;
  isFavorite: (zipCode: string) => boolean;
  updateFavorite: (zipCode: string, updates: Partial<Favorite>) => Promise<void>;
  getFavoriteByZipCode: (zipCode: string) => Favorite | undefined;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  isFavorite: () => false,
  updateFavorite: async () => {},
  getFavoriteByZipCode: () => undefined,
  loading: false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (favoritesToSave: Favorite[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesToSave));
      setFavorites(favoritesToSave);
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  const addFavorite = async (favorite: Favorite) => {
    const existingIndex = favorites.findIndex(fav => fav.zipCode === favorite.zipCode);
    if (existingIndex === -1) {
      const updatedFavorites = [...favorites, favorite];
      await saveFavorites(updatedFavorites);
    }
  };

  const removeFavorite = async (zipCode: string) => {
    const updatedFavorites = favorites.filter(fav => fav.zipCode !== zipCode);
    await saveFavorites(updatedFavorites);
  };

  const isFavorite = (zipCode: string) => {
    return favorites.some(fav => fav.zipCode === zipCode);
  };

  const updateFavorite = async (zipCode: string, updates: Partial<Favorite>) => {
    const index = favorites.findIndex(fav => fav.zipCode === zipCode);
    if (index !== -1) {
      const updatedFavorite = { ...favorites[index], ...updates };
      const updatedFavorites = [...favorites];
      updatedFavorites[index] = updatedFavorite;
      await saveFavorites(updatedFavorites);
    }
  };

  const getFavoriteByZipCode = (zipCode: string): Favorite | undefined => {
    return favorites.find(fav => fav.zipCode === zipCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, updateFavorite, getFavoriteByZipCode, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
