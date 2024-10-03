import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useNavigation, CompositeNavigationProp, useTheme } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerParamList, MainStackParamList } from '../navigation/types';

type ManageFavoritesScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Manage Favorites'>,
  StackNavigationProp<MainStackParamList>
>;

const ManageFavoritesScreen: React.FC = () => {
  const { colors } = useTheme();
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigation = useNavigation<ManageFavoritesScreenNavigationProp>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
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
      color: colors.text,
    },
    favoriteTextRegion: {
      fontSize: 14,
      color: colors.text,
    },
    deleteButton: {
      marginLeft: 8,
      padding: 8,
      backgroundColor: 'transparent',
    },
    deleteButtonText: {
      fontSize: 18,
      color: colors.primary,
    },
  });

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

export default ManageFavoritesScreen;
