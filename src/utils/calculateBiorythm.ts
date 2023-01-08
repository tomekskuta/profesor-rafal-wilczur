import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import type { BiorythmResult } from '../types';

export function calculateBiorythm(dob: string): BiorythmResult {
  const dateOfBirth = dayjs(dob, [
    'DD.MM.YYYY',
    'DD/MM/YYYY',
    'DD-MM-YYYY',
    'DD.MM.YY',
    'DD/MM/YY',
    'DD-MM-YY',
  ]).startOf('day');
  const today = dayjs().startOf('day');
  const diff = today.diff(dateOfBirth, 'day');

  return {
    physical: Math.round(Math.sin((2 * Math.PI * diff) / 23) * 100),
    emotional: Math.round(Math.sin((2 * Math.PI * diff) / 28) * 100),
    intellectual: Math.round(Math.sin((2 * Math.PI * diff) / 33) * 100),
  };
}
