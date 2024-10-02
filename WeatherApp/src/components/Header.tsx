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

  const styles = StyleSheet.create({
    header: {
      padding: 16,
    },
    searchBar: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchText: {
      color: colors.text,
      fontSize: 16,
    },
    icon: {
      marginRight: 8,
    },
  });

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={onPressSearch} style={styles.searchBar}>
        <AntDesign name="search1" size={20} color={colors.text} style={styles.icon} />
        <Text style={styles.searchText}>Enter a ZIP Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
