import { App } from '@slack/bolt';
import dotenv from 'dotenv';

import mentionFeatures from './mentionFeatures';

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.PORT) || 3000,
});

app.event('app_mention', async (eventMiddlewareArrgs) => {
  const message = eventMiddlewareArrgs.payload.text
    .split(' ')
    .slice(1)
    .join(' ')
    .toLowerCase();

  const featureMiddleware = mentionFeatures[message];

  featureMiddleware
    ? await featureMiddleware(eventMiddlewareArrgs)
    : await mentionFeatures.help(eventMiddlewareArrgs);
});

app.message('Profesor Rafał Wilczur', async ({ say }) => {
  await say('Czego?');
});

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
