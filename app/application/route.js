import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {

    this.get('session').fetch().catch((error) => {
      if(error) {
        console.log("Error fetching session: " + error);
        //this.transitionTo('login');
      }
    });

  },


  actions: {

    logout() {

      this.get('session').close().then(() => {
        localStorage['displayName'] = null;
        localStorage['UID'] = null;
        this.transitionTo('login');
      });

    }
  }

});
