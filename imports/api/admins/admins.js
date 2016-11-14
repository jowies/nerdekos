import { Accounts } from 'meteor/accounts-base';


Accounts.onCreateUser((options, user) => {
  const newUser = user;
  newUser.adminLevel = options.adminLevel || 2;
  return newUser;
});

Accounts.config({
  forbidClientAccountCreation: true,
});
