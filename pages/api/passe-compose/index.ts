import Challenge from 'types/challenge';
import data from './data.json';

export default function handler(req, res) {
  const challenge: Challenge[] = data.map(
    ({ infinitif: question, passecompose: solution, translation: hint }) => ({
      question,
      solution,
      hint,
    })
  );
  res.status(200).json(challenge);
}
