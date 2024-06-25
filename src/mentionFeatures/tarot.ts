import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

import type { MentionFeature } from '../types';

// I copied the method of scrapping from:
// https://github.com/maciejkorolik/what-holidays/blob/main/src/getHolidays.ts
// Thanks Maciek ;)

const question: MentionFeature['question'] = [
  'tarot',
  'daj kartę',
  'daj karte',
  'wylosuj kartę',
  'wylosuj karte',
  'wylosuj mi kartę',
  'wylosuj mi karte',
];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  try {
    const response = await fetch('https://blog.otylia.pl/karta-dnia-tarot/');
    const html = await response.text();

    const parsedHtml = parse(html);

    const title = parsedHtml
      .querySelector('h2.wp-show-posts-entry-title a')
      .innerText.replace('&#8211; Karta dnia', '')
      .replace('&#8211; karta dnia', '')
      .trim();

    const image = parsedHtml.querySelector('.wp-show-posts-image a img');

    const descriptionElements = parsedHtml.querySelector(
      '.wp-show-posts-entry-summary',
    ).childNodes;

    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*<@${user}> Oto Twoja karta tarota na dziś:*`,
          },
        },
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: title,
          },
        },
        {
          type: 'image',
          image_url: image.attrs.src,
          alt_text: title,
          title: {
            type: 'plain_text',
            text: title,
          },
        },
        ...descriptionElements.map((descElement) => ({
          type: 'section',
          text: {
            type: 'plain_text',
            text: descElement.innerText,
          },
        })),
      ],
    });
  } catch (error) {
    console.error(error);
    await say(`Wybacz <@${user}>, tym razem nie mam dla Ciebie karty`);
  }
};

export default { question, middleware };
