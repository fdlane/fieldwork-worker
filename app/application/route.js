import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    logout() {

      this.get('session').close().then(function() {
        this.transitionTo('application');
      }.bind(this));
    }
  }

});
