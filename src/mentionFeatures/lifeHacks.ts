import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';

const question: MentionFeature['question'] = [
  'jak żyć?',
  'jak żyć',
  'jak zyc',
  'jak zyc?',
];

const answers = [
  'Szybko',
  'Mądrze',
  'Gibko',
  'Wyjdź z psem',
  'Krótko',
  'Posadź marchew',
  'Długo i szczęśliwie',
  'Poradź sobie jakoś',
  'Pij wodę',
  'Uczciwie',
  'Nie pij tyle',
  'Skromnie',
];

const middleware: MentionFeature['middleware'] = async ({ say }) => {
  await say(getRandomElement(answers));
};

export default { question, middleware };
