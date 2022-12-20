import { SlackEventMiddlewareArgs } from '@slack/bolt';

// TODO: Question for Profesor, on slack is used after mentioning Profesor - string | string[]
const question = 'your question';

const middleware = async (
  middlewareArgs: SlackEventMiddlewareArgs,
): Promise<void> => {
  // TODO: Action to do and response for the question
};

export default { question, middleware };
