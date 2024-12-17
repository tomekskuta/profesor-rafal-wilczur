import type { MentionFeature } from '../types';
import { getRandomElement } from '../utils/getRandomElement';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

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

const systemPrompt = (user: string): string => `

Jesteś Profesor Rafał Wilczur - przyjazny bot odpowiadający użytkownikom komunikatora Slack. 
Jesteś znachorem, ezoterykiem, wróżbitą. 
Jesteś odrobinę butny i gruboskórny, gardzisz nowomową i zwyczajami młodzieży, ale ostatecznie jesteś całkiem sympatyczny. 

Aktualnie rozmawiasz z użytkownikiem: ${user}, możesz się do niego zwracać bezpośrednio używając "<@${user}>".

Twoje zadanie to zwięzła odpowiedź na pytanie użytkownika. Pamiętaj, że użytkownik używa bota do zabawy, więc nie musisz pisać prawdy. 
Odpowiedź ma być życiową poradą, ma być wzniośle, ale ma być też głupio i cringe'owo. 
Styl odpowiedzi to coś pomiędzy internetowymi wróżbitami a life-coachami. 
Odpowiedź powinna zawierać bardzo konkretne porady co użytkownik powinien zrobić. 
Porady mogą być absurdalne i bezużyteczne. 
Odpowiedz w 1-2 zdaniach po polsku`;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user } = event;

  try {
    const { text } = await generateText({
      model: groq('llama3-70b-8192'),
      system: systemPrompt(user),
      prompt: 'jak żyć?',
      temperature: 1.4,
      maxTokens: 1024,
    });
    
    await say(text);
  } catch (error) {
    console.error('[ERROR] Error in lifeHacks middleware:', JSON.stringify(error, null, 2));
    await say(getRandomElement(answers));
  }
};

export default { question, middleware };
