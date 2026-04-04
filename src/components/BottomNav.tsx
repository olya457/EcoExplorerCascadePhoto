import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';

const NAV_ITEMS = [
  { icon: '📍', route: 'Map' },
  { icon: '📷', route: 'Camera' },
  { icon: '🖼️', route: 'Gallery' },
  { icon: '❓', route: 'Quiz' },
  { icon: '📖', route: 'Stories' },
];

export default function BottomNav() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = route.name === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.item}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {item.icon}
            </Text>
            <View style={[styles.dot, isActive && styles.dotActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.navBg,
    borderTopWidth: 1,
    borderTopColor: colors.whiteAlpha10,
    paddingBottom: 24,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  dotActive: {
    backgroundColor: colors.accent,
  },
});