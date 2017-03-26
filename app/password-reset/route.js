import Ember from 'ember';

export default Ember.Route.extend({

actions: {
  resetPassword(userEmail) {

    const auth = this.get('firebaseApp').auth();
    auth.sendPasswordResetEmail(userEmail).then(() => {
      this.controller.set('displayError', false);
      this.controller.set('displaySuccess', true);
    },
    (error) => {
      if(error) {
        this.controller.set('displayError', true);
        this.controller.set('displaySuccess', false);
      }
    });

  },
}

});
