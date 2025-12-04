import { App } from '@slack/bolt';
import cron, { ScheduledTask } from 'node-cron';
import type { CronFeature } from '../types';

import dailyMotivation from './dailyMotivation';
// import weeklyReminder from './weeklyReminder';

const features: CronFeature[] = [
  dailyMotivation,
  // weeklyReminder
];

const activeJobs: ScheduledTask[] = [];

const useCronFeatures = (app: App): void => {
  const slackChannel = process.env.MAIN_CHANNEL;

  if (!slackChannel) {
    console.warn('⚠️  MAIN_CHANNEL not set. Cron features disabled.');
    return;
  }

  features.forEach((feature, index) => {
    const cronHandler = async () => {
      console.log(
        `⚙️  [${new Date().toISOString()}] Executing cron #${index + 1}`,
      );
      try {
        await feature.handler(app, slackChannel);
        console.log(
          `✅ [${new Date().toISOString()}] Completed cron #${index + 1}`,
        );
      } catch (error) {
        console.error(`❌ Cron job #${index + 1} failed:`, error);
      }
    };

    const task = cron.schedule(feature.schedule, cronHandler, {
      timezone: 'Europe/Warsaw',
    });

    activeJobs.push(task);
    console.log(`📅 Scheduled cron #${index + 1}: ${feature.schedule}`);
  });

  // Manual testing endpoint for development
  if (process.env.NODE_ENV !== 'production') {
    app.command('/test-cron', async ({ command, ack, say }) => {
      await ack();
      const indexStr = command.text.trim();
      const index = parseInt(indexStr, 10) - 1;

      if (!indexStr) {
        const list = features
          .map((f, i) => `${i + 1}. ${f.schedule}`)
          .join('\n');
        await say(
          `Available cron jobs:\n${list}\n\nUsage: /test-cron <number>`,
        );
        return;
      }

      const feature = features[index];
      if (feature) {
        try {
          await feature.handler(app, process.env.ADMIN_CHANNEL);
          await say(`✅ Executed cron #${index + 1}`);
        } catch (error) {
          await say(`❌ Failed: ${error.message}`);
        }
      } else {
        await say(`❌ Not found: "${indexStr}"`);
      }
    });
  }

  console.log(`✅ Initialized ${activeJobs.length} cron job(s)`);
};

export const stopCronFeatures = (): void => {
  console.log('🛑 Stopping all cron jobs...');
  activeJobs.forEach((job) => job.stop());
  activeJobs.length = 0;
};

export default useCronFeatures;
