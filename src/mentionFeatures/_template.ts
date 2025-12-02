import type { MentionFeature } from '../types';

// TODO: Question for Profesor, on slack is used after mentioning Profesor - string | string[]
const question: MentionFeature['question'] = 'your question';

const matcher: MentionFeature['matcher'] = (message) => {
  // TODO: (optional) your matcher function for custom logic
  return true;
}

const middleware: MentionFeature['middleware'] = async (middlewareArgs) => {
  // TODO: Action to do and response for the question
};

export default { question, middleware, matcher };
