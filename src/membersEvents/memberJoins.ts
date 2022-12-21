import { App, SlackEventMiddlewareArgs } from '@slack/bolt';

import { getRandomElement } from '../utils/getRandomElement';

const getAnswers = (user: string): string[] => [
  `Witaj <@${user}> :handshake: Niech ta podróż będzie dla Ciebie owocna.`,
  `No hejka <@${user}> :wave:`,
  `Witamy witamy <@${user}>`,
  `Witam i o zdrowie pytam <@${user}>`,
  `Spodziewałem się tu Ciebie <@${user}>. Witaj!`,
];

export const memberJoins = (app: App): void => {
  app.event(
    'member_joined_channel',
    async ({
      say,
      payload,
    }: SlackEventMiddlewareArgs<'member_joined_channel'>) => {
      await say(getRandomElement(getAnswers(payload.user)));
    },
  );
};
