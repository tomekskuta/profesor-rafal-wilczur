import type { CronFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const motivationalQuotes = [
  'Dzień dobry! Pamiętajcie - energia wszechświata jest z wami! 🌟',
  'Nowy dzień, nowe możliwości. Niech będzie owocny! ✨',
  'Poranek to najlepsza pora na wielkie plany. Do dzieła! 💪',
  'Dzień dobry! Dzisiaj jest dobry dzień na bycie dobrym człowiekiem.',
];

const feature: CronFeature = {
  schedule: '0 9 * * 1-5', // 9 AM, Monday-Friday
  handler: async (app) => {
    const channel = process.env.MAIN_CHANNEL;
    await app.client.chat.postMessage({
      channel,
      text: getRandomElement(motivationalQuotes),
    });
  },
};

export default feature;
