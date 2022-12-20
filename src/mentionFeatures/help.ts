import { SlackEventMiddlewareArgs } from '@slack/bolt';

const question = ['help', 'pomóż', 'pomoz'];

const middleware = async ({ say }: SlackEventMiddlewareArgs): Promise<void> => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Co chcesz wiedzieć?*',
        },
      },
      { type: 'divider' },

      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Oznacz mnie w wiadomości `@Profesor Rafał Wilczur <pytanie>` a odpowiem na Twoje pytanie. Co mogę Ci powiedzieć:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '`pomóż` - Wyjaśnię Ci o jakie rzeczy możesz zapytać (ta wiadomość)',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '`jak żyć?` - Dam Ci bezcenną wskazówkę. Podążaj za nią a Twoje życie będzie obfite.',
        },
      },

      // TODO: Here add list of features with description
      // {
      //   type: 'section',
      //   text: {
      //     type: 'mrkdwn',
      //     text: '`Nowy ficzer` - Opis nowego ficzera',
      //   },
      // },

      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'Co? Mało? Wy millenialsi wszystko chcecie od razu. Cierpliwości. Niebawem dowiesz się więcej.',
        },
      },
    ],
  });
};

export default { question, middleware };
