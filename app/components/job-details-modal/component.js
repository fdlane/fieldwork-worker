import Ember from 'ember';

export default Ember.Component.extend({

  jobService: Ember.inject.service('job'),

  actions:{
    uploadImage(data) {
      this.get('jobService').updatePhoto(data);
    },

    changeStatus(){
      this.get('jobService').changeStatus();
    },
  }
});
