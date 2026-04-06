import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { QUIZ_QUESTIONS } from '../data';
import type { QuizQuestion } from '../data';

const { width, height } = Dimensions.get('window');

const isVerySmall = height < 680;
const isSmall = height < 760;

const QUESTIONS_PER_LEVEL = 5;
const TOTAL_LEVELS = 10;

type Step = 'intro' | 'question' | 'results';
type LevelQuestion = QuizQuestion & { correctOptionIndex: number };

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateLevelQuestions(level: number): LevelQuestion[] {
  const pool = shuffleArray(QUIZ_QUESTIONS);
  const uniqueQuestions = pool.slice(0, QUESTIONS_PER_LEVEL);

  return uniqueQuestions.map((question, index) => {
    const originalCorrectOption =
      question.options[(level + index) % question.options.length];

    const otherOptions = question.options.filter(
      (option) =>
        !(
          option.label === originalCorrectOption.label &&
          option.tag === originalCorrectOption.tag
        )
    );

    const normalizedOptions = shuffleArray([
      originalCorrectOption,
      ...otherOptions,
    ]);

    const correctOptionIndex = normalizedOptions.findIndex(
      (option) =>
        option.label === originalCorrectOption.label &&
        option.tag === originalCorrectOption.tag
    );

    return {
      ...question,
      options: normalizedOptions,
      correctOptionIndex,
    };
  });
}

