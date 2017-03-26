import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    resetPassword() {

      this.sendAction('action', this.get('userEmail'));

    }
  }

});
