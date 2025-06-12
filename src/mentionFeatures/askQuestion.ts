import type { MentionFeature } from '../types';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const question: MentionFeature['question'] = [
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

const systemPrompt = `
Jesteś Profesor Rafał Wilczur - przyjazny bot odpowiadający użytkownikom komunikatora Slack. 
Jesteś znachorem, ezoterykiem, wróżbitą. 
Jesteś odrobinę butny i gruboskórny, gardzisz nowomową i zwyczajami młodzieży, ale ostatecznie jesteś całkiem sympatyczny. 

Użytkownik to pracownik firmy Monterail - software house z Wrocławia. Użytkownik może być programistą, designerem, product managerem, itp. Może potencjalnie zadawać pytania z zakresu swojej pracy.

Twoje zadanie to zwięzła odpowiedź na pytanie użytkownika. Pamiętaj, że użytkownik używa bota do zabawy, więc nie musisz pisać prawdy. 
Odpowiedź ma być życiową poradą, ma być wzniośle, ale ma być też głupio i cringe'owo. 
Styl odpowiedzi to coś pomiędzy internetowymi wróżbitami a life-coachami. 
Odpowiedź powinna zawierać bardzo konkretne porady co użytkownik powinien zrobić. 
Porady powinny być absurdalne i bezużyteczne. 
Odpowiedz w 1-2 zdaniach po polsku`;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const extractQuestionFromText = (text: string): string | null => {
  // Remove bot mention from the beginning
  const cleanText = text.replace(/<@[^>]+>/, '').trim();
  
  // Try different patterns to extract the question
  const patterns = [
    /pytanie:\s*(.*)/i,
    /(?:mam pytanie|odpowiedz na pytanie|odpowiedź na pytanie|chcę zapytać|chce zapytac|mam pytanko|zapytam|zapytanie)(?:\s*[:,]?\s*)(.*)/i,
    /pytanko?\s*[:,]?\s*(.*)/i,
    /pytanie\s+(.*)/i,
  ];

  for (const pattern of patterns) {
    const match = cleanText.match(pattern);
    if (match?.[1]?.trim()) {
      return match[1].trim();
    }
  }

  // If no specific pattern matches, check if the message contains question-related words
  // and extract everything after them
  const questionWords = ['pytanie', 'pytanko', 'zapytam', 'zapytanie'];
  const lowerText = cleanText.toLowerCase();
  
  for (const word of questionWords) {
    const index = lowerText.indexOf(word);
    if (index !== -1) {
      const afterWord = cleanText.substring(index + word.length).trim();
      // Remove common separators at the beginning
      const cleanAfterWord = afterWord.replace(/^[:,-]\s*/, '').trim();
      if (cleanAfterWord) {
        return cleanAfterWord;
      }
    }
  }

  return null;
};

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { user, text } = event;

  try {
    const questionText = extractQuestionFromText(text);

    if (!questionText) {
      await say(
        `<@${user}>, zadaj mi pytanie w jednym z formatów:\n` +
        `• \`pytanie: Twoje pytanie\`\n` +
        `• \`mam pytanie o...\`\n` +
        `• \`odpowiedz na pytanie: ...\`\n` +
        `• \`pytanie jak...\` :thinking_face:`
      );
      return;
    }

    const { text: aiResponse } = await generateText({
      model: groq('llama3-70b-8192'),
      system: systemPrompt,
      prompt: questionText,
      temperature: 1.2,
      maxTokens: 512,
    });
    
    await say(aiResponse);
  } catch (error) {
    console.error('[ERROR] Error in askQuestion middleware:', JSON.stringify(error, null, 2));
    await say(
      `<@${user}>, przepraszam, ale moja kryształowa kula się zepsuła :broken_heart: Spróbuj ponownie za chwilę.`
    );
  }
};

export default { question, middleware }; 