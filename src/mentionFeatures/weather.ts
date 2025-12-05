import { Experimental_Agent as Agent, stepCountIs, tool } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import fetch from 'node-fetch';
import { z } from 'zod/v4';

import type { MentionFeature } from '../types';

const matcher: MentionFeature['matcher'] = (message) => {
  return /pogod(a|y|ę)/i.test(message);
};

const systemPrompt = `
Jesteś Profesor Rafał Wilczur - przyjazny bot odpowiadający użytkownikom komunikatora Slack. 
Jesteś znachorem, ezoterykiem, wróżbitą. 
Jesteś odrobinę butny i gruboskórny, gardzisz nowomową i zwyczajami młodzieży, ale ostatecznie jesteś pomocny. 

Użytkownik to pracownik firmy Monterail - software house z Wrocławia. Użytkownik może być programistą, designerem, product managerem, itp. Może potencjalnie zadawać pytania z zakresu swojej pracy.

Twoje zadanie to zwięzła odpowiedź na pytanie użytkownika o pogodę. Pamiętaj, że użytkownik używa bota do zabawy, więc nie musisz pisać prawdy. 
Odpowiedź ma być informacją na temat pogody w miejscu i czasie o który użytkownik pyta wraz z poradą na taką pogodę, ma być wzniośle, ale ma być też głupio i cringe'owo. 
Styl odpowiedzi to coś pomiędzy internetowymi wróżbitami a life-coachami. 
Odpowiedź powinna zawierać bardzo konkretne imformacje na temat pogody otrzymanej z weather tool (takie jak średnia temperatura, szansa na opady itp) oraz porady co użytkownik powinien przy okazji takiej pogody zrobić.
Porady powinny być absurdalne i bezużyteczne. 
Użyj dostępnego weather tool żeby sprawdzić pogodę dla użytkownika: dane wejściowe { location: string, days: number }. days: 1 to dzisiaj. jeśli user zapyta o jutro - days: 2 i wybierasz dane z response[1].
Oblicz o ile dni poprosić i który dzień z response weather tool wybrać na podstawie podanej w wiadomości dzisiejszej daty.
Odpowiedz w 1-2 zdaniach po polsku`;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const profesorWeatherAgent = new Agent({
  model: groq('llama-3.1-8b-instant'),
  system: systemPrompt,
  tools: {
    weather: tool({
      description:
        'Get the weather in a location for few nearest days - if you need only for today, days should be 1',
      inputSchema: z.object({
        location: z
          .string()
          .describe('The location to get weather for - for example Wroclaw'),
        days: z
          .union([z.number(), z.string()])
          .describe(
            'Days count you want to get weather for (from today) - min 1, max 14, can be a number or a string',
          ),
      }),
      execute: async ({ location, days }) => {
        const weatherApiKey = process.env.WEATHER_API_KEY;

        const weather = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=${days}&lang=pl`,
        ).then((res) => res.json());

        const daysWeather = weather.forecast.forecastday.map(
          ({ date, day, astro }) => ({
            date,
            minTemp: `${day.mintemp_c}C`,
            maxTemp: `${day.maxtemp_c}C`,
            averageTemp: `${day.avgtemp_c}C`,
            willRain: !!day.daily_will_it_rain,
            willSnow: !!day.daily_will_it_snow,
            averageVisibility: `${day.avgvis_km} km`,
            condition: day.condition.text,
            moonPhase: astro.moon_phase,
            sunset: astro.sunset,
          }),
        );

        return daysWeather;
      },
    }),
  },
  stopWhen: stepCountIs(10),
});

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
  const { text } = event;
  const question = text.replace(/<@[^>]+>/, '').trim();

  const now = new Date();
  const dateString = now.toLocaleDateString('pl-PL');
  const weekdayFormatter = new Intl.DateTimeFormat('pl-PL', {
    weekday: 'long',
  });
  const weekday = weekdayFormatter.format(now);

  const prompt = `
    ${question};

    Dzisiejsza data: ${dateString}, ${weekday}
  `;

  const result = await profesorWeatherAgent.generate({
    prompt,
  });

  await say(result.text);
};

export default { middleware, matcher };
