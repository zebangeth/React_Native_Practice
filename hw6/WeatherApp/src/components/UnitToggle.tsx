import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface UnitToggleProps {
  isMetric: boolean;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ isMetric, onToggle }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Imperial</Text>
      <Switch value={isMetric} onValueChange={onToggle} thumbColor={colors.primary} />
      <Text style={[styles.label, { color: colors.text }]}>Metric</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  label: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

export default UnitToggle;
