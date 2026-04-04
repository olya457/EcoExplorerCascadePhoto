import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { WATERFALLS } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const openRandomLocation = () => {
    const randomItem = WATERFALLS[Math.floor(Math.random() * WATERFALLS.length)];
    navigation.navigate('WaterfallDetail', { waterfallId: randomItem.id });
  };

  const shareLocation = async (item: any) => {
    await Share.share({
      message: `${item.name}\n\n${item.description}`,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />

      <View style={styles.welcomeBlock}>
        <Image
          source={require('../assets/images/logo_small.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSub}>
          Explore nature and track{'\n'}your adventures.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.randomBtn}
        onPress={openRandomLocation}
        activeOpacity={0.9}
      >
        <Text style={styles.randomBtnText}>Open random location</Text>
      </TouchableOpacity>

      <FlatList
        data={WATERFALLS}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

            <View style={styles.cardText}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.cardButtonsRow}>
                <TouchableOpacity
                  style={styles.cardBtn}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('WaterfallDetail', { waterfallId: item.id })
                  }
                >
                  <Text style={styles.cardBtnText}>Open</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cardOutlineBtn}
                  activeOpacity={0.9}
                  onPress={() => shareLocation(item)}
                >
                  <Text style={styles.cardBtnText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },

  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },

  welcomeBlock: {
    alignItems: 'center',
    paddingTop: isVerySmall ? 18 : 24,
    paddingBottom: isVerySmall ? 10 : 12,
    paddingHorizontal: 16,
  },

  logo: {
    width: isVerySmall ? 58 : isSmall ? 64 : 70,
    height: isVerySmall ? 58 : isSmall ? 64 : 70,
    marginBottom: 6,
  },

  welcomeTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
  },

  welcomeSub: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 12 : 13,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: isVerySmall ? 17 : 19,
  },

  randomBtn: {
    marginHorizontal: isVerySmall ? 12 : 16,
    marginBottom: 12,
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 11 : 12,
  },

  randomBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: isVerySmall ? 13 : 14,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingBottom: isVerySmall ? 100 : 104,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.whiteAlpha10,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    minHeight: isVerySmall ? 98 : 108,
  },

  cardImage: {
    width: isVerySmall ? 90 : 100,
    height: '100%',
  },

  cardText: {
    flex: 1,
    paddingHorizontal: isVerySmall ? 10 : 12,
    paddingVertical: isVerySmall ? 10 : 12,
    justifyContent: 'center',
  },

  cardName: {
    color: colors.white,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  cardDesc: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 11 : 12,
    marginTop: 4,
    lineHeight: isVerySmall ? 15 : 17,
  },

  cardButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  cardBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 9 : 10,
  },

  cardOutlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.whiteAlpha30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 9 : 10,
  },

  cardBtnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isVerySmall ? 12 : 13,
  },
});