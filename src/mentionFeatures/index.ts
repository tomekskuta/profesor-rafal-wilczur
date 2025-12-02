import { App } from '@slack/bolt';

import type { MentionFeature } from '../types';
import { getFeatureObject } from '../utils/getFeatureObject';

import help from './help';
import hello from './hello';
import lifeHacks from './lifeHacks';
import tarot from './tarot';
import biorythm from './biorythm';
import willBeGood from './willBeGood';
import willISuccede from './willISuccede';
import askQuestion from './askQuestion';

const features: MentionFeature[] = [
  // TODO: Here you may add your mention feature
  help,
  hello,
  lifeHacks,
  tarot,
  biorythm,
  willBeGood,
  willISuccede,
  askQuestion,
];

const featuresObject: Record<string, MentionFeature['middleware']> = features.reduce(
  (acc, curr) => ({ ...acc, ...getFeatureObject(curr) }),
  {},
);

const patternFeatures = features.filter(f => f.matcher);

const useMentionFeatures = (app: App): void => {
  app.event('app_mention', async (eventMiddlewareArrgs) => {
    const incomingMessage = eventMiddlewareArrgs.payload.text;

    // Check pattern matchers first
    for (const feature of patternFeatures) {
      if (feature.matcher!(incomingMessage)) {
        await feature.middleware(eventMiddlewareArrgs);
        return;
      }
    }

    // Default parsing for exact matches
    const message = incomingMessage.split(' ').slice(1).join(' ').toLowerCase();
    const featureMiddleware = featuresObject[message];

    featureMiddleware
      ? await featureMiddleware(eventMiddlewareArrgs)
      : await featuresObject.help(eventMiddlewareArrgs);
  });
};

export default useMentionFeatures;
