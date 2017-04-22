import Ember from 'ember';

export default Ember.Route.extend({

  jobService: Ember.inject.service('job'),

  model() {
      return Ember.RSVP.hash({
          jobs: this.get('store').query('job', {
              orderBy: "assignedTo",
              equalTo: this.get('currentUser.username'),
          })
      });
  },

  afterModel(model) {

      this.set('jobService.jobs', model.jobs);
  },

  actions: {

    toggleModal(job) {
      this.controller.set('jobImage', job.get('jobImage'));
      this.controller.set('job', job);
    },
    changeStatus(){
      this.store.findRecord('job', this.controller.get('job').get('id')).then(this.updateStatus());
    }
  }

});
