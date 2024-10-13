import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';

interface FavoritesManagerProps {
  currentZipCode: string;
  currentLocation: string;
  navigation: StackNavigationProp<MainStackParamList>;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ currentZipCode, currentLocation, navigation }) => {
  const { addFavorite, isFavorite, loading } = useContext(FavoritesContext);
  const { colors } = useTheme();

  const favoriteExists = isFavorite(currentZipCode);

  const handleAddFavorite = async () => {
    await addFavorite({ zipCode: currentZipCode, location: currentLocation });
  };

  const handleSetBackground = () => {
    navigation.navigate('SetBackground', { zipCode: currentZipCode });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : favoriteExists ? (
        <>
          <AntDesign name="heart" size={24} color="red" />
          <TouchableOpacity onPress={handleSetBackground} style={styles.setBackgroundButton}>
            <Text style={[styles.setBackgroundButtonText, { color: colors.primary }]}>Set Background</Text>
          </TouchableOpacity>
        </>
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
  setBackgroundButton: {
    marginTop: 8,
  },
  setBackgroundButtonText: {
    fontSize: 16,
  },
});

export default FavoritesManager;
