import { useEffect, useState } from 'react';

import Head from 'next/head';
import Question from './components/question';
import Verb from 'types/verb';
import { sample } from 'lodash';
import styles from './styles.module.css';

export default function PasseCompose() {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [currentVerb, setCurrentVerb] = useState<Verb>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/passe-compose`);
      const verbs = await response.json();
      setVerbs(verbs);
      setCurrentVerb(sample(verbs));
    };
    getData();
  }, []);

  if (!currentVerb) {
    return '';
  }

  return (
    <>
      <Head>
        <title>Passé composé</title>
      </Head>
      <div className={styles.container}>
        <Question verb={currentVerb} />
      </div>
    </>
  );
}
