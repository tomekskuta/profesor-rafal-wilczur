import { App } from '@slack/bolt';

import { mention } from './mention';
import { goodBye } from './goodBye';

const useMessageFeatures = (app: App): void => {
  // TODO: Here you may add and run your message feature
  mention(app);
  goodBye(app);
};

export default useMessageFeatures;
