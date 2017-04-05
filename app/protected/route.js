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

  updateStatus() {
    //Pending, Acknowledged, EnRoute, Arrived, Complete
    //TODO: Data structure to decide next status
    //TODO: Change button text to next status
    this.controller.get('job').set('status', 'Complete');
    this.controller.get('job').save();
  },

  actions: {

    toggleModal(job) {
      this.controller.set('jobImage', job.get('jobImage'));
      this.controller.set('job', job);
    },
    changeStatus(){
      console.log('changeStatus fired from protected route');
      console.log('JOB: ' + this.controller.get('job'));
      this.store.findRecord('job', this.controller.get('job').get('id')).then(this.updateStatus());
    }
  }

});
