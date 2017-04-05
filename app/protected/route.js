import Ember from 'ember';

export default Ember.Route.extend({

  model() {
      return Ember.RSVP.hash({
          jobs: this.store.query('job', {
              orderBy: "assignedTo",
              equalTo: this.get('currentUser.username'),
          }),
      });
  },

  actions: {

    toggleModal(job) {
      this.controller.set('metaId', job.get('metaId'));
      this.controller.set('category', job.get('category'));
      this.controller.set('contactInfo', job.get('contactInfo'));
      this.controller.set('description', job.get('description'));
      this.controller.set('status', job.get('status'));
      this.controller.set('location', job.get('location'));
      this.controller.set('jobImage', job.get('jobImage'));
    }

  }

});
