import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class SSCollection extends Mongo.Collection {
  insert(person, callback) {
    return super.insert(person, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }

}

export const SS = new SSCollection('ss');

SS.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

SS.schema = new SimpleSchema({
  firstname: { type: String },
  ss: { type: String },
});

SS.attachSchema(SS.schema);

SS.publicFields = {
  firstname: 1,
  ss: 1,
};

/*
SS.helpers({
});
*/
