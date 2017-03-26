import Ember from 'ember';

export function initialize(registry) {
  const service = Ember.inject.service();

  registry.register('firebase:app', service, {
    instantiate: false,
    singleton: true
  });

  registry.inject('route', 'firebaseApp', 'firebase:app');
}

export default {
  name: 'firebase-app',
  initialize
};
