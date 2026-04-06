import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

const SLIDES = [
  {
    id: '1',
    title: 'Welcome',
    text: "Hey explorer 👋\nI'll guide you through waterfalls and wildlife.",
    button: 'Start',
    character: require('../assets/images/guide_welcome.png'),
  },
  {
    id: '2',
    title: 'Waterfalls',
    text: 'Discover waterfalls, learn their stories,\nand find your next spot.',
    button: 'Explore',
    character: require('../assets/images/waterfall_icon.png'),
  },
  {
    id: '3',
    title: 'Wildlife',
    text: 'Spot animals and capture them.\nBuild your nature journal.',
    button: 'Capture',
    character: require('../assets/images/guide_camera.png'),
  },
  {
    id: '4',
    title: 'Missions',
    text: 'Complete missions, explore more,\nand unlock new experiences.',
    button: 'Start Missions',
    character: require('../assets/images/guide_map.png'),
  },
  {
    id: '5',
    title: 'Quiz',
    text: "Not sure where to go?\nI'll find the perfect waterfall for you.",
    button: 'Take Quiz',
    character: require('../assets/images/guide_quiz.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    } else {
     navigation.replace('Main');
    }
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={styles.slide}>
      <View style={styles.characterWrap}>
        <Image
          source={item.character}
          style={styles.character}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomBlock}>
        <Text style={styles.slideText}>{item.text}</Text>

        <TouchableOpacity style={styles.button} onPress={goNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>{item.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Text style={styles.titleText}>{SLIDES[currentIndex].title}</Text>
        <TouchableOpacity onPress={() => navigation.replace('Home')} activeOpacity={0.8}>
     
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>
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

  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? (isVerySmall ? 84 : isSmall ? 90 : 96) : (isVerySmall ? 72 : isSmall ? 78 : 84),
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isVerySmall ? 16 : 20,
  },

  titleText: {
    color: colors.white,
    fontSize: isVerySmall ? 16 : 18,
    fontWeight: '700',
  },

  skipText: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '500',
  },

  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: isVerySmall ? 16 : 24,
    paddingTop: Platform.OS === 'ios' ? (isVerySmall ? 126 : isSmall ? 134 : 142) : (isVerySmall ? 112 : isSmall ? 120 : 128),
    paddingBottom: isVerySmall ? 120 : isSmall ? 130 : 138,
  },

  characterWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  character: {
    width: isVerySmall ? width * 0.78 : width * 0.8,
    height: isVerySmall ? height * 0.39 : isSmall ? height * 0.43 : height * 0.47,
  },

  bottomBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: isVerySmall ? 2 : 6,
  },

  slideText: {
    color: colors.white,
    fontSize: isVerySmall ? 14 : 15,
    textAlign: 'center',
    lineHeight: isVerySmall ? 20 : 22,
    fontWeight: '600',
    marginBottom: isVerySmall ? 14 : 18,
    paddingHorizontal: isVerySmall ? 8 : 16,
  },

  button: {
    backgroundColor: colors.accent,
    borderRadius: 30,
    minWidth: isVerySmall ? 190 : 210,
    paddingVertical: isVerySmall ? 12 : 14,
    paddingHorizontal: isVerySmall ? 34 : 44,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  dots: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isVerySmall ? 78 : isSmall ? 84 : 92,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.whiteAlpha30,
  },

  dotActive: {
    width: 20,
    backgroundColor: colors.white,
  },
});