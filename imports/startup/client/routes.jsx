import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import HomeLayout from '../../ui/layouts/home_layout.jsx';
import PublicContainer from '../../ui/containers/public_container.jsx';
import Welcome from '../../ui/pages/welcome.jsx';

FlowRouter.route('/', {
  action() {
    mount(HomeLayout, { content: <PublicContainer /> });
  },
});

FlowRouter.route('/kart', {
  action() {
    mount(Welcome);
  },
});
