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
  Share,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { QUIZ_QUESTIONS, getWaterfallsByTags } from '../data';
import type { QuizTag, Waterfall, QuizQuestion } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

const QUESTIONS_PER_LEVEL = 5;
const TOTAL_LEVELS = Math.ceil(QUIZ_QUESTIONS.length / QUESTIONS_PER_LEVEL);

const STORAGE_CURRENT_LEVEL = 'quiz_current_level';
const STORAGE_UNLOCKED_LEVEL = 'quiz_unlocked_level';

type Step = 'intro' | 'question' | 'results';

const EMPTY_SCORES: Record<QuizTag, number> = {
  accessible: 0,
  easy: 0,
  mountain: 0,
  wild: 0,
  adventure: 0,
};

const CORRECT_OPTION_INDEXES: number[] = [
  0, 1, 1, 0, 2,
  0, 2, 1, 1, 0,
  2, 1, 3, 1, 2,
  1, 2, 3, 2, 2,
  3, 2, 1, 3, 1,
  2, 0, 1, 0, 2,
  2, 1, 3, 2, 2,
  3, 1, 2, 3, 1,
  2, 2, 2, 3, 2,
  1, 2, 3, 2, 3,
];

export default function QuizScreen() {
  const navigation = useNavigation<any>();

  const [isReady, setIsReady] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<Record<QuizTag, number>>({ ...EMPTY_SCORES });
  const [results, setResults] = useState<Waterfall[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const levelQuestions = useMemo<QuizQuestion[]>(() => {
    const start = (currentLevel - 1) * QUESTIONS_PER_LEVEL;
    return QUIZ_QUESTIONS.slice(start, start + QUESTIONS_PER_LEVEL);
  }, [currentLevel]);

  const currentQ = levelQuestions[qIndex];

  const absoluteQuestionIndex = useMemo(() => {
    return (currentLevel - 1) * QUESTIONS_PER_LEVEL + qIndex;
  }, [currentLevel, qIndex]);

  const correctOptionIndex = CORRECT_OPTION_INDEXES[absoluteQuestionIndex] ?? 0;

  const progressPercent = useMemo(() => {
    return levelQuestions.length > 0 ? ((qIndex + 1) / levelQuestions.length) * 100 : 0;
  }, [qIndex, levelQuestions.length]);

  const loadProgress = useCallback(async () => {
    try {
      const savedCurrentLevel = await AsyncStorage.getItem(STORAGE_CURRENT_LEVEL);
      const savedUnlockedLevel = await AsyncStorage.getItem(STORAGE_UNLOCKED_LEVEL);

      const parsedCurrent = savedCurrentLevel ? Number(savedCurrentLevel) : 1;
      const parsedUnlocked = savedUnlockedLevel ? Number(savedUnlockedLevel) : 1;

      const safeCurrent = Number.isFinite(parsedCurrent)
        ? Math.min(Math.max(parsedCurrent, 1), TOTAL_LEVELS)
        : 1;

      const safeUnlocked = Number.isFinite(parsedUnlocked)
        ? Math.min(Math.max(parsedUnlocked, 1), TOTAL_LEVELS)
        : 1;

      setCurrentLevel(safeCurrent);
      setUnlockedLevel(safeUnlocked);
      setStep('intro');
      setQIndex(0);
      setScores({ ...EMPTY_SCORES });
      setResults([]);
      setCorrectAnswers(0);
      setSelectedAnswerIndex(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsReady(false);
      loadProgress();
    }, [loadProgress])
  );

  const persistLevels = async (nextCurrentLevel: number, nextUnlockedLevel: number) => {
    await AsyncStorage.setItem(STORAGE_CURRENT_LEVEL, String(nextCurrentLevel));
    await AsyncStorage.setItem(STORAGE_UNLOCKED_LEVEL, String(nextUnlockedLevel));
    setCurrentLevel(nextCurrentLevel);
    setUnlockedLevel(nextUnlockedLevel);
  };

  const startLevel = () => {
    setStep('question');
    setQIndex(0);
    setScores({ ...EMPTY_SCORES });
    setResults([]);
    setCorrectAnswers(0);
    setSelectedAnswerIndex(null);
  };

  const handleSelectAnswer = (optionIndex: number, tag: QuizTag) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(optionIndex);

    if (optionIndex === correctOptionIndex) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setScores((prev) => ({
      ...prev,
      [tag]: prev[tag] + 1,
    }));
  };

  const handleNextQuestion = async () => {
    if (selectedAnswerIndex === null) return;

    if (qIndex < levelQuestions.length - 1) {
      setQIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      return;
    }

    const passed = correctAnswers >= 3;
    const nextResults = getWaterfallsByTags(scores);

    setResults(nextResults);
    setStep('results');

    if (passed) {
      const nextUnlocked = Math.min(Math.max(unlockedLevel, currentLevel + 1), TOTAL_LEVELS);
      const nextCurrent = currentLevel < TOTAL_LEVELS ? currentLevel + 1 : currentLevel;
      await persistLevels(nextCurrent, nextUnlocked);
    } else {
      await persistLevels(currentLevel, unlockedLevel);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswerIndex === null) return styles.option;

    if (index === correctOptionIndex) {
      return [styles.option, styles.optionCorrect];
    }

    if (index === selectedAnswerIndex && index !== correctOptionIndex) {
      return [styles.option, styles.optionWrong];
    }

    return [styles.option, styles.optionDimmed];
  };

  const getOptionTextStyle = (index: number) => {
    if (selectedAnswerIndex === null) return styles.optionText;

    if (index === correctOptionIndex || index === selectedAnswerIndex) {
      return [styles.optionText, styles.optionTextActive];
    }

    return [styles.optionText, styles.optionTextDimmed];
  };

  const resetToCurrentLevelIntro = () => {
    setStep('intro');
    setQIndex(0);
    setScores({ ...EMPTY_SCORES });
    setResults([]);
    setCorrectAnswers(0);
    setSelectedAnswerIndex(null);
  };

  const goToNextLevel = () => {
    if (currentLevel > TOTAL_LEVELS) return;
    resetToCurrentLevelIntro();
  };

  const retakeLevel = async () => {
    await persistLevels(currentLevel > unlockedLevel ? unlockedLevel : currentLevel, unlockedLevel);
    resetToCurrentLevelIntro();
  };

  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/bg.png')}
          style={styles.bg}
          resizeMode="cover"
        />
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </View>
    );
  }

  if (step === 'intro') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/bg.png')}
          style={styles.bg}
          resizeMode="cover"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.introScroll}
        >
          <View style={styles.introCenter}>
            <Text style={styles.levelBadge}>Level {currentLevel}</Text>

            <Text style={styles.introText}>
              Take the quiz and find out{'\n'}which location suits you best!
            </Text>

            <Image
              source={require('../assets/images/guide_quiz.png')}
              style={styles.guide}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.greenBtn}
              activeOpacity={0.9}
              onPress={startLevel}
            >
              <Text style={styles.btnText}>Start level</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (step === 'question' && currentQ) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/bg.png')}
          style={styles.bg}
          resizeMode="cover"
        />

        <View style={styles.progressWrap}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {qIndex + 1} / {levelQuestions.length}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.questionScroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.levelSmallBadge}>Level {currentLevel}</Text>

          <Image
            source={require('../assets/images/guide_quiz.png')}
            style={styles.guideSmall}
            resizeMode="contain"
          />

          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
          </View>

          <View style={styles.optionsWrap}>
            {currentQ.options.map((opt, index) => (
              <TouchableOpacity
                key={`${currentQ.id}-${opt.label}`}
                style={getOptionStyle(index)}
                activeOpacity={0.9}
                disabled={selectedAnswerIndex !== null}
                onPress={() => handleSelectAnswer(index, opt.tag)}
              >
                <Text style={getOptionTextStyle(index)}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedAnswerIndex !== null && (
            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.9}
              onPress={handleNextQuestion}
            >
              <Text style={styles.btnText}>
                {qIndex === levelQuestions.length - 1 ? 'Show result' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  const passedLevel = correctAnswers >= 3;
  const hasNextLevel = currentLevel <= TOTAL_LEVELS - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bg}
        resizeMode="cover"
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContent}
        ListHeaderComponent={
          <View style={styles.resultsHeader}>
            <Text style={styles.levelBadge}>Level {currentLevel}</Text>

            <Image
              source={require('../assets/images/guide_quiz.png')}
              style={styles.guideSmall}
              resizeMode="contain"
            />

            <Text style={styles.resultsTitle}>
              {passedLevel
                ? `Level passed! Correct answers: ${correctAnswers}/${levelQuestions.length}`
                : `Level failed. Correct answers: ${correctAnswers}/${levelQuestions.length}`}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('WaterfallDetail', {
                waterfallId: item.id,
              })
            }
          >
            <Image source={item.image} style={styles.cardImg} resizeMode="cover" />

            <View style={styles.cardText}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.shareBtn}
              activeOpacity={0.9}
              onPress={() =>
                Share.share({
                  message: `Level ${currentLevel}\nCorrect: ${correctAnswers}/${levelQuestions.length}\nMy top picks:\n${results.map((w) => w.name).join('\n')}`,
                })
              }
            >
              <Text style={styles.btnText}>📤 Share</Text>
            </TouchableOpacity>

            {passedLevel && hasNextLevel ? (
              <TouchableOpacity
                style={styles.nextLevelBtn}
                activeOpacity={0.9}
                onPress={goToNextLevel}
              >
                <Text style={styles.btnText}>Next level</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.outlineBtn}
              activeOpacity={0.9}
              onPress={retakeLevel}
            >
              <Text style={styles.btnText}>Restart level</Text>
            </TouchableOpacity>
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

  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  introScroll: {
    flexGrow: 1,
    paddingBottom: isVerySmall ? 120 : 130,
  },

  introCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: isVerySmall ? 18 : 24,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 92
          : isSmall
          ? 102
          : 112
        : isVerySmall
        ? 80
        : isSmall
        ? 90
        : 100,
  },

  levelBadge: {
    color: colors.white,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: colors.whiteAlpha10,
  },

  levelSmallBadge: {
    color: colors.white,
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  introText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 17,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: isVerySmall ? 23 : 26,
    marginBottom: isVerySmall ? 16 : 20,
  },

  guide: {
    width: isVerySmall ? 220 : isSmall ? 240 : 260,
    height: isVerySmall ? 280 : isSmall ? 305 : 330,
    marginBottom: isVerySmall ? 16 : 20,
  },

  guideSmall: {
    width: isVerySmall ? 100 : 120,
    height: isVerySmall ? 128 : 150,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  greenBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 12 : 14,
    paddingHorizontal: isVerySmall ? 42 : 50,
    marginTop: 8,
  },

  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 12 : 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: isVerySmall ? 100 : 110,
  },

  nextLevelBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 12 : 13,
  },

  btnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: isVerySmall ? 14 : 15,
  },

  progressWrap: {
    paddingHorizontal: isVerySmall ? 16 : 20,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 74
          : isSmall
          ? 84
          : 94
        : isVerySmall
        ? 62
        : isSmall
        ? 72
        : 82,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.whiteAlpha20,
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },

  progressText: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
  },

  questionScroll: {
    paddingHorizontal: isVerySmall ? 18 : 24,
    paddingTop: 20,
    paddingBottom: isVerySmall ? 110 : 120,
  },

  questionBox: {
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha50,
    borderRadius: 16,
    paddingVertical: isVerySmall ? 18 : 20,
    paddingHorizontal: isVerySmall ? 16 : 20,
    marginBottom: isVerySmall ? 16 : 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  questionText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 17,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: isVerySmall ? 22 : 25,
  },

  optionsWrap: {
    gap: isVerySmall ? 10 : 12,
  },

  option: {
    borderWidth: 1,
    borderColor: colors.whiteAlpha30,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 12 : 14,
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha10,
    paddingHorizontal: 12,
  },

  optionCorrect: {
    backgroundColor: 'rgba(64, 190, 93, 0.28)',
    borderColor: '#40BE5D',
  },

  optionWrong: {
    backgroundColor: 'rgba(226, 67, 67, 0.28)',
    borderColor: '#E24343',
  },

  optionDimmed: {
    opacity: 0.6,
  },

  optionText: {
    color: colors.white,
    fontSize: isVerySmall ? 14 : 15,
    textAlign: 'center',
  },

  optionTextActive: {
    fontWeight: '700',
  },

  optionTextDimmed: {
    opacity: 0.8,
  },

  resultsContent: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 80
          : isSmall
          ? 90
          : 100
        : isVerySmall
        ? 68
        : isSmall
        ? 78
        : 88,
    paddingBottom: isVerySmall ? 110 : 120,
  },

  resultsHeader: {
    marginBottom: 8,
  },

  resultsTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: isVerySmall ? 21 : 24,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.whiteAlpha10,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },

  cardImg: {
    width: isVerySmall ? 82 : 90,
    height: isVerySmall ? 72 : 75,
  },

  cardText: {
    flex: 1,
    padding: isVerySmall ? 9 : 10,
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
  },

  footerButtons: {
    gap: 10,
    marginTop: 8,
  },

  shareBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 12 : 13,
  },

  outlineBtn: {
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha30,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 12 : 13,
    alignItems: 'center',
  },
});