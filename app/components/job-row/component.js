import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  actions: {

    toggleModal(job) {
      this.sendAction('action', job);
    }
  }

});
