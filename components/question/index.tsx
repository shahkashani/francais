import Verb from 'types/verb';
import styles from './styles.module.scss';

export default function Question({ verb }: { verb: Verb }) {
  return (
    <div className={styles.container}>
      <h1>
        {verb.infinitif}{' '}
        <span className={styles.translation}>{verb.translation}</span>
      </h1>
      <input type="text" autoFocus={true} />
      <button>Continue</button> 
    </div>
  );
}
