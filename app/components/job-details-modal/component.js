import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Component.extend({
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
    changeStatus(){
      console.log('changeStatus fired from modal component');
      this.sendAction('changeStatus');
    },
  }
});
