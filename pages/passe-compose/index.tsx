import Head from 'next/head';
import Question from './components/question';
import Verb from 'types/verb';
import { sample } from 'lodash';
import styles from './styles.module.css';
import { useState } from 'react';

export async function getServerSideProps({ req }) {
  const baseUrl = req ? `http://${req.headers.host}` : '';
  const response = await fetch(`${baseUrl}/api/passe-compose`);
  const verbs = await response.json();
  const verb = sample(verbs);
  return {
    props: {
      verbs,
      verb,
    },
  };
}

export default function PasseCompose({ verbs, verb }: { verbs: Verb[]; verb }) {
  const [currentVerb, setVerb] = useState<Verb>(verb);

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
