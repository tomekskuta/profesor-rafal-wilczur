import { App } from '@slack/bolt';

import type { MentionFeature } from '../types';
import { getFeatureObject } from '../utils/getFeatureObject';

import help from './help';
import hello from './hello';
import lifeHacks from './lifeHacks';
import tarot from './tarot';
import biorythm from './biorythm';
import willBeGood from './willBeGood';

const featuresObject: Record<string, MentionFeature['middleware']> = [
  // TODO: Here you may add your mention feature
  help,
  hello,
  lifeHacks,
  tarot,
  biorythm,
  willBeGood,
].reduce((acc, curr) => ({ ...acc, ...getFeatureObject(curr) }), {});

const useMentionFeatures = (app: App): void => {
  app.event('app_mention', async (eventMiddlewareArrgs) => {
    const incomingMessage = eventMiddlewareArrgs.payload.text;
    const message = incomingMessage.includes('biorytm')
      ? 'biorytm'
      : incomingMessage.split(' ').slice(1).join(' ').toLowerCase();

    const featureMiddleware = featuresObject[message];

    featureMiddleware
      ? await featureMiddleware(eventMiddlewareArrgs)
      : await featuresObject.help(eventMiddlewareArrgs);
  });
};

export default useMentionFeatures;
