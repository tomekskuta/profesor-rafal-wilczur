import { SlackEventMiddlewareArgs } from '@slack/bolt';

interface MentionFeature {
  question: string | string[];
  middleware: (
    middlewareArgs: SlackEventMiddlewareArgs<'app_mention'>,
  ) => Promise<void>;
}

interface BiorythmResult {
  physical: number;
  emotional: number;
  intellectual: number;
}
