import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Username from '../components/username.jsx';

const AdminUsernameContainer = createContainer(() => {
  const loading = !Meteor.users.ready();
  return {
    loading,
    user: Meteor.user(),
  };
}, Username);

export default AdminUsernameContainer;
