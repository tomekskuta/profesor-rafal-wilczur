import { SlackEventMiddlewareArgs } from '@slack/bolt';

import { getRandomElement } from '../utils/getRandomElement';

const question = [
  'cześć',
  'witaj',
  'witamy',
  'hello',
  'dzień dobry',
  'uszanowanko',
];

const answers = [
  'Witam.',
  'Uszanowanie',
  'No hej',
  'Cześć',
  'Dzień dobry',
  'Eluwina',
];

const middleware = async ({ say }: SlackEventMiddlewareArgs): Promise<void> => {
  await say(getRandomElement(answers));
};

export default { question, middleware };
