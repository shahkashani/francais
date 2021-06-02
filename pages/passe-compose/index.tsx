import { createRef, useEffect, useState } from 'react';
import { sample, shuffle } from 'lodash';

import Confetti from 'react-canvas-confetti';
import Head from 'next/head';
import Incorrect from 'components/incorrect';
import Question from 'components/question';
import Verb from 'types/verb';
import styles from './styles.module.scss';

const MAX_INCORRECT = 3;

export default function PasseCompose() {
  const inputRef = createRef<HTMLInputElement>();
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [currentVerb, setCurrentVerb] = useState<Verb>(null);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalIncorrect, setTotalIncorrect] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/passe-compose');
      const verbs = await response.json();
      setVerbs(shuffle(verbs));
      setCurrentVerb(sample(verbs));
    };
    getData();
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setVerbs(shuffle(verbs));
    } else {
      setCurrentVerb(verbs[currentIndex]);
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentVerb(verbs[currentIndex]);
  }, [verbs]);

  useEffect(() => {
    if (incorrectCount === MAX_INCORRECT) {
      setIsShowingAnswer(true);
    }
  }, [incorrectCount]);

  const getNextVerb = () => {
    setCurrentIndex((currentIndex + 1) % verbs.length);
  };

  const onCorrect = () => {
    setIsCelebrating(false);
    setTimeout(() => {
      setIsCelebrating(true);
    }, 0);
    setTotalCorrect((num) => num + 1);
    setIncorrectCount(0);
    getNextVerb();
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

  if (!currentVerb) {
    return '';
  }

  return (
    <>
      <Head>
        <title>Passé composé</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.counts}>
          <div className={styles.correct}>{totalCorrect}</div>
          <div className={styles.incorrect}>{totalIncorrect}</div>
        </div>
        <Question
          inputRef={inputRef}
          verb={currentVerb}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          isShaking={isShaking}
        />
        <Confetti
          className={styles.confetti}
          fire={isCelebrating}
          onDecay={() => setIsCelebrating(false)}
        />
        {isShowingAnswer && (
          <Incorrect
            answer={lastAnswer}
            verb={currentVerb}
            onComplete={onAnswerComplete}
          />
        )}
      </div>
    </>
  );
}
