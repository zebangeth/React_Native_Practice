import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FavoritesContext } from '../contexts/FavoritesContext';

interface FavoritesManagerProps {
  currentZipCode: string;
  currentLocation: string;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ currentZipCode, currentLocation }) => {
  const { addFavorite, isFavorite, loading } = useContext(FavoritesContext);

  const favoriteExists = isFavorite(currentZipCode);

  const handleAddFavorite = async () => {
    await addFavorite({ zipCode: currentZipCode, location: currentLocation });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : favoriteExists ? (
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
