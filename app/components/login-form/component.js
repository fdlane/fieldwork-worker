import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
      login() {

        this.sendAction('login', this.get('userEmail'), this.get('userPassword'));

      },

      forgotPassword() {
        this.sendAction('forgotPassword');
      }
    }
});
