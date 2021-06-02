import Challenge from 'types/challenge';
import styles from './styles.module.scss';

export default function Incorrect({
  onComplete,
  challenge,
  answer,
}: {
  answer: string;
  challenge: Challenge;
  onComplete?: () => void;
}) {
  const { question, solution } = challenge;
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        {question}:{' '}
        <span className={styles.correct}>
          {Array.isArray(solution) ? solution.join(', ') : solution}
        </span>
      </h1>
      <h2 className={styles.h2}>
        🙅‍♀️ <span className={styles.incorrect}>{answer}</span>
      </h2>
      <button
        className={styles.button}
        autoFocus={true}
        onClick={() => onComplete?.()}
      >
        👍
      </button>
    </div>
  );
}
