import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const question: MentionFeature['question'] = [
  'cześć',
  'witaj',
  'witamy',
  'hello',
  'dzień dobry',
  'uszanowanko',
  'hej',
  'welcome',
  'elo',
];

const answers = [
  'Witam.',
  'Uszanowanie',
  'No hej',
  'Cześć',
  'Dzień dobry',
  'Eluwina',
  'No hejos',
];

const middleware: MentionFeature['middleware'] = async ({ say, payload }) => {
  const { user } = payload;
  await say(`${getRandomElement(answers)} <@${user}>`);
};

export default { question, middleware };
