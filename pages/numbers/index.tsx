import Page from 'components/page';

export default function Numbers() {
  return <Page url="/api/numbers" title="Numbers" maxIncorrect={3} showHintAfter={2} />;
}
