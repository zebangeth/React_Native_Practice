import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons
import { addFavorite, deleteFavorite, getFavorites } from '../api/favoritesApi';

interface FavoritesManagerProps {
  currentZipCode: string;
  currentLocation: string;
  onSelectFavorite: (zipCode: string) => void;
  refreshTrigger: boolean; // Add refresh trigger prop
}

interface Favorite {
  zipCode: string;
  location: string;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({
  currentZipCode,
  currentLocation,
  onSelectFavorite,
  refreshTrigger,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFavorite = favorites.some((fav) => fav.zipCode === currentZipCode);

  useEffect(() => {
    loadFavorites();
  }, [refreshTrigger]); // Reload favorites when refreshTrigger changes

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    try {
      await addFavorite(currentZipCode, currentLocation);
      loadFavorites();
    } catch (error) {
      Alert.alert('Error', 'Unable to add to favorites.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : isFavorite ? (
        <AntDesign name="heart" size={24} color="red" />
      ) : (
        <TouchableOpacity onPress={handleAddFavorite} style={styles.addButton}>
          <AntDesign name="hearto" size={24} color="red" style={styles.icon} />
          <Text style={styles.addButtonText}>Add to Favorites</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'red',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default FavoritesManager;
