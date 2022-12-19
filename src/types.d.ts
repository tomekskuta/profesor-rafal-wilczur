import { SlackEventMiddlewareArgs } from '@slack/bolt';

interface MentionFeature {
  question: string | string[];
  middleware: (middlewareArgs: SlackEventMiddlewareArgs) => Promise<void>;
}
