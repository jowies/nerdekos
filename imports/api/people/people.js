import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class PeopleCollection extends Mongo.Collection {
  insert(person, callback) {
    const newPerson = person;
    newPerson.date = person.date || new Date();
    newPerson.relationships = [];
    return super.insert(newPerson, callback);
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
  firstname: { type: String },
  lastname: { type: String },
  date: { type: Date },
  addedBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  relationships: { type: [String] },
});

People.attachSchema(People.schema);

People.publicFields = {
  firstname: 1,
  lastname: 1,
  date: 1,
  addedBy: 1,
  relationships: 1,
};

/*
People.helpers({
});
*/
