import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { parse } from 'node-html-parser';

const question = ['tarot', 'daj kartę', 'daj karte'];

const middleware = async ({
  say,
  event,
}: SlackEventMiddlewareArgs): Promise<void> => {
  const user = (event as { user: string }).user;

  const response = await fetch('https://blog.otylia.pl/karta-dnia-tarot/');
  const html = await response.text();

  const parsedHtml = parse(html);

  const title = parsedHtml
    .querySelector('h2.wp-show-posts-entry-title a')
    .innerText.replace('&#8211; Karta dnia', '')
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
};

export default { question, middleware };
