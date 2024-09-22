import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getFavorites, deleteFavorite } from '../api/favoritesApi';
import { getWeatherData } from '../api/weatherApi';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (zipCode: string) => void;
}

interface Favorite {
  zipCode: string;
  location: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onSelectLocation }) => {
  const [zipCode, setZipCode] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (zipCode.length === 5 && /^\d+$/.test(zipCode)) {
      fetchSearchResult(zipCode);
    } else {
      setSearchResult(null);
    }
  }, [zipCode]);

  useEffect(() => {
    if (visible) {
      loadFavorites();
    }
  }, [visible]);

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

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleSelectLocation = () => {
    onSelectLocation(zipCode);
    onClose();
  };

  const handleSelectFavorite = (zip: string) => {
    onSelectLocation(zip);
    onClose();
  };

  const handleDeleteFavorite = async (zip: string) => {
    try {
      await deleteFavorite(zip);
      loadFavorites();
    } catch (error) {
      Alert.alert('Error', 'Unable to delete favorite.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.searchHeader}>
          <View style={styles.searchInputContainer}>
            <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter a ZIP Code"
              keyboardType="numeric"
              value={zipCode}
              onChangeText={setZipCode}
            />
          </View>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
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
                <Text style={styles.favoriteTextRegion}>{item.location.split(',')[1].slice(1) + " (" + item.zipCode + ")"}</Text>
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
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
  },
  cancelButton: {
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#0A84FF',
    fontSize: 16,
  },
  loader: {
    marginTop: 16,
  },
  searchResult: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  resultText: {
    fontSize: 18,
  },
  noResult: {
    padding: 16,
    fontSize: 16,
    color: 'red',
  },
  favoritesTitle: {
    padding: 16,
    fontSize: 20,
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

export default SearchModal;
