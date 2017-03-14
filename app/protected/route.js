import Ember from 'ember';

export default Ember.Route.extend({

  model(){

      return Ember.RSVP.hash({
        jobs: this.store.query('job', {
          orderBy: "isActive",
          equalTo: true
        }),
      });
    }
    
});
