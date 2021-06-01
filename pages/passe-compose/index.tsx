import { createRef, useEffect, useState } from 'react';

import Correct from 'components/correct';
import Head from 'next/head';
import Incorrect from 'components/incorrect';
import Question from 'components/question';
import Verb from 'types/verb';
import { sample } from 'lodash';
import styles from './styles.module.css';

export default function PasseCompose() {
  const inputRef = createRef<HTMLInputElement>();
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [currentVerb, setCurrentVerb] = useState<Verb>(null);
  const [previousVerb, setPreviousVerb] = useState<Verb>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/passe-compose');
      const verbs = await response.json();
      setVerbs(verbs);
      setCurrentVerb(sample(verbs));
    };
    getData();
  }, []);

  const getNextVerb = () => {
    setPreviousVerb(currentVerb);
    setCurrentVerb(sample(verbs));
  };

  const onCorrect = () => {
    setIsCorrect(true);
    getNextVerb();
  };

  const onIncorrect = (answer: string) => {
    setLastAnswer(answer);
    setIsCorrect(false);
    getNextVerb();
  };

  const onAnswerComplete = () => {
    inputRef.current.focus();
    setIsCorrect(null);
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
        <Question
          inputRef={inputRef}
          verb={currentVerb}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
        {isCorrect === true && (
          <Correct onComplete={() => onAnswerComplete()} />
        )}
        {isCorrect === false && (
          <Incorrect
            answer={lastAnswer}
            verb={previousVerb}
            onComplete={() => onAnswerComplete()}
          />
        )}
      </div>
    </>
  );
}
