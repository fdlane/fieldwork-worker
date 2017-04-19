import Ember from 'ember';

export default Ember.Route.extend({

  jobService: Ember.inject.service('job'),

  model() {
      return Ember.RSVP.hash({
          jobs: this.store.query('job', {
              orderBy: "assignedTo",
              equalTo: this.get('currentUser.username'),
          }),
      });
  },

  afterModel(model) {
      this.set('jobService.jobs', model.jobs);
  },

  updateStatus() {
    this.controller.set('newStatus', '');
    switch(this.controller.get('job').get('status')){
      case 'pending':
        this.controller.set('newStatus','acknowledged');
        break;
      case 'acknowledged':
          this.controller.set('newStatus','en route');
          break;
      case 'en route':
        this.controller.set('newStatus','arrived');
        break;
      case 'arrived':
        this.controller.set('newStatus','completed');
        break;
      case 'completed':
        break;
    }
    this.controller.get('job').set('status', this.controller.get('newStatus'));
    this.controller.get('job').save();
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
