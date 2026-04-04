import React, { useCallback, useMemo, useState } from 'react';
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
  Share,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { MISSIONS } from '../data';
import type { Mission } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

export default function MissionsScreen() {
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);

  const completedCount = missions.filter((item) => item.completed).length;
  const allCompleted = missions.length > 0 && completedCount === missions.length;
  const streakItems = useMemo(() => Array.from({ length: 7 }), []);

  useFocusEffect(
    useCallback(() => {
      setMissions((prev) => {
        const wasAllCompleted =
          prev.length > 0 && prev.every((item) => item.completed);

        return wasAllCompleted
          ? MISSIONS.map((item) => ({ ...item, completed: false }))
          : prev;
      });
    }, [])
  );

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const shareResult = async () => {
    await Share.share({
      message: 'All tasks for today have been completed!',
    });
  };

  const renderStreak = () => (
    <View style={styles.streakRow}>
      {streakItems.map((_, index) => {
        const filledCount = Math.min(completedCount, streakItems.length);
        const isFilled = index < filledCount;
        const isGlow = filledCount > 0 && index === filledCount - 1;

        return (
          <View
            key={index}
            style={[
              styles.streakItem,
              isFilled && styles.streakItemFilled,
              isGlow && styles.streakItemGlow,
            ]}
          />
        );
      })}
    </View>
  );

  const renderMissionCard = ({ item }: { item: Mission }) => {
    const isDone = item.completed;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => toggleMission(item.id)}
        style={styles.card}
      >
        <View style={styles.cardTextBlock}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
        </View>

        <View style={[styles.cardCheckBox, isDone && styles.cardCheckBoxDone]}>
          {isDone && <View style={styles.cardCheckInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  if (allCompleted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/bg.png')}
          style={styles.bg}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.topText}>Complete all the tasks and earn a{'\n'}streak!</Text>

          {renderStreak()}

          <View style={styles.doneWrap}>
            <Text style={styles.doneText}>All tasks for today have been completed!</Text>

            <Image
              source={require('../assets/images/guide_quiz.png')}
              style={styles.guideImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.shareBtn}
              activeOpacity={0.9}
              onPress={shareResult}
            >
              <Text style={styles.shareBtnText}>Share ↗</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={renderMissionCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <Text style={styles.topText}>Complete all the tasks and earn a{'\n'}streak!</Text>
            {renderStreak()}
          </View>
        }
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

  listContent: {
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 86
          : isSmall
          ? 96
          : 104
        : isVerySmall
        ? 74
        : isSmall
        ? 84
        : 92,
    paddingHorizontal: isVerySmall ? 16 : 24,
    paddingBottom: isVerySmall ? 104 : 112,
  },

  headerWrap: {
    marginBottom: isVerySmall ? 8 : 10,
  },

  content: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 86
          : isSmall
          ? 96
          : 104
        : isVerySmall
        ? 74
        : isSmall
        ? 84
        : 92,
    paddingHorizontal: isVerySmall ? 16 : 24,
    paddingBottom: isVerySmall ? 104 : 112,
  },

  topText: {
    color: colors.white,
    fontSize: isVerySmall ? 16 : 18,
    lineHeight: isVerySmall ? 22 : 24,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: isVerySmall ? 18 : 22,
  },

  streakRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isVerySmall ? 8 : 10,
    marginBottom: isVerySmall ? 28 : 30,
  },

  streakItem: {
    width: isVerySmall ? 34 : 38,
    height: isVerySmall ? 34 : 38,
    borderRadius: 6,
    backgroundColor: '#042342',
  },

  streakItemFilled: {
    backgroundColor: '#9FD24F',
  },

  streakItemGlow: {
    shadowColor: '#C4F16B',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  card: {
    minHeight: isVerySmall ? 76 : 80,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(19,44,74,0.34)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: isVerySmall ? 10 : 12,
    paddingRight: isVerySmall ? 10 : 12,
    marginBottom: isVerySmall ? 14 : 18,
  },

  cardTextBlock: {
    flex: 1,
    paddingRight: 12,
  },

  cardTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 16 : 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  cardDesc: {
    color: colors.white,
    fontSize: isVerySmall ? 11.5 : 12,
    lineHeight: isVerySmall ? 15 : 17,
    opacity: 0.95,
    maxWidth: '95%',
  },

  cardCheckBox: {
    width: isVerySmall ? 54 : 60,
    height: isVerySmall ? 54 : 60,
    borderRadius: 14,
    backgroundColor: '#03213D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardCheckBoxDone: {
    backgroundColor: '#9ACB57',
  },

  cardCheckInner: {
    width: isVerySmall ? 18 : 20,
    height: isVerySmall ? 18 : 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0)',
  },

  doneWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: isVerySmall ? 4 : 8,
  },

  doneText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 16,
    textAlign: 'center',
    marginBottom: isVerySmall ? 18 : 24,
  },

  guideImage: {
    width: isVerySmall ? width * 0.58 : width * 0.62,
    height: isVerySmall ? height * 0.34 : height * 0.4,
    marginTop: isVerySmall ? 8 : 16,
    marginBottom: isVerySmall ? 18 : 24,
  },

  shareBtn: {
    marginTop: 'auto',
    marginBottom: isVerySmall ? 20 : 28,
    width: isVerySmall ? '92%' : '88%',
    height: isVerySmall ? 50 : 54,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  shareBtnText: {
    color: colors.white,
    fontSize: isVerySmall ? 18 : 20,
    fontWeight: '700',
  },
});