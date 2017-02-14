import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    console.log("Debugging " + this.get('session'));
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('application');
    }
  }
});
