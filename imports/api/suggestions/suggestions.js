import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class SuggestionsCollection extends Mongo.Collection {
  insert(suggestion, callback) {
    const newSuggestion = suggestion;
    newSuggestion.date = newSuggestion.date || new Date();
    newSuggestion.resolved = false;
    newSuggestion.removed = false;
    return super.insert(newSuggestion, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Suggestions = new SuggestionsCollection('suggestions');

Suggestions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Suggestions.schema = new SimpleSchema({
  people: { type: [Object] },
  type: { type: String },
  comment: { type: String, optional: true },
  date: { type: Date },
  resolved: { type: Boolean },
  duplicate: { type: Boolean },
  'people.$.firstname': {
    type: String,
  },
  'people.$.lastname': {
    type: String,
  },
  removed: { type: Boolean },
});

Suggestions.attachSchema(Suggestions.schema);

Suggestions.publicFields = {
  people: 1,
  type: 1,
  date: 1,
  resolved: 1,
  comment: 1,
  duplicate: 1,
  removed: 1,
};

/*
Suggestions.helpers({
});
*/
