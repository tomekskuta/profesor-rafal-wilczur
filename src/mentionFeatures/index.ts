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

const featuresObject: Record<string, MentionFeature['middleware']> = [
  // TODO: Here you may add your mention feature
  help,
  hello,
  lifeHacks,
  tarot,
  biorythm,
  willBeGood,
  willISuccede,
  askQuestion,
].reduce((acc, curr) => ({ ...acc, ...getFeatureObject(curr) }), {});

const checkForQuestionPattern = (text: string): string | null => {
  const lowerText = text.toLowerCase();
  
  // Check for specific question patterns - MUST MATCH askQuestion.ts exactly
  const questionPatterns = [
    'pytanie:',
    'pytanie',
    'mam pytanie',
    'odpowiedz na pytanie',
    'odpowiedź na pytanie',
    'chcę zapytać',
    'chce zapytac',
    'mam pytanko',
    'pytanko',
    'zapytam',
    'zapytanie'
  ];

  // Check if any of the patterns exist in the text AND in featuresObject
  for (const pattern of questionPatterns) {
    if (lowerText.includes(pattern) && featuresObject[pattern]) {
      return pattern;
    }
  }

  return null;
};

const useMentionFeatures = (app: App): void => {
  app.event('app_mention', async (eventMiddlewareArrgs) => {
    const incomingMessage = eventMiddlewareArrgs.payload.text;
    
    // Check for special cases first
    if (incomingMessage.includes('biorytm')) {
      await featuresObject.biorytm(eventMiddlewareArrgs);
      return;
    }

    // Check for question patterns
    const questionPattern = checkForQuestionPattern(incomingMessage);
    if (questionPattern) {
      await featuresObject[questionPattern](eventMiddlewareArrgs);
      return;
    }

    // Default parsing for other features
    const message = incomingMessage.split(' ').slice(1).join(' ').toLowerCase();
    const featureMiddleware = featuresObject[message];

    featureMiddleware
      ? await featureMiddleware(eventMiddlewareArrgs)
      : await featuresObject.help(eventMiddlewareArrgs);
  });
};

export default useMentionFeatures;
