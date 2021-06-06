import Challenge from 'types/challenge';
import data from './data.json';

export default function handler(req, res) {
  const challenge: Challenge[] = data.map(
    ({ spelling: solution, number: question }) => ({
      question,
      solution,
    })
  );
  res.status(200).json(challenge);
}
