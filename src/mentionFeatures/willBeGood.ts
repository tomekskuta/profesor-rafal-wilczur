import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const question: MentionFeature['question'] = [
  'będzie dobrze?',
  'bedzie dobrze?',
  'będzie dobrze',
  'bedzie dobrze',
];

const answers = [
  'będzie dobrze!',
  'nie będzie.',
  'https://www.youtube.com/watch?v=7ZjbOzsIaRs',
];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  await say(`<@${user}> ${getRandomElement(answers)}`);
};

export default { question, middleware };
