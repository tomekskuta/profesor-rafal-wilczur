import type { MentionFeature } from '../types';

const question: MentionFeature['question'] = [
    'czy dam rade',
    'czy dam rade?',
    'czy dam radę',
    'czy dam radę?',
];

const middleware: MentionFeature['middleware'] = async ({ say, event }) => {
    const { user } = event;

    const answer = 'Masz w sobie siłę i mądrość i jestem z Ciebie bardzo dumny. Uczyłem Cię od małego dziecka. Nauczyłem Cię wszystkiego co umiem. I teraz jesteś na wyszym poziomie niż mógłbym kiedykolwiek marzyć. Ale miej cierpliwość. Nie upłynie dużo czasu zanim uda Ci się osiągnąć swoje cele.';

    await say(`<@${user}> ${answer}`);
};

export default { question, middleware };
