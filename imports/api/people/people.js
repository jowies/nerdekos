import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class PeopleCollection extends Mongo.Collection {
  insert(person, callback) {
    const newPerson = person;
    newPerson.approvedRelationships = person.approvedRelationships || 0;
    return super.insert(person, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }

}

export const People = new PeopleCollection('people');

People.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

People.schema = new SimpleSchema({
  name: { type: String },
  class: { type: String, optional: true },
  addedBy: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  approvedRelationships: { type: Number },
});

People.attachSchema(People.schema);

People.publicFields = {
  name: 1,
  class: 1,
  addedBy: 0,
  approvedRelationships: 1,
};

/*
People.helpers({
});
*/
