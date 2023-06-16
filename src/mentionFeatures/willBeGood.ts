import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const question: MentionFeature['question'] = [
  'będzie dobrze?',
  'bedzie dobrze?',
  'będzie dobrze',
  'bedzie dobrze',
];

const answers = ['będzie dobrze!', 'nie będzie.', 'VIDEO_LINK'];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  const answer = getRandomElement(answers);

  if (answer === 'VIDEO_LINK') {
    await say({
      blocks: [
        {
          type: 'video',
          video_url: 'https://www.youtube.com/embed/7ZjbOzsIaRs',
        },
      ],
    });

    return;
  }

  await say(`<@${user}> ${getRandomElement(answers)}`);
};

export default { question, middleware };
