import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Component.extend({

  jobService: Ember.inject.service('job'),

  init() {
    this._super(...arguments);
  },
  imagePathObserver: Ember.observer('jobImage', function() {
    this.getFile();
  }),

  getFile() {
    const storage = firebase.storage();
    const imageRef = storage.ref(`images/${this.get('jobImage')}`);
    return imageRef.getDownloadURL().then(url => {
      this.set('imageUrl', url);
    });
  },

  buttonText: 'pending',
  actions:{
    changeStatus(job){
      this.get('jobService').changeStatus();
    /*this.sendAction('changeStatus');
    switch(job.get('status')){
      case 'pending':
        this.set('buttonText','acknowledged');
        break;
      case 'acknowledged':
        this.set('buttonText','en route');
        break;
      case 'en route':
        this.set('buttonText','arrived');
        break;
      case 'arrived':
        this.set('buttonText','completed');
        break;
      case 'completed':
        break;
      }*/
    },
  }
});
