import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import HomeLayout from '../../ui/layouts/home_layout.jsx';
import AdminLayout from '../../ui/layouts/admin_layout.jsx';
import PublicContainer from '../../ui/containers/public_container.jsx';
import PeopleContainer from '../../ui/containers/people_container.jsx';
import AdminContainer from '../../ui/containers/admin_container.jsx';
import SuggestionsContainer from '../../ui/containers/suggestions_container.jsx';
import AdminAddContainer from '../../ui/containers/admin_add_container.jsx';
import Welcome from '../../ui/pages/welcome.jsx';
import SignIn from '../../ui/pages/sign_in.jsx';
import SetPassword from '../../ui/pages/set_password.jsx';
import WelcomeAdmin from '../../ui/pages/welcome_admin.jsx';
import HeMan from '../../ui/pages/he_man.jsx';
import Globals from './globals.js';
import { Meteor } from 'meteor/meteor';

function goHome(context, redirect) {
  if (Globals.client === 'unknown' && !Meteor.userId()) {
    redirect('/');
  }
}

function admin(context, redirect) {
  if (Globals.client !== 'admin' && !Meteor.userId()) {
    redirect('/');
  }
}

FlowRouter.route('/', {
  action() {
    mount(Welcome);
  },
});

FlowRouter.route('/kart', {
  triggersEnter: [goHome],
  action() {
    mount(HomeLayout, { content: <PublicContainer /> });
  },
});

FlowRouter.route('/sign_in', {
  triggersEnter: [admin],
  action() {
    mount(SignIn);
  },
});

FlowRouter.notFound = {
  action() {
    mount(HeMan);
  },
};

FlowRouter.route('/suggestion', {
  triggersEnter: [goHome],
  action() {
    mount(HomeLayout, { content: <PeopleContainer /> });
  },
});


FlowRouter.route('/admin/add', {
  triggersEnter: [admin],
  action() {
    mount(AdminLayout, { content: <AdminAddContainer /> });
  },
});

FlowRouter.route('/admin/kart', {
  triggersEnter: [admin],
  action() {
    mount(AdminLayout, { content: <AdminContainer /> });
  },
});

FlowRouter.route('/admin/suggestions', {
  triggersEnter: [admin],
  action() {
    mount(AdminLayout, { content: <SuggestionsContainer /> });
  },
});

FlowRouter.route('/set_password', {
  action() {
    mount(SetPassword, { token: Globals.token, done: Globals.doneFunction });
  },
});

FlowRouter.route('/admin/welcome', {
  action() {
    mount(WelcomeAdmin);
  },
});
