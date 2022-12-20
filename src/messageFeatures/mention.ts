import { App } from '@slack/bolt';

export const mention = (app: App): void => {
  app.message('Profesor Rafał Wilczur', async ({ say }) => {
    await say('Czego?');
  });
};
