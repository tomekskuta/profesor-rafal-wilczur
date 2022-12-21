import { App, SlackEventMiddlewareArgs } from '@slack/bolt';

import { getRandomElement } from '../utils/getRandomElement';

const answers = [
  'Cóż... Nie każdy jest gotów stanąć oko w oko z prawdą.',
  'Pozdrowienia do więzienia.',
  'Żegnaj.',
  'Nawet mi nie jest żal.',
];

export const memberLefts = (app: App): void => {
  app.event(
    'member_left_channel',
    async ({ say }: SlackEventMiddlewareArgs<'member_left_channel'>) => {
      await say(getRandomElement(answers));
    },
  );
};
