import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerParamList, MainStackParamList } from '../navigation/types';

type ManageFavoritesScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Manage Favorites'>,
  StackNavigationProp<MainStackParamList>
>;

const ManageFavoritesScreen: React.FC = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigation = useNavigation<ManageFavoritesScreenNavigationProp>();

  const handleSelectFavorite = (zip: string) => {
    navigation.navigate('Home', {
      screen: 'Weather',
      params: { zipCode: zip },
    });
  };

  const handleDeleteFavorite = async (zip: string) => {
    try {
      await removeFavorite(zip);
    } catch (error) {
      Alert.alert('Error', 'Unable to delete favorite.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.zipCode}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <TouchableOpacity
              onPress={() => handleSelectFavorite(item.zipCode)}
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteTextCity}>{item.location.split(',')[0]}</Text>
              <Text style={styles.favoriteTextRegion}>
                {item.location.split(',')[1].slice(1) + ' (' + item.zipCode + ')'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteFavorite(item.zipCode)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.favoritesList}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  favoritesList: {},
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  favoriteButton: {
    flex: 1,
  },
  favoriteTextCity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteTextRegion: {
    fontSize: 14,
    color: '#666666',
  },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#0A84FF',
  },
});

export default ManageFavoritesScreen;
