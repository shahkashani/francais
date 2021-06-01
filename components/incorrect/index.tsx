import Verb from 'types/verb';
import styles from './styles.module.scss';

export default function Incorrect({
  onComplete,
  verb,
  answer,
}: {
  answer: string;
  verb: Verb;
  onComplete?: () => void;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        {verb.infinitif}:{' '}
        <span className={styles.correct}>{verb.passecompose}</span>
      </h1>
      <h2 className={styles.h2}>
        <span className={styles.incorrect}>{answer}</span>
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
