import { MentionFeature } from '../types';

export const getFeatureObject = (
  feature: MentionFeature,
): Record<string, MentionFeature['middleware']> => {
  const { question, middleware } = feature;

  if (!question) return {};

  if (typeof question === 'string') {
    return {
      [question]: middleware,
    };
  }

  return question.reduce((acc, curr) => ({ ...acc, [curr]: middleware }), {});
};
