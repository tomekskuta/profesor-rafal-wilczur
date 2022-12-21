import { App } from '@slack/bolt';

export const nowomowa = (app: App): void => {
  app.message(/^(no i elo).*/i, async ({ say }) => {
    await say('Co to za nowomowa');
  });
};
