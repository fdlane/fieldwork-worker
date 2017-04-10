import Ember from 'ember';

export default Ember.Route.extend({

  redirect() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('protected');
    }
  },

  actions: {
    login(email, password) {
      let session = this.get('session');
      this.intermediateTransitionTo('login.loading');
      session.open('firebase', {
        provider: 'password',
        email,
        password
      }).then(() => {
        let user = session.content.currentUser;
        let email = user.email;
        let username = email.substring(0, email.indexOf('@'));
        user.username = username;
        this.set('currentUser.content', user);
        this.transitionTo('protected');
      }, error => {
        if(error) {
          this.controller.set('invalidCredentials', true);
        }
        this.intermediateTransitionTo('login');
      });
    },

    willTransition(transition) {
      if(transition) {
        this.controller.set('invalidCredentials', false);
      }
    },

    forgotPassword() {

      this.transitionTo('password-reset');

    },
  },
});
