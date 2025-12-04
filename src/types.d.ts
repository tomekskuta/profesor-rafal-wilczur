import { SlackEventMiddlewareArgs, App } from '@slack/bolt';

interface MentionFeature {
  question: string | string[];
  middleware: (
    middlewareArgs: SlackEventMiddlewareArgs<'app_mention'>,
  ) => Promise<void>;
  matcher?: (text: string) => boolean;
}

interface BiorythmResult {
  physical: number;
  emotional: number;
  intellectual: number;
}

interface CronFeature {
  schedule: string;
  handler: (app: App, channel: string) => Promise<void>;
}
