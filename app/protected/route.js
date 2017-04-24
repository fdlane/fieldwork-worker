import Ember from 'ember';

export default Ember.Route.extend({

  jobService: Ember.inject.service('job'),

  model() {
      return Ember.RSVP.hash({
          jobs: this.get('store').query('job', {
              orderBy: "assignedTo",
              equalTo: this.get('currentUser.username'),
          }),

          activeJobs: this.get('store').query('job', {
            orderBy: "isActive",
            equalTo: true,
          }),

          completedJobs: this.get('store').query('job', {
            orderBy: "status",
            equalTo: "Completed"
          })
      });
  },

  afterModel(model) {
    this.set('jobService.assignedJobs', model.jobs.content);
    this.set('jobService.activeJobs', model.activeJobs.content);
    this.set('jobService.completedJobs', model.completedJobs.content);
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
