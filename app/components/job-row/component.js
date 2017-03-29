import Ember from 'ember';

export default Ember.Component.extend({

  enabled: false,

  actions: {

    toggleModal() {
      this.toggleProperty('enabled');
    }
  }
  
});
