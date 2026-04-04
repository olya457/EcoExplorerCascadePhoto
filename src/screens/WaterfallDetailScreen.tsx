import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Share,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { WATERFALLS } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

const waterfallCoords: Record<string, { latitude: number; longitude: number }> = {
  '1': { latitude: 48.5767, longitude: -123.4707 },
  '2': { latitude: 48.4607, longitude: -123.3159 },
  '3': { latitude: 48.6501, longitude: -123.5694 },
  '4': { latitude: 48.5142, longitude: -123.4189 },
  '5': { latitude: 48.5584, longitude: -123.4521 },
};

export default function WaterfallDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const wf = WATERFALLS.find((w) => w.id === route.params.waterfallId) || WATERFALLS[0];
  const [factIndex, setFactIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const coords = waterfallCoords[wf.id] || { latitude: 48.4284, longitude: -123.3656 };

  const region = useMemo(
    () => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }),
    [coords.latitude, coords.longitude]
  );

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % wf.facts.length);
  };

  const shareLocation = async () => {
    await Share.share({
      message: `${wf.name}\n\n${wf.description}\n\nFact: ${wf.facts[factIndex]}`,
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

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} activeOpacity={0.85}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={wf.image}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <Text style={styles.title}>{wf.name}</Text>
        <Text style={styles.desc}>{wf.description}</Text>

        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setShowMap((prev) => !prev)}
          activeOpacity={0.9}
        >
          <Text style={styles.mapBtnText}>{showMap ? 'Hide map' : 'Open map'}</Text>
        </TouchableOpacity>

        {showMap && (
          <View style={styles.miniMapCard}>
            <MapView
              style={styles.map}
              initialRegion={region}
              region={region}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                title={wf.name}
                description={wf.description}
              />
            </MapView>
          </View>
        )}

        <View style={styles.factBox}>
          <Text style={styles.factText}>{wf.facts[factIndex]}</Text>
        </View>

        <TouchableOpacity style={styles.greenBtn} onPress={nextFact} activeOpacity={0.9}>
          <Text style={styles.btnText}>Generate another fact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineBtn}
          activeOpacity={0.9}
          onPress={shareLocation}
        >
          <Text style={styles.btnText}>Share</Text>
        </TouchableOpacity>
      </ScrollView>
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

  back: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? (isVerySmall ? 48 : 54) : (isVerySmall ? 38 : 44),
    left: isVerySmall ? 12 : 16,
    zIndex: 10,
    padding: isVerySmall ? 8 : 10,
    backgroundColor: colors.whiteAlpha20,
    borderRadius: 20,
  },

  backText: {
    color: colors.white,
    fontSize: isVerySmall ? 16 : 18,
    fontWeight: '600',
  },

  scrollView: {
    flex: 1,
  },

  scroll: {
    paddingTop: isVerySmall ? 110 : isSmall ? 116 : 120,
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingBottom: isVerySmall ? 30 : 36,
  },

  mainImage: {
    width: '100%',
    height: isVerySmall ? 180 : isSmall ? 190 : 200,
    borderRadius: 16,
    marginBottom: 16,
  },

  title: {
    color: colors.white,
    fontSize: isVerySmall ? 20 : 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  desc: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 12 : 13,
    lineHeight: isVerySmall ? 18 : 20,
    marginBottom: 14,
  },

  mapBtn: {
    borderWidth: 1,
    borderColor: colors.whiteAlpha20,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 11 : 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  mapBtnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isVerySmall ? 13 : 14,
  },

  miniMapCard: {
    width: '100%',
    height: isVerySmall ? 120 : isSmall ? 130 : 140,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.whiteAlpha10,
    alignSelf: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  factBox: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: 16,
    padding: isVerySmall ? 14 : 16,
    marginBottom: 12,
  },

  factText: {
    color: colors.white,
    fontSize: isVerySmall ? 14 : 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: isVerySmall ? 20 : 22,
  },

  greenBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 12 : 13,
    marginBottom: 10,
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: colors.whiteAlpha30,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 12 : 13,
    marginBottom: 10,
  },

  btnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isVerySmall ? 13 : 14,
  },
});