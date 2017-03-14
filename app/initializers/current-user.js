import Ember from 'ember';

export function initialize(registry) {
  const service = Ember.ObjectProxy.create();

  registry.register('user:current', service, {
    instantiate: false,
    singleton: true
  });

  registry.inject('route', 'currentUser', 'user:current');
  registry.inject('controller', 'currentUser', 'user:current');
  registry.inject('component', 'currentUser', 'user:current');
  registry.inject('service', 'currentUser', 'user:current');
  registry.inject('authenticator', 'currentUser', 'user:current');
}

export default {
  name: 'current-user',
  initialize
};
