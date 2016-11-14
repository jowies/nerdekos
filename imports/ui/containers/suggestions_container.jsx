import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Suggestions } from '../../api/suggestions/suggestions.js';
import SuggestionsComponent from '../pages/suggestions.jsx';

const SuggestionsContainer = createContainer(() => {
  const suggestionsHandle = Meteor.subscribe('suggestions.unResolved');
  const loading = !suggestionsHandle.ready;
  return {
    loading,
    connected: Meteor.status().connected,
    suggestions: Suggestions.find({}, { sort: { date: -1 } }).fetch(),
  };
}, SuggestionsComponent);

export default SuggestionsContainer;
