import { App } from '@slack/bolt';

import { getRandomElement } from '../utils/getRandomElement';

const answers = [
  'Do widzenia',
  'Żegnaj',
  'Do jutra',
  'Do widzenia ślepa Gienia kup se trąbkę do pierdzenia',
];

export const goodBye = (app: App): void => {
  app.message(
    /^(do widzenia|do jutra|spadam|lecę|na razie|narka|nara).*/i,
    async ({ say }) => {
      await say(getRandomElement(answers));
    },
  );
};
