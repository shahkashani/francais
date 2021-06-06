import { createRef, useEffect, useState } from 'react';

import Challenge from 'types/challenge';
import Confetti from 'react-canvas-confetti';
import Incorrect from 'components/incorrect';
import Question from 'components/question';
import { shuffle } from 'lodash';
import styles from './styles.module.scss';

export default function Questions({
  data,
  showHintAfter,
  maxIncorrect = 3,
}: {
  data: Challenge[];
  maxIncorrect?: number;
  showHintAfter?: number;
}) {
  const inputRef = createRef<HTMLInputElement>();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(null);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalIncorrect, setTotalIncorrect] = useState<number>(0);
  const [isShowHint, setIsShowHint] = useState<boolean>(false);

  useEffect(() => {
    setChallenges(shuffle(data));
  }, [data]);

  useEffect(() => {
    if (currentIndex === 0) {
      setChallenges(shuffle(challenges));
    } else {
      setCurrentChallenge(challenges[currentIndex]);
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentChallenge(challenges[currentIndex]);
  }, [challenges]);

  useEffect(() => {
    if (incorrectCount >= maxIncorrect) {
      setIsShowingAnswer(true);
    }
    setIsShowHint(showHintAfter >= 0 && incorrectCount >= showHintAfter);
  }, [incorrectCount]);

  const getNextChallenge = () => {
    setCurrentIndex((currentIndex + 1) % challenges.length);
  };

  const onCorrect = () => {
    setIsCelebrating(false);
    setTimeout(() => {
      setIsCelebrating(true);
    }, 0);
    setTotalCorrect((num) => num + 1);
    setIncorrectCount(0);
    getNextChallenge();
  };

  const onIncorrect = (answer: string) => {
    setIncorrectCount((count) => count + 1);
    setLastAnswer(answer);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };

  const onAnswerComplete = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setTotalIncorrect((num) => num + 1);
    setIsShowingAnswer(false);
    setIncorrectCount(0);
  };

  if (!currentChallenge) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.counts}>
        <div className={styles.correct}>{totalCorrect}</div>
        <div className={styles.incorrect}>{totalIncorrect}</div>
      </div>
      <Question
        inputRef={inputRef}
        challenge={currentChallenge}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
        isShaking={isShaking}
        isShowHint={isShowHint}
      />
      <Confetti
        className={styles.confetti}
        fire={isCelebrating}
        onDecay={() => setIsCelebrating(false)}
      />
      {isShowingAnswer && (
        <Incorrect
          answer={lastAnswer}
          challenge={currentChallenge}
          onComplete={onAnswerComplete}
        />
      )}
    </div>
  );
}
