import { App } from '@slack/bolt';
import dotenv from 'dotenv';

import useMentionFeatures from './mentionFeatures';
import useMessageFeatures from './messageFeatures';

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

useMentionFeatures(app);
useMessageFeatures(app);

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
