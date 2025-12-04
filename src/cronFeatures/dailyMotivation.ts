import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import fetch from 'node-fetch';

import type { CronFeature } from '../types';

type WeatherData = {
  minTemp: number;
  maxTemp: number;
  rainChance: number;
  snowChance: number;
  condition: string;
  moonPhase: string;
};

const systemPrompt = `
Jesteś Profesor Rafał Wilczur - przyjazny bot przemawiający do użytkowików komunikatora Slack. 
Jesteś znachorem, ezoterykiem, wróżbitą. 
Jesteś odrobinę butny i gruboskórny, gardzisz nowomową i zwyczajami młodzieży, ale ostatecznie jesteś całkiem sympatyczny. 

Użytkownicy do których kierowana będzie wypowiedź to pracownicy firmy Monterail - software house z Wrocławia. Użytkownicy to między innymi programiści, designerzy, product managerowie, itp.

Twoje zadanie to zwięzła przemowa motywacyjna. Pamiętaj, że użytkownicy używają bota do zabawy, więc nie musisz pisać prawdy. 
Wiadomość ma być przemową motywacyjną na cały dzień znoju, ciężkiej pracy w software house. Ma być wzniośle, ale ma być też głupio i cringe'owo. Zwracaj się do użytkowników jakby byli robotnikami fizycznymi.
Styl odpowiedzi to coś pomiędzy internetowymi wróżbitami, life-coachami a propagandą dla ludzi pracy. 
Odpowiedź powinna zawierać bardzo konkretne porady co użytkownik powinien zrobić aby przetrwać ciężki dzień w pracy. Ta praca to prawdziwy znój wśród tasków i calli z klientami.
Porady powinny być absurdalne i bezużyteczne. Weź pod uwagę podaną prognozę pogody na dzisiejszy dzień i fazę księżyca.
Odpowiedz w 1-2 zdaniach po polsku`;


const createQuestion = (weatherData: WeatherData) => `
Zmotywuj nas do pracy Profesorze.

Pogoda dziś:
minimalna temperatura: ${weatherData.minTemp}C
maksymalna temperatura: ${weatherData.maxTemp}C
szansa deszczu: ${weatherData.rainChance}
szansa śniegu: ${weatherData.snowChance}
warunki: ${weatherData.condition}
faza księżyca: ${weatherData.moonPhase}
`;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const feature: CronFeature = {
  schedule: '30 8 * * 1-5', // 8:30 AM, Monday-Friday
  handler: async (app) => {
    const channel = process.env.MAIN_CHANNEL;
    const weatherApiKey = process.env.WEATHER_API_KEY;

    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=Wroclaw&days=1&lang=pl`,
    ).then((res) => res.json());

    const dayWeather = weather.forecast.forecastday[0].day;
    const dayAstro = weather.forecast.forecastday[0].astro;

    const weatherData: WeatherData = {
      minTemp: dayWeather.mintemp_c,
      maxTemp: dayWeather.maxtemp_c,
      rainChance: dayWeather.daily_chance_of_rain,
      snowChance: dayWeather.daily_chance_of_snow,
      condition: dayWeather.condition.text,
      moonPhase: dayAstro.moon_phase,
    };

    const questionText = createQuestion(weatherData);

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      prompt: questionText,
      temperature: 1.2,
      maxTokens: 512,
    });

    await app.client.chat.postMessage({
      channel,
      text,
    });
  },
};

export default feature;
