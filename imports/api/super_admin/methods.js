import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

export const add = new ValidatedMethod({
  name: 'admin.insert',
  validate: new SimpleSchema({
    username: { type: String },
    email: { type: String },
  }).validator(),
  run({ username, email }) {
    if (Meteor.isServer) {
      if (Meteor.user().adminLevel === 1) {
        const userId = Accounts.createUser({
          username,
          email,
          adminLevel: 2,
        });
        Accounts.sendEnrollmentEmail(userId);
      }
    }
  },
});

export const remove = new ValidatedMethod({
  name: 'admin.remove',
  validate: new SimpleSchema({
    username: { type: String },
  }).validator(),
  run({ username }) {
    if (Meteor.isServer) {
      if (Meteor.user().adminLevel === 1) {
        Meteor.users.remove({ username });
      }
    }
  },
});

const ADMIN_METHODS = _.pluck([
  add,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ADMIN_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
