import Ember from 'ember';

export default Ember.Service.extend({

  firebaseApp: Ember.inject.service(),
  workerService: Ember.inject.service('worker'),

  jobs: Ember.computed.setDiff('activeAndAssignedJobs', 'completedJobs'),
  activeAndAssignedJobs: Ember.computed.intersect('activeJobs', 'assignedJobs'),
  activeJobs: [],
  assignedJobs: [],
  completedJobs: [],
  selectedJob: '',
  jobImage: Ember.computed.alias('selectedJob.jobImage'),
  imageUrl: '',
  statuses: ["En Route", "Arrived", "Completed"],

  canChangeStatus: Ember.computed('currentStatus', function() {
    if(this.get('currentStatus') === "Completed") {
      return false;
    }

    return true;
  }),

  currentStatus: Ember.computed.alias('selectedJob.status'),

  nextStatus: Ember.computed('currentStatus', 'statuses.[]', function() {
    let index = this.get('statuses').indexOf(this.get('currentStatus')) + 1;
    return this.get('statuses').objectAt(index);
  }),

  filterValue: "",

  filter: Ember.computed('jobs.[]', 'filterValue', function(){
    let jobs = this.get('jobs');
    let filterValue = this.get('filterValue').toLowerCase();
    return jobs.filter(job => {
          if(job.record.get('location').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.record.get('status').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }
          if(job.record.get('category').toLowerCase().indexOf(filterValue) !== -1){
            return true;
          }

    });
  }),

  filteredJobs: Ember.computed.map('filter', function(job) {
    return job.record;
  }),

  selectJob(tableState) {
      this.set('selectedJob', tableState.selectedItems.objectAt(0));
      tableState.selectedItems.clear();
      this.getFile();
  },

  changeStatus() {
    let job = this.get('selectedJob');
    job.set('status', this.get('nextStatus'));
    job.save();

    if(!this.get('canChangeStatus')) {
      let worker = this.get('workerService.worker');
      let newJobCount = worker.get('jobCount') - 1;
      worker.set('jobCount', newJobCount);
      worker.save();
      this.set('workerService.worker', worker);
    }

  },

  updatePhoto(data) {

    const storage = this.get('firebaseApp').storage().ref();
    const imageRef = storage.child(`images/${data.get('name')}`);
    let job = this.get('selectedJob');
    let service = this;

    imageRef.put(data.get('blob')).then(function() {
      job.set('jobImage', `${data.get('name')}`);
      job.save();
      service.getFile();
    });
  },

  getFile() {
    const storage = this.get('firebaseApp').storage();
    const imageRef = storage.ref(`images/${this.get('jobImage')}`);
    return imageRef.getDownloadURL().then((url) => {
      this.set('imageUrl', url);
    },
    (error) => {
      if(error) {
        this.set('imageUrl', '');
      }
    });
  },

});
