import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useTheme } from '@react-navigation/native';

interface FavoritesManagerProps {
  currentZipCode: string;
  currentLocation: string;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ currentZipCode, currentLocation }) => {
  const { addFavorite, isFavorite, loading } = useContext(FavoritesContext);
  const { colors } = useTheme();

  const favoriteExists = isFavorite(currentZipCode);

  const handleAddFavorite = async () => {
    await addFavorite({ zipCode: currentZipCode, location: currentLocation });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : favoriteExists ? (
        <AntDesign name="heart" size={24} color="red" />
      ) : (
        <TouchableOpacity onPress={handleAddFavorite} style={styles.addButton}>
          <AntDesign name="hearto" size={24} color="red" style={styles.icon} />
          <Text style={[styles.addButtonText, { color: colors.primary }]}>Add to Favorites</Text>
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
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default FavoritesManager;
