import styles from './styles.module.scss';

export default function Correct({ onComplete }: { onComplete?: () => void }) {
  if (onComplete) {
    setTimeout(() => onComplete(), 1000);
  }
  return <div className={styles.container}>🎉</div>;
}
