import Ember from 'ember';

export default Ember.Route.extend({

actions: {
  resetPassword(userEmail) {

    const auth = this.get('firebaseApp').auth();
    auth.sendPasswordResetEmail(userEmail).then(() => {
      this.transitionTo('login');
    },
    (error) => {
      console.log(error);
    });

  },
}

});
