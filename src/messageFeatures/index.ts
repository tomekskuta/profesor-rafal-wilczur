import { App } from '@slack/bolt';

import { mention } from './mention';
import { goodBye } from './goodBye';
import { nowomowa } from './nowomowa';

const useMessageFeatures = (app: App): void => {
  // TODO: Here you may add and run your message feature
  mention(app);
  goodBye(app);
  nowomowa(app);
};

export default useMessageFeatures;
