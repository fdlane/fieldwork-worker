import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
      login() {

        this.sendAction('action', this.get('userEmail'), this.get('userPassword'));

      }
    }
});
