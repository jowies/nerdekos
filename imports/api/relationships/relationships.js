import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { People } from '../people/people.js';

class RelationshipsCollection extends Mongo.Collection {
  insert(relationship, callback) {
    const newRelationship = relationship;
    newRelationship.date = new Date() || relationship.date;
    return super.insert(newRelationship, callback);
  }
  remove(selector, callback) {
    const person = People.findOne();
    console.log(person);
    console.log(selector);
    console.log(People.find({ relationships: selector }).fetch());
    People.update({ relationships: selector }, { $pull: { relationships: selector } }, { multi: true });
    return super.remove(selector, callback);
  }

}

export const Relationships = new RelationshipsCollection('relationships');

Relationships.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Relationships.schema = new SimpleSchema({
  people: { type: [String], regEx: SimpleSchema.RegEx.Id },
  type: { type: String },
  date: { type: Date },
  addedBy: { type: String },
});

Relationships.attachSchema(Relationships.schema);

Relationships.publicFields = {
  people: 1,
  type: 1,
  date: 1,
  addedBy: 1,
};

/*
Relationships.helpers({
});
*/
