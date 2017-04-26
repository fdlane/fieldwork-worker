import Ember from 'ember';

export default Ember.Route.extend({

  jobService: Ember.inject.service('job'),
  workerService: Ember.inject.service('worker'),

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
          }),

          worker: this.get('store').query('worker', {
            orderBy: "username",
            equalTo: this.get('currentUser.username'),
          })
      });
  },

  afterModel(model) {
    this.set('jobService.assignedJobs', model.jobs.content);
    this.set('jobService.activeJobs', model.activeJobs.content);
    this.set('jobService.completedJobs', model.completedJobs.content);
    this.set('workerService.worker', model.worker.content.objectAt(0).record);
  },

  activate() {
    let worker = this.get('workerService.worker');
    worker.set('isAvailable', true);
    worker.save();
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
