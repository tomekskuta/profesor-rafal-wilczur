import type { CronFeature } from '../types';

const feature: CronFeature = {
  schedule: '0 10 * * 1', // 10 AM every Monday
  handler: async (app, channel) => {
    await app.client.chat.postMessage({
      channel,
      text:
        '📋 Nowy tydzień, nowe wyzwania!\n\n' +
        'Przypominam:\n' +
        '• Planujcie z mądrością\n' +
        '• Współpracujcie efektywnie\n' +
        '• Nie zapominajcie o odpoczynku\n\n' +
        'Powodzenia! 🚀',
    });
  },
};

export default feature;
