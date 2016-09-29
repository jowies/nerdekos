import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Session } from 'meteor/session';
import HomeLayout from '../../ui/layouts/home_layout.jsx';
import PublicContainer from '../../ui/containers/public_container.jsx';
import Welcome from '../../ui/pages/welcome.jsx';


function goHome(context, redirect) {
  if (Session.get('client') === 'unknown') {
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
