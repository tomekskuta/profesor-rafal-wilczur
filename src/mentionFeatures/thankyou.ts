import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const question: MentionFeature['question'] = [
  'dziękuję',
  'dziekuje',
  'dzięki',
  'dzieki',
  'dziękówka',
  'dzięks',
  'senkju',
  'thank you',
  'thank you!',
];

const answers = [
  'Nie ma problemu',
  'Nie ma sprawy',
  'Cała przyjemność po mojej stronie',
  'Spoko',
  'Spoko Maroko',
  'Do usług',
  'Ty mi nie dziękuj tylko zastanów się nad sobą',
];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  const answer = getRandomElement(answers);

  await say(`${answer} <@${user}>`)
};

export default { question, middleware };
