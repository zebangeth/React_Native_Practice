import React, { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { getWeatherData } from '../api/weatherApi';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { useTheme } from '@react-navigation/native';

type SearchScreenProps = NativeStackScreenProps<MainStackParamList, 'Search'>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [zipCode, setZipCode] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const styles = StyleSheet.create({
    searchHeader: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    searchIcon: {
      marginRight: 0,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      padding: 10,
      color: colors.text,
    },
    cancelButton: {
      marginLeft: 8,
    },
    cancelButtonText: {
      color: colors.primary,
      fontSize: 16,
    },
    loader: {
      marginTop: 16,
    },
    searchResult: {
      padding: 16,
      backgroundColor: colors.card,
    },
    resultText: {
      fontSize: 18,
      color: colors.text,
    },
    noResult: {
      padding: 16,
      fontSize: 16,
      color: 'red',
    },
    favoritesTitle: {
      padding: 16,
      fontSize: 20,
      color: colors.text,
    },
    favoritesList: {
      paddingHorizontal: 16,
    },
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

  useEffect(() => {
    if (zipCode.length === 5 && /^\d+$/.test(zipCode)) {
      fetchSearchResult(zipCode);
    } else {
      setSearchResult(null);
    }
  }, [zipCode]);

  const fetchSearchResult = async (zip: string) => {
    setLoading(true);
    try {
      const data = await getWeatherData(zip);
      setSearchResult({
        zipCode: zip,
        location: `${data.location.name}, ${data.location.region}`,
      });
    } catch (error) {
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = () => {
    navigation.navigate('Weather', { zipCode });
  };

  const handleSelectFavorite = (zip: string) => {
    navigation.navigate('Weather', { zipCode: zip });
  };

  const handleDeleteFavorite = async (zip: string) => {
    try {
      await removeFavorite(zip);
    } catch (error) {
      Alert.alert('Error', 'Unable to delete favorite.');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={20} color={colors.text} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter a ZIP Code"
            placeholderTextColor={colors.text}
            keyboardType="numeric"
            value={zipCode}
            onChangeText={setZipCode}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : searchResult ? (
        <TouchableOpacity onPress={handleSelectLocation} style={styles.searchResult}>
          <Text style={styles.resultText}>{searchResult.location}</Text>
        </TouchableOpacity>
      ) : (
        zipCode.length === 5 && <Text style={styles.noResult}>Location not found.</Text>
      )}
      <Text style={styles.favoritesTitle}>Favorites</Text>
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
    </SafeAreaProvider>
  );
};

export default SearchScreen;
