import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
  Share,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { STORIES } from '../data';
import type { Story } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

export default function StoriesScreen() {
  const [selected, setSelected] = useState<Story | null>(null);

  if (selected) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/bg.png')}
          style={styles.bg}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.back} onPress={() => setSelected(null)} activeOpacity={0.9}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.storyScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.storyCard}>
            <Text style={styles.storyCardTitle}>{selected.title}</Text>
            <Text style={styles.storyBody}>{selected.body}</Text>

            <View style={styles.tipBox}>
              <Text style={styles.tipLabel}>👉 Tip</Text>
              <Text style={styles.tipText}>{selected.tip}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.shareBtn}
            activeOpacity={0.9}
            onPress={() =>
              Share.share({
                title: selected.title,
                message: `${selected.body}\n\n👉 Tip: ${selected.tip}`,
              })
            }
          >
            <Text style={styles.btnText}>Share ↗</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bg}
        resizeMode="cover"
      />

      <FlatList
        data={STORIES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <View style={styles.listText}>
              <Text style={styles.listCardTitle}>{item.title}</Text>
              <Text style={styles.listPreview} numberOfLines={3}>
                {item.body}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.openBtn}
              activeOpacity={0.9}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.openBtnText}>Open</Text>
            </TouchableOpacity>
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

  bg: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },

  back: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? (isVerySmall ? 68 : isSmall ? 76 : 82) : (isVerySmall ? 56 : isSmall ? 64 : 70),
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

  listContent: {
    paddingTop: Platform.OS === 'ios' ? (isVerySmall ? 74 : isSmall ? 82 : 90) : (isVerySmall ? 62 : isSmall ? 70 : 78),
    paddingHorizontal: isVerySmall ? 14 : 16,
    paddingBottom: isVerySmall ? 84 : 90,
  },

  listCard: {
    backgroundColor: 'rgba(19,44,74,0.34)',
    borderRadius: 18,
    marginBottom: isVerySmall ? 12 : 14,
    paddingHorizontal: isVerySmall ? 12 : 14,
    paddingVertical: isVerySmall ? 12 : 14,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.85)',
  },

  listText: {
    width: '100%',
  },

  listCardTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 16,
    fontWeight: '700',
    marginBottom: 6,
  },

  listPreview: {
    color: colors.white,
    opacity: 0.92,
    fontSize: isVerySmall ? 11.5 : 12.5,
    lineHeight: isVerySmall ? 16 : 18,
    marginBottom: 12,
  },

  openBtn: {
    alignSelf: 'flex-start',
    minWidth: isVerySmall ? 104 : 114,
    backgroundColor: colors.accent,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 10 : 11,
    paddingHorizontal: 22,
  },

  openBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: isVerySmall ? 13 : 14,
  },

  storyScroll: {
    paddingTop: Platform.OS === 'ios' ? (isVerySmall ? 116 : isSmall ? 126 : 134) : (isVerySmall ? 104 : isSmall ? 114 : 122),
    paddingHorizontal: isVerySmall ? 14 : 16,
    paddingBottom: isVerySmall ? 84 : 90,
  },

  storyCard: {
    backgroundColor: 'rgba(19,44,74,0.34)',
    borderRadius: 18,
    padding: isVerySmall ? 14 : 16,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.85)',
    marginBottom: 18,
  },

  storyCardTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
    marginBottom: 12,
  },

  storyBody: {
    color: colors.white,
    opacity: 0.95,
    fontSize: isVerySmall ? 13 : 14,
    lineHeight: isVerySmall ? 20 : 24,
  },

  tipBox: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: 12,
    padding: isVerySmall ? 12 : 14,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },

  tipLabel: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: isVerySmall ? 12 : 13,
    marginBottom: 6,
  },

  tipText: {
    color: colors.white,
    fontSize: isVerySmall ? 12 : 13,
    lineHeight: isVerySmall ? 18 : 20,
  },

  shareBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmall ? 12 : 13,
    marginTop: 4,
  },

  btnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: isVerySmall ? 14 : 15,
  },
});