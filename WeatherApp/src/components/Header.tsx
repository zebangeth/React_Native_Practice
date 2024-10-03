import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

interface HeaderProps {
  onPressSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPressSearch }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.header, { backgroundColor: colors.headerBackground }]}>
      <TouchableOpacity onPress={onPressSearch} style={[styles.searchBar, { backgroundColor: colors.buttonBackground }]}>
        <AntDesign name="search1" size={20} color={colors.icon} style={styles.icon} />
        <Text style={[styles.searchText, { color: colors.text }]}>Enter a ZIP Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  searchBar: {
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default Header;