export default function QuizScreen() {
  const [step, setStep] = useState<Step>('intro');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questions, setQuestions] = useState<LevelQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      setStep('intro');
      setCurrentLevel(1);
      setQuestions([]);
      setQIndex(0);
      setCorrectAnswers(0);
      setSelectedAnswerIndex(null);
    }, [])
  );

  const currentQ = questions[qIndex];

  const progressPercent = useMemo(() => {
    return questions.length > 0 ? ((qIndex + 1) / questions.length) * 100 : 0;
  }, [qIndex, questions.length]);

  const passedLevel = correctAnswers > QUESTIONS_PER_LEVEL / 2;
  const isLastLevel = currentLevel >= TOTAL_LEVELS;

  const startLevel = (level: number) => {
    const levelQuestions = generateLevelQuestions(level);
    setCurrentLevel(level);
    setQuestions(levelQuestions);
    setQIndex(0);
    setCorrectAnswers(0);
    setSelectedAnswerIndex(null);
    setStep('question');
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (selectedAnswerIndex !== null || !currentQ) return;

    setSelectedAnswerIndex(optionIndex);

    if (optionIndex === currentQ.correctOptionIndex) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIndex === null) return;

    if (qIndex < questions.length - 1) {
      setQIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      return;
    }

    setStep('results');
  };

  const goToNextLevel = () => {
    if (isLastLevel) {
      setStep('intro');
      setCurrentLevel(1);
      setQuestions([]);
      setQIndex(0);
      setCorrectAnswers(0);
      setSelectedAnswerIndex(null);
      return;
    }

    startLevel(currentLevel + 1);
  };

  const tryAgain = () => {
    startLevel(currentLevel);
  };

  const backToStart = () => {
    setStep('intro');
    setCurrentLevel(1);
    setQuestions([]);
    setQIndex(0);
    setCorrectAnswers(0);
    setSelectedAnswerIndex(null);
  };

  const getOptionStyle = (index: number) => {
    if (!currentQ) return styles.option;
    if (selectedAnswerIndex === null) return styles.option;

    if (index === currentQ.correctOptionIndex) {
      return [styles.option, styles.optionCorrect];
    }

    if (index === selectedAnswerIndex && index !== currentQ.correctOptionIndex) {
      return [styles.option, styles.optionWrong];
    }

    return [styles.option, styles.optionDimmed];
  };

  const getOptionTextStyle = (index: number) => {
    if (!currentQ) return styles.optionText;
    if (selectedAnswerIndex === null) return styles.optionText;

    if (index === currentQ.correctOptionIndex || index === selectedAnswerIndex) {
      return [styles.optionText, styles.optionTextActive];
    }

    return [styles.optionText, styles.optionTextDimmed];
  };

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
            <Text style={styles.topTitle}>Quiz Challenge</Text>

            <Text style={styles.levelBadge}>10 Levels</Text>

            <Image
              source={require('../assets/images/guide_quiz.png')}
              style={styles.guide}
              resizeMode="contain"
            />

            <Text style={styles.introText}>
              Answer 5 questions on each level.{'\n'}
              More than half correct = next level.
            </Text>

            <TouchableOpacity
              style={styles.greenBtn}
              activeOpacity={0.9}
              onPress={() => startLevel(1)}
            >
              <Text style={styles.btnText}>Start</Text>
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
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>

          <Text style={styles.progressText}>
            {qIndex + 1} / {questions.length}
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
                key={`${currentQ.id}-${opt.label}-${index}`}
                style={getOptionStyle(index)}
                activeOpacity={0.9}
                disabled={selectedAnswerIndex !== null}
                onPress={() => handleSelectAnswer(index)}
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
                {qIndex === questions.length - 1 ? 'Show result' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsScroll}
      >
        <View style={styles.resultCard}>
          <Text style={styles.resultLevel}>Level {currentLevel}</Text>

          <Image
            source={require('../assets/images/guide_quiz.png')}
            style={styles.resultGuide}
            resizeMode="contain"
          />

          <Text style={styles.resultEmoji}>
            {passedLevel ? '🎉' : '✨'}
          </Text>

          <Text style={styles.resultTitle}>
            {passedLevel ? 'Great result!' : 'Try again'}
          </Text>

          <Text style={styles.resultScore}>
            {correctAnswers} / {QUESTIONS_PER_LEVEL}
          </Text>

          <Text style={styles.resultSubtitle}>
            {passedLevel
              ? isLastLevel
                ? 'You completed all 10 levels.'
                : 'You answered more than half correctly and unlocked the next level.'
              : 'You need more than half correct answers to move on.'}
          </Text>

          <View style={styles.resultStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Correct</Text>
              <Text style={styles.statValue}>{correctAnswers}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Wrong</Text>
              <Text style={styles.statValue}>{QUESTIONS_PER_LEVEL - correctAnswers}</Text>
            </View>
          </View>

          {passedLevel ? (
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPress={goToNextLevel}
            >
              <Text style={styles.btnText}>
                {isLastLevel ? 'Back to start' : 'Next level'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPress={tryAgain}
            >
              <Text style={styles.btnText}>Try again</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.secondaryBtn}
            activeOpacity={0.9}
            onPress={backToStart}
          >
            <Text style={styles.secondaryBtnText}>First page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  introScroll: {
    flexGrow: 1,
    paddingBottom: isVerySmall ? 110 : 120,
  },

  introCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmall ? 18 : 24,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 70
          : isSmall
          ? 80
          : 90
        : isVerySmall
        ? 60
        : isSmall
        ? 70
        : 80,
  },

  topTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 24 : 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },

  levelBadge: {
    color: colors.white,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.whiteAlpha10,
  },

  introText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 17,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: isVerySmall ? 22 : 25,
    marginTop: 8,
    marginBottom: 22,
  },

  guide: {
    width: isVerySmall ? 220 : isSmall ? 240 : 260,
    height: isVerySmall ? 250 : isSmall ? 280 : 310,
    marginBottom: 10,
  },

  greenBtn: {
    backgroundColor: colors.accent,
    borderRadius: 26,
    paddingVertical: isVerySmall ? 13 : 15,
    paddingHorizontal: isVerySmall ? 44 : 56,
  },

  btnText: {
    color: colors.white,
    fontWeight: '800',
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

  levelSmallBadge: {
    color: colors.white,
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  guideSmall: {
    width: isVerySmall ? 100 : 120,
    height: isVerySmall ? 128 : 150,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  questionBox: {
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha50,
    borderRadius: 20,
    paddingVertical: isVerySmall ? 18 : 22,
    paddingHorizontal: isVerySmall ? 16 : 20,
    marginBottom: isVerySmall ? 16 : 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  questionText: {
    color: colors.white,
    fontSize: isVerySmall ? 15 : 17,
    textAlign: 'center',
    fontWeight: '700',
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

  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: isVerySmall ? 12 : 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: isVerySmall ? 100 : 110,
  },

  resultsScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: isVerySmall ? 18 : 24,
    paddingTop:
      Platform.OS === 'ios'
        ? isVerySmall
          ? 70
          : isSmall
          ? 80
          : 90
        : isVerySmall
        ? 60
        : isSmall
        ? 70
        : 80,
    paddingBottom: isVerySmall ? 110 : 120,
  },

  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: isVerySmall ? 18 : 24,
    paddingVertical: isVerySmall ? 22 : 28,
    alignItems: 'center',
  },

  resultLevel: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
    marginBottom: 10,
  },

  resultGuide: {
    width: isVerySmall ? 110 : 130,
    height: isVerySmall ? 120 : 145,
    marginBottom: 8,
  },

  resultEmoji: {
    fontSize: isVerySmall ? 34 : 40,
    marginBottom: 8,
  },

  resultTitle: {
    color: colors.white,
    fontSize: isVerySmall ? 24 : 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  resultScore: {
    color: colors.accent,
    fontSize: isVerySmall ? 34 : 40,
    fontWeight: '900',
    marginBottom: 10,
  },

  resultSubtitle: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 14 : 15,
    textAlign: 'center',
    lineHeight: isVerySmall ? 21 : 23,
    marginBottom: 20,
  },

  resultStatsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: isVerySmall ? 14 : 16,
    alignItems: 'center',
  },

  statLabel: {
    color: colors.whiteAlpha80,
    fontSize: isVerySmall ? 12 : 13,
    marginBottom: 4,
  },

  statValue: {
    color: colors.white,
    fontSize: isVerySmall ? 20 : 22,
    fontWeight: '800',
  },

  primaryBtn: {
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 13 : 14,
    marginBottom: 10,
  },

  secondaryBtn: {
    width: '100%',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: isVerySmall ? 13 : 14,
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha30,
  },

  secondaryBtnText: {
    color: colors.white,
    fontSize: isVerySmall ? 14 : 15,
    fontWeight: '700',
  },
});