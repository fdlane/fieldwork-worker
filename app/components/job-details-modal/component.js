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

  actions:{
    uploadImage(data) {
      const storage = firebase.storage().ref();
      const imageRef = storage.child(`images/${data.get('name')}`);

      imageRef.put(data.get('blob')).then(function(snapshot) {
        console.log('File uploaded: ', `${data.get('name')}`)
      });
      this.get('jobService').updatePhoto(`${data.get('name')}`);
    },
    changeStatus(){
      this.get('jobService').changeStatus();
    },
  }
});
