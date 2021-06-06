import CaretIcon from 'icons/caret';
import Challenge from 'types/challenge';
import { Ref } from 'react';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function Question({
  challenge,
  inputRef,
  onCorrect,
  onIncorrect,
  isShowHint = false,
  isShaking = false,
}: {
  challenge: Challenge;
  inputRef?: Ref<HTMLInputElement>;
  isShowHint?: boolean;
  onCorrect: (answer?: string, challenge?: Challenge) => void;
  onIncorrect: (answer?: string, challenge?: Challenge) => void;
  isShaking?: boolean;
}) {
  const [input, setInput] = useState<string>('');
  const { question, solution, hint } = challenge;
  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) {
      return;
    }
    if (Array.isArray(solution)) {
      if (solution.find((s) => s.toLowerCase() === input.toLowerCase())) {
        onCorrect(input, challenge);
      } else {
        onIncorrect(input, challenge);
      }
    } else {
      if (input.toLowerCase() === solution.toLowerCase()) {
        onCorrect(input, challenge);
      } else {
        onIncorrect(input, challenge);
      }
    }
    setInput('');
  };
  return (
    <div className={styles.container}>
      <h1>
        {question} {hint && <span className={styles.hint}>{hint}</span>}
        <div className={styles.answerHint}>
          {isShowHint &&
            `Hint: ${solution.slice(0, Math.ceil(solution.length / 2))}...`}
        </div>
      </h1>
      <div>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            ref={inputRef}
            className={`${styles.input} ${isShaking ? styles.shake : ''}`}
            type="text"
            autoFocus={true}
            value={input}
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            onInput={(e) => setInput(e.currentTarget.value)}
          />
          <button aria-label="Submit" className={styles.button}>
            <CaretIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
