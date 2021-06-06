import { useEffect, useState } from 'react';

import Challenge from 'types/challenge';
import Head from 'next/head';
import Questions from 'components/questions';

export default function Page({
  url,
  title,
  showHintAfter,
  maxIncorrect = 3,
}: {
  url: string;
  title: string;
  maxIncorrect?: number;
  showHintAfter?: number;
}) {
  const [questions, setQuestions] = useState<Challenge[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      setQuestions(await response.json());
    };
    getData();
  }, [url]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Questions
        data={questions}
        maxIncorrect={maxIncorrect}
        showHintAfter={showHintAfter}
      />
    </>
  );
}
