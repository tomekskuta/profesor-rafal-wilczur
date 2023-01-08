import type { MentionFeature } from '../types';
import { calculateBiorythm } from '../utils/calculateBiorythm';
import dayjs from 'dayjs';

const question: MentionFeature['question'] = ['biorytm'];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user, text } = event;

  try {
    const inputDate = text.split('biorytm')[1].trim();

    const result = calculateBiorythm(inputDate);

    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*<@${user}>, Twój biorytm na dziś to: *`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '- Fizyczny: ' + result.physical + '%',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '- Emocjonalny: ' + result.emotional + '%',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '- Intelektualny: ' + result.intellectual + '%',
          },
        },
      ],
    });
  } catch {
    await say(
      `Wybacz <@${user}>, nie potrafię obliczyć dla Ciebie biorytmu. /n Upewnij się, że `,
    );
  }
};

export default { question, middleware };
