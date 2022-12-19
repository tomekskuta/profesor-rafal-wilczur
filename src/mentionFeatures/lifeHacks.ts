import { SlackEventMiddlewareArgs } from '@slack/bolt';

import { getRandomElement } from '../utils/getRandomElement';

const question = ['jak żyć?', 'jak żyć', 'jak zyc', 'jak zyc?'];

const answers = [
  'Szybko',
  'Mądrze',
  'Gibko',
  'Wyjdź z psem',
  'Krótko',
  'Posadź marchew',
  'Długo i szczęśliwie',
  'Poradź sobie jakoś',
  'Pij wodę',
  'Uczciwie',
];

const middleware = async ({ say }: SlackEventMiddlewareArgs): Promise<void> => {
  await say(getRandomElement(answers));
};

export default { question, middleware };
