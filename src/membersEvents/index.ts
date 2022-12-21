import { App } from '@slack/bolt';

import { memberJoins } from './memberJoins';
import { memberLefts } from './memberLefts';

export default (app: App): void => {
  memberJoins(app);
  memberLefts(app);
};
