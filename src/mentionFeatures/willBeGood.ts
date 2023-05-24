import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

// TODO: Question for Profesor, on slack is used after mentioning Profesor - string | string[]
const question: MentionFeature['question'] = [
  'będzie dobrze?',
  'bedzie dobrze?',
  'będzie dobrze',
  'bedzie dobrze',
];

const answers = ['będzie dobrze!', 'nie będzie.'];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  await say(`*<@${user}> ${getRandomElement(answers)}`);
};

export default { question, middleware };
