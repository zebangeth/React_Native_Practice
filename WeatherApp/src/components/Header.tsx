import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  onPressSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPressSearch }) => {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={onPressSearch} style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.searchText}>Enter a ZIP Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  searchBar: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: '#000000',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default Header;
