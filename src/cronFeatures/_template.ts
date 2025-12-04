import type { CronFeature } from '../types';

/**
 * Template for new cron features
 *
 * Cron syntax: "minute hour dayOfMonth month dayOfWeek"
 * Examples:
 *   '0 9 * * 1-5'    - 9 AM, Monday-Friday
 *   '0 12 * * *'     - Noon every day
 *   '0 0 * * 1'      - Midnight every Monday
 *   '* /30 * * * *'   - Every 30 minutes
 */

const feature: CronFeature = {
  schedule: '0 9 * * *', // 9 AM daily
  handler: async (app) => {
    const channel = process.env.MAIN_CHANNEL;
    await app.client.chat.postMessage({
      channel,
      text: 'Your message here',
    });
  },
};

export default feature;
