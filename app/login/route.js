import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    login(email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email,
        password

      }).then(data => {
        localStorage['displayName'] = data['currentUser']['displayName'];
        localStorage['UID'] = data['currentUser']['uid'];

        this.transitionTo('protected').then(function (){
          Ember.run.schedule('afterRender', self, function () {
                window.fieldworkWorker.initFielworkWorker(email, password);
          });

        });
      });
    },

    forgotPassword() {

      this.transitionTo('password-reset');

    }
  }

});
