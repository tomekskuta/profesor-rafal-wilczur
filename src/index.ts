import { App } from '@slack/bolt';
import dotenv from 'dotenv';

import mentionFeatures from './mentionFeatures';

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  port: Number(process.env.PORT) || 3000,
  customRoutes: [
    {
      path: '/wake-up',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('OK, Im awake');
      },
    },
  ],
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
