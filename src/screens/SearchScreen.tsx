import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  FlatList, TextInput, Dimensions, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import BottomNav from '../components/BottomNav';
import { WATERFALLS } from '../data';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? WATERFALLS.filter((w) => w.name.toLowerCase().includes(query.toLowerCase()))
    : [];
  const noResults = query.trim().length > 0 && filtered.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={require('../assets/images/bg.png')} style={styles.bgImage} resizeMode="cover" />

      <View style={styles.searchRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.whiteAlpha50}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {noResults ? (
        <View style={styles.empty}>
          <Image
            source={require('../assets/images/guide_quiz.png')}
            style={styles.guideImg}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No matches were found for your query!</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('WaterfallDetail', { waterfallId: item.id })}
            >
              <Image source={item.image} style={styles.cardImg} resizeMode="cover" />
              <View style={styles.cardText}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDark },
  bgImage: { ...StyleSheet.absoluteFillObject, width, height },
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.whiteAlpha10, borderRadius: 12,
    marginHorizontal: 16, marginTop: 52,
    paddingHorizontal: 12, paddingVertical: 10, gap: 10,
  },
  backText: { color: colors.white, fontSize: 18, fontWeight: '600' },
  searchInput: { flex: 1, color: colors.white, fontSize: 15 },
  clearText: { color: colors.whiteAlpha50, fontSize: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  guideImg: { width: 200, height: 300, marginBottom: 20 },
  emptyText: { color: colors.white, fontSize: 16, textAlign: 'center', fontWeight: '500' },
  card: {
    flexDirection: 'row', backgroundColor: colors.whiteAlpha10,
    borderRadius: 12, marginBottom: 10, overflow: 'hidden',
  },
  cardImg: { width: 90, height: 75 },
  cardText: { flex: 1, padding: 10, justifyContent: 'center' },
  cardName: { color: colors.white, fontSize: 14, fontWeight: '700' },
  cardDesc: { color: colors.whiteAlpha80, fontSize: 12, marginTop: 4 },
});