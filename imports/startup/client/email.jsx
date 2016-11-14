import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Globals from './globals.js';

Accounts.onEnrollmentLink((token, done) => {
  Globals.doneFunction = done;
  Globals.token = token;
  FlowRouter.go('/set_password');
});
