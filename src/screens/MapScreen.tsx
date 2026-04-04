import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { WATERFALLS, Waterfall } from '../data';

const { height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView | null>(null);
  const [selectedWaterfall, setSelectedWaterfall] = useState<Waterfall | null>(null);

  const initialRegion = useMemo<Region>(
    () => ({
      latitude: 56,
      longitude: -96,
      latitudeDelta: 35,
      longitudeDelta: 45,
    }),
    []
  );

  const openRandomLocation = () => {
    const randomItem = WATERFALLS[Math.floor(Math.random() * WATERFALLS.length)];
    navigation.navigate('WaterfallDetail', { waterfallId: randomItem.id });
  };

  const focusOnLocation = (lat: number, lng: number) => {
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 6,
        longitudeDelta: 6,
      },
      450
    );
  };

  const zoomIn = async () => {
    const camera = await mapRef.current?.getCamera();
    if (!camera) return;
    const nextZoom = Math.min((camera.zoom ?? 4) + 1, 18);
    mapRef.current?.animateCamera({ ...camera, zoom: nextZoom }, { duration: 250 });
  };

  const zoomOut = async () => {
    const camera = await mapRef.current?.getCamera();
    if (!camera) return;
    const nextZoom = Math.max((camera.zoom ?? 4) - 1, 2);
    mapRef.current?.animateCamera({ ...camera, zoom: nextZoom }, { duration: 250 });
  };

  const resetMap = () => {
    setSelectedWaterfall(null);
    mapRef.current?.animateToRegion(initialRegion, 450);
  };

  const handleMarkerPress = (waterfall: Waterfall) => {
    setSelectedWaterfall(waterfall);
    focusOnLocation(waterfall.location.lat, waterfall.location.lng);
  };

  const handleOpenDetail = () => {
    if (!selectedWaterfall) return;
    navigation.navigate('WaterfallDetail', {
      waterfallId: selectedWaterfall.id,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="satellite"
        initialRegion={initialRegion}
      >
        {WATERFALLS.map((wf) => (
          <Marker
            key={wf.id}
            coordinate={{
              latitude: wf.location.lat,
              longitude: wf.location.lng,
            }}
            onPress={(e) => {
              e.stopPropagation();
              handleMarkerPress(wf);
            }}
          />
        ))}
      </MapView>

      <View style={styles.topOverlay} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.randomBtn}
          onPress={openRandomLocation}
          activeOpacity={0.9}
        >
          <Text style={styles.randomText}>Open random location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapControls} pointerEvents="box-none">
        <TouchableOpacity style={styles.controlBtn} onPress={zoomIn} activeOpacity={0.9}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn} onPress={zoomOut} activeOpacity={0.9}>
          <Text style={styles.controlText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn} onPress={resetMap} activeOpacity={0.9}>
          <Text style={styles.controlText}>⌂</Text>
        </TouchableOpacity>
      </View>

      {selectedWaterfall && (
        <View style={styles.modalLayer} pointerEvents="box-none">
          <Pressable
            style={styles.backdrop}
            onPress={() => setSelectedWaterfall(null)}
          />

          <View style={styles.centerCard}>
            <Image
              source={selectedWaterfall.image}
              style={styles.cardImage}
              resizeMode="cover"
            />

            <Text style={styles.cardTitle}>{selectedWaterfall.name}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.closeBtn}
                activeOpacity={0.9}
                onPress={() => setSelectedWaterfall(null)}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.openBtn}
                activeOpacity={0.9}
                onPress={handleOpenDetail}
              >
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },

  map: {
    flex: 1,
  },

  topOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? (isVerySmall ? 48 : 56) : (isVerySmall ? 34 : 40),
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: isVerySmall ? 12 : 16,
  },

  randomBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 11 : 13,
  },

  randomText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: isVerySmall ? 13 : 15,
  },

  mapControls: {
    position: 'absolute',
    right: isVerySmall ? 12 : 16,
    top: Platform.OS === 'ios' ? (isVerySmall ? 108 : 122) : (isVerySmall ? 96 : 110),
    zIndex: 11,
    gap: 10,
  },

  controlBtn: {
    width: isVerySmall ? 42 : 46,
    height: isVerySmall ? 42 : 46,
    borderRadius: 14,
    backgroundColor: 'rgba(20,35,58,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  controlText: {
    color: colors.white,
    fontSize: isVerySmall ? 20 : 22,
    fontWeight: '700',
    lineHeight: isVerySmall ? 22 : 24,
  },

  modalLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isVerySmall ? 16 : 20,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },

  centerCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(14,30,50,0.96)',
    borderRadius: 20,
    padding: isVerySmall ? 14 : 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },

  cardImage: {
    width: '100%',
    height: isVerySmall ? 150 : isSmall ? 165 : 180,
    borderRadius: 14,
    marginBottom: 12,
  },

  cardTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },

  cardButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  closeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.whiteAlpha30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 10 : 11,
  },

  closeBtnText: {
    color: colors.white,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  openBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 10 : 11,
  },

  openBtnText: {
    color: colors.white,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },
});