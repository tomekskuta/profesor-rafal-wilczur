import type { MentionFeature } from '../types';
import { calculateBiorythm } from '../utils/calculateBiorythm';

const question: MentionFeature['question'] = ['biorytm'];

const matcher: MentionFeature['matcher'] = (text: string) => {
  return text.toLowerCase().includes('biorytm');
};

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user, text } = event;

  try {
    const inputDate = text.split('biorytm')[1].trim();

    if (!inputDate) {
      await say(
        'Podaj datę urodzenia w formacie DD.MM.YYYY, przykład: `biorytm 02.04.2005`',
      );
      return;
    }

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
            text: `- Fizyczny: ${result.physical}%`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `- Emocjonalny: ${result.emotional}%`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `- Intelektualny: ${result.intellectual}%`,
          },
        },
      ],
    });
  } catch {
    await say(
      'Wybacz <@' +
        user +
        '>, nie potrafię obliczyć dla Ciebie biorytmu :cry: \n\nUpewnij się, że podana data urodzenia ma poprawny format (`DD.MM.YYYY`)',
    );
  }
};

export default { question, middleware, matcher };
