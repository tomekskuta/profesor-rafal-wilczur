import { App } from '@slack/bolt';

import { memberJoins } from './memberJoins';
// TODO: Uncomment when will be safe time :(
// import { memberLefts } from './memberLefts';

export default (app: App): void => {
  memberJoins(app);
  // memberLefts(app);
};
