import Challenge from 'types/challenge';
import data from './data.json';

export default function handler(req, res) {
  const challenge: Challenge[] = data.reduce((memo, { verb, conjugations }) => {
    return [
      ...memo,
      ...conjugations.map(({ subject, conjugation }) => {
        return {
          question: `${subject} + ${verb}`,
          solution: conjugation,
        };
      }),
    ];
  }, []);
  res.status(200).json(challenge);
}
