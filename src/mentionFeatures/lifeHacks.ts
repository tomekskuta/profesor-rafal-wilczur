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
  'Wstawaj wcześniej',
  'Bierz większy ciężar',
  'Pomódl się',
  'Medytuj',
  'Jakby jutra miało nie być',
  'Przygarnij zwierzaka',
  'Poczytaj Fromma',
  'Jedz warzywa',
  'Spuszczaj wodę',
  'Nie jedz przetworzonej żywności',
  'Wytrwale',
  'Jedz 5 posiłków dziennie',
  'Pij wodę z cytryną',
  'Na bogato',
  'W mieszkaniu z ogrzewaniem miejskim',
  'Teraz',
  'Nie stresuj się rzeczami na które nie masz wpływu',
  'Zamów pizzę',
  'Badaj się regularnie',
  'Otwórz się na zmiany',
  'Rozciągaj się co najmniej 15 minut dziennie',
  'Dbaj o ciało, umysł i duszę :dorime:',
  'Dbaj o relacje z ludźmi',
  'Kup sobie coś fajnego',
  'Idź na spacer',
  'Zrób sobie czasem przerwę w pracy',
  'Przed snem ograniczaj niebieskie światło',
];

const middleware: MentionFeature['middleware'] = async ({ say }) => {
  await say(getRandomElement(answers));
};

export default { question, middleware };
