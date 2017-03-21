import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

export const getUsernameByToken = new ValidatedMethod({
  name: 'admin.getUsernameByToken',
  validate: new SimpleSchema({
    token: { type: String },
  }).validator(),
  run({ token }) {
    if (Meteor.isServer) {
      console.log(token);
      const user = Meteor.users.findOne({
        'services.password.reset.token': token,
      });
      return user.username;
    }
    return '';
  },
});



export const getUsername = new ValidatedMethod({
  name: 'admin.getUsername',
  validate: new SimpleSchema({
  }).validator(),
  run() {
    if (Meteor.isServer) {
      const user = Meteor.user();
      return user.username;
    }
    return '';
  },
});

const ADMINS_METHODS = _.pluck([
  getUsernameByToken,
  getUsername,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ADMINS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
