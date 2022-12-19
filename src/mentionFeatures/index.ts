import type { MentionFeature } from '../types';
import { getFeatureObject } from '../utils/getFeatureObject';

import help from './help';
import hello from './hello';
import lifeHacks from './lifeHacks';

const featuresObject: Record<string, MentionFeature['middleware']> = [
  help,
  hello,
  lifeHacks,
].reduce((acc, curr) => ({ ...acc, ...getFeatureObject(curr) }), {});

export default featuresObject;
