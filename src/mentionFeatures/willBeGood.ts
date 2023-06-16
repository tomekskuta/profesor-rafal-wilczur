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
          alt_text: 'Będzie dobrze',
          title: {
            type: 'plain_text',
            text: 'Będzie dobrze',
            emoji: true,
          },
          thumbnail_url: 'https://i.ytimg.com/vi/7ZjbOzsIaRs/maxresdefault.jpg',
          video_url: 'https://youtube.com/embed/7ZjbOzsIaRs',
        },
      ],
    });

    return;
  }

  await say(`<@${user}> ${answer}`);
};

export default { question, middleware };
