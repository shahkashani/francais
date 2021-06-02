import CaretIcon from 'icons/caret';
import { Ref } from 'react';
import Verb from 'types/verb';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function Question({
  verb,
  inputRef,
  onCorrect,
  onIncorrect,
  isShaking = false,
}: {
  verb: Verb;
  inputRef?: Ref<HTMLInputElement>;
  onCorrect: (answer?: string, verb?: Verb) => void;
  onIncorrect: (answer?: string, verb?: Verb) => void;
  isShaking?: boolean;
}) {
  const [answer, setAnswer] = useState<string>('');
  const { passecompose, infinitif, translation } = verb;
  const onSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().length === 0) {
      return;
    }
    if (answer.toLowerCase() === passecompose.toLocaleLowerCase()) {
      onCorrect(answer, verb);
    } else {
      onIncorrect(answer, verb);
    }
    setAnswer('');
  };
  return (
    <div className={styles.container}>
      <h1>
        {infinitif} <span className={styles.translation}>{translation}</span>
      </h1>
      <div>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            ref={inputRef}
            className={`${styles.input} ${isShaking ? styles.shake : ''
          }`}
            type="text"
            autoFocus={true}
            value={answer}
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            onInput={(e) => setAnswer(e.currentTarget.value)}
          />
          <button aria-label="Submit" className={styles.button}>
            <CaretIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
