import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class RelationshipsCollection extends Mongo.Collection {
  insert(relationship, callback) {
    return super.insert(relationship, callback);
  }
  remove(selector, callback) {
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
  approvedBy: { type: String, optional: true },
  approved: { type: Boolean, defaultValue: false },
});

Relationships.attachSchema(Relationships.schema);

Relationships.publicFields = {
  people: 1,
  type: 1,
  date: 1,
  approvedBy: 0,
  approved: 1,
};

/*
Relationships.helpers({
});
*/
